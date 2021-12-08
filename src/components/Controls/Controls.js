import React from 'react';

export default function Controls({ query, setQuery, setLoading, order, setOrder }) {
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
      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button onClick={() => setLoading(true)}>Search</button>
    </div>
  );
}
