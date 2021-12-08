import './App.css';
import { useEffect, useState } from 'react';
import { getPokemon } from './services/pokemon';
import PokeList from './components/PokeList/PokeList';
import Controls from './components/Controls/Controls';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemon(query, order);
      setPokemon(data.results);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    // because loading is in the dependency array
    // this useEffect will be called whenever loading changes
    // we only want to load new data when loading is true though
    // so we wrap the call to fetchData in a conditional
    if (loading) {
      fetchData();
    }
    // react requires query also be in the dependency array
    // whenever loading or query change, react will call the callback
    // but will only fetch the data when loading is true
  }, [loading, query, order]);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      {loading && <span className="loader"></span>}
      {!loading && (
        <>
          <Controls
            query={query}
            setQuery={setQuery}
            setLoading={setLoading}
            order={order}
            setOrder={setOrder}
          />
          <PokeList pokemon={pokemon} />
        </>
      )}
    </div>
  );
}

export default App;
