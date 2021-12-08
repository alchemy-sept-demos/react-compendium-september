import React from 'react';

export default function Controls({ query, setQuery, setLoading }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button onClick={(e) => setLoading(true)}>Search</button>
    </div>
  );
}
