import './App.css';
import { useEffect, useState } from 'react';
import { getPokemon } from './services/pokemon';
import PokeList from './components/PokeList/PokeList';
import Controls from './components/Controls/Controls';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const fetchMoreData = async () => {
    console.log('inside fetch more data');
    // fetch the next page of results
    const data = await getPokemon(query, order, perPage, currentPage + 1);
    setPokemon((prevState) => [...prevState, ...data.results]);
    setCurrentPage((prevState) => ++prevState);
    // append them to the list of pokemon
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemon(query, order, perPage, currentPage);
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
  }, [loading, query, order, currentPage, perPage]);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <Controls
        query={query}
        setQuery={setQuery}
        setLoading={setLoading}
        order={order}
        setOrder={setOrder}
        perPage={perPage}
        setPerPage={setPerPage}
      />
      {loading && <span className="loader"></span>}
      {!loading && (
        <InfiniteScroll
          dataLength={pokemon.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <PokeList
            pokemon={pokemon}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            loading={loading}
            setLoading={setLoading}
          />
        </InfiniteScroll>
      )}
    </div>
  );
}

export default App;
