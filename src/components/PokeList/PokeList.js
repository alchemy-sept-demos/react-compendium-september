import React from 'react';
import './PokeList.css';

export default function PokeList({ pokemon, currentPage, setCurrentPage, setLoading }) {
  return (
    <div className="poke-list">
      {pokemon.map((poke) => (
        <p key={poke.id}>{poke.pokemon}</p>
      ))}
    </div>
  );
}
