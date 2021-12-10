import React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
import { Button, TextField, Select, MenuItem } from '@mui/material';

export default function Controls({
  setQuery,
  query,
  order,
  setOrder,
  perPage,
  setPerPage,
  setLoadFirstPage,
  setCurrentPage,
}) {
  const handleClick = () => {
    setCurrentPage(1);
    setLoadFirstPage(true);
  };
  return (
    <div>
      <TextField
        type="text"
        variant="outlined"
        label="Search Pokemon"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <Select value={order} onChange={(e) => setOrder(e.target.value)}>
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
      <Select value={perPage} onChange={(e) => setPerPage(e.target.value)}>
        <MenuItem value="25">25</MenuItem>
        <MenuItem value="50">50</MenuItem>
        <MenuItem value="100">100</MenuItem>
      </Select>
      <Button variant="contained" onClick={handleClick}>
        Search
      </Button>
      {/* <button onClick={() => setLoading(true)}>Search</button> */}
    </div>
  );
}
