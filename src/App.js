import './App.css';
import { useEffect, useState } from 'react';
import { getPokemon } from './services/pokemon';
import PokeList from './components/PokeList/PokeList';
import Controls from './components/Controls/Controls';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [loadFirstPage, setLoadFirstPage] = useState(true);

  useEffect(() => {
    console.log('in first useEffect');
    const params = new URLSearchParams();
    params.set('pokemon', query);
    // for now, I ONLY want to sort by the pokemon key (which holds the name)
    // if i wanted to sort by something else, you can adjust that here
    params.set('sort', 'pokemon');
    params.set('direction', order);

    params.set('perPage', perPage);

    // set the page
    params.set('page', currentPage);
    setUrl(`https://pokedex-alchemy.herokuapp.com/api/pokedex?${params.toString()}`);
  }, [query, order, perPage, currentPage]);

  useEffect(() => {
    console.log('in second use effect');
    console.log('loadMore', loadMore);
    console.log('loadFirst', loadFirstPage);
    const fetchData = async () => {
      const data = await getPokemon(url);
      setCount(data.count);
      if (loadMore) {
        setPokemon((prevData) => [...prevData, ...data.results]);
        setLoadMore(false);
      } else {
        setPokemon(data.results);
        setLoadFirstPage(false);
      }
      setLoading(false);
    };
    if (loadMore || loadFirstPage) {
      fetchData();
    }
  }, [url, loadFirstPage, loadMore]);

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
        setCurrentPage={setCurrentPage}
        setLoadFirstPage={setLoadFirstPage}
      />
      {loadFirstPage && <span className="loader"></span>}
      {!loadFirstPage && (
        <InfiniteScroll
          dataLength={pokemon.length} //This is important field to render the next data
          next={() => {
            setCurrentPage((prevPage) => ++prevPage);
            setLoadMore(true);
          }}
          hasMore={Math.ceil(count / perPage) > currentPage}
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
