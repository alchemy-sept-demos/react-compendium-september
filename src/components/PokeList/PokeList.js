import React from 'react';

export default function PokeList({ pokemon, currentPage, setCurrentPage, setLoading }) {
  const handleNextPage = () => {
    setCurrentPage((prevState) => ++prevState);
    setLoading(true);
  };
  return (
    <div>
      {pokemon.map((poke) => (
        <p key={poke.id}>{poke.pokemon}</p>
      ))}
      <div style={{ color: 'black', fontWeight: 'bold' }}>Page: {currentPage}</div>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
}
