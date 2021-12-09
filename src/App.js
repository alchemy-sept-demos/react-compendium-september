import './App.css';
import { useEffect, useState } from 'react';
import { getPokemon, getTypes } from './services/pokemon';
import PokeList from './components/PokeList/PokeList';
import Controls from './components/Controls/Controls';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemon(query, order, currentPage, selectedType);
      setPokemon(data.results);
      setLoading(false);
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
  }, [loading, query, order, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTypes();
      setTypes(data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <Controls
        query={query}
        setQuery={setQuery}
        setLoading={setLoading}
        order={order}
        setOrder={setOrder}
        types={types}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {loading && <span className="loader"></span>}
      {!loading && (
        <PokeList
          pokemon={pokemon}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}

export default App;
