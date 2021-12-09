import React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
import { Button, TextField, Select, MenuItem } from '@mui/material';

export default function Controls({
  query,
  setQuery,
  setLoading,
  order,
  setOrder,
  selectedType,
  setSelectedType,
  types,
}) {
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
      <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <MenuItem value="all">All</MenuItem>
        {types.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" onClick={() => setLoading(true)}>
        Search
      </Button>
      {/* <button onClick={() => setLoading(true)}>Search</button> */}
    </div>
  );
}
