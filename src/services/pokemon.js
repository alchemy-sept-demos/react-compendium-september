export async function getPokemon(url) {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}
