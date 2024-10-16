export function getPokemonId(url: string): string {
  if (!url) return "";
  const segments = url.split("/").filter(Boolean);
  const id = segments.pop();
  return id && !isNaN(Number(id)) ? id : "";
}
