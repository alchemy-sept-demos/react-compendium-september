export async function getPokemon(query, order) {
  const params = new URLSearchParams();
  params.set('pokemon', query);
  // for now, I ONLY want to sort by the pokemon key (which holds the name)
  // if i wanted to sort by something else, you can adjust that here
  params.set('sort', 'pokemon');
  params.set('direction', order);
  const resp = await fetch(
    `https://pokedex-alchemy.herokuapp.com/api/pokedex?${params.toString()}`
  );
  const data = await resp.json();
  return data;
}
