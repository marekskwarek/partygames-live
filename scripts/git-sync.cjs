const fs = require('fs');
const path = require('path');
const os = require('os');

// Szukamy tokenu w zmiennej środowiskowej lub lokalnym bezpiecznym pliku konfiguracyjnym użytkownika
function getToken() {
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN;
  const cfgPath = path.join(os.homedir(), '.config', 'partygames-github.json');
  if (fs.existsSync(cfgPath)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
      if (cfg.token) return cfg.token;
    } catch {}
  }
  return null;
}

const GITHUB_TOKEN = getToken();
if (!GITHUB_TOKEN) {
  console.log('[Git Sync] Pominięto: brak skonfigurowanego tokenu GitHub.');
  process.exit(0);
}

const REPO_OWNER = 'marekskwarek';
const REPO_NAME = 'partygames-live';
const PROJECT_DIR = path.resolve(__dirname, '..');

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
  'User-Agent': 'PartyGames-AutoSync',
  'X-GitHub-Api-Version': '2022-11-28',
};

const IGNORED_NAMES = new Set([
  'node_modules',
  '.next',
  'out',
  '.git',
  '.firebase',
  '.vscode',
  '.idea',
  '.DS_Store',
]);

function getAllFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (IGNORED_NAMES.has(file)) continue;
    const fullPath = path.join(dir, file);
    const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, baseDir));
    } else {
      results.push({ fullPath, relPath });
    }
  }
  return results;
}

async function api(endpoint, options = {}) {
  const url = endpoint.startsWith('https://')
    ? endpoint
    : `https://api.github.com${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`[${res.status}] ${url}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function sync() {
  const commitMsg = process.argv[2] || `Aktualizacja PartyGames Live (${new Date().toLocaleString('pl-PL')})`;
  console.log(`[Git Sync] Synchronizacja zmian z GitHubem: "${commitMsg}"...`);

  const files = getAllFiles(PROJECT_DIR);
  const treeItems = [];

  for (const f of files) {
    const content = fs.readFileSync(f.fullPath);
    const isBinary = content.includes(0);
    const blobPayload = isBinary
      ? { content: content.toString('base64'), encoding: 'base64' }
      : { content: content.toString('utf8'), encoding: 'utf-8' };

    const blob = await api(`/repos/${REPO_OWNER}/${REPO_NAME}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify(blobPayload),
    });

    treeItems.push({
      path: f.relPath,
      mode: '100644',
      type: 'blob',
      sha: blob.sha,
    });
  }

  let parentCommitSha = null;
  try {
    const ref = await api(`/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/main`);
    parentCommitSha = ref.object.sha;
  } catch {}

  const tree = await api(`/repos/${REPO_OWNER}/${REPO_NAME}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({ tree: treeItems }),
  });

  const commit = await api(`/repos/${REPO_OWNER}/${REPO_NAME}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({
      message: commitMsg,
      tree: tree.sha,
      parents: parentCommitSha ? [parentCommitSha] : [],
    }),
  });

  await api(`/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/main`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha, force: true }),
  });

  console.log(`[Git Sync] Sukces! Nowy commit: ${commit.sha.slice(0, 7)}`);
  console.log(`[Git Sync] Zobacz na żywo: https://github.com/${REPO_OWNER}/${REPO_NAME}`);
}

sync().catch((err) => console.error('[Git Sync Błąd]:', err.message));
