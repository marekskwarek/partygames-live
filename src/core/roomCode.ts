// Bez łatwo mylących znaków (I, L, O, 0)
const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ';

/** Generuje 4-literowy kod pokoju. */
export function generateRoomCode(): string {
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += CODE_CHARS.charAt(Math.floor(Math.random() * CODE_CHARS.length));
  }
  return code;
}

export function sanitizeRoomCode(value: string): string {
  return value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6);
}
