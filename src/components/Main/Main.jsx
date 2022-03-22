import React, { useContext } from 'react';
import Context from '../../Context/Context';
import Table from '../Table/Table';

export default function Main() {
  const { handleChange } = useContext(Context);
  return (
    <>
      <h1>Projeto Star Wars</h1>
      <input data-testid="name-filter" type="text" onChange={ (e) => handleChange(e) } />
      <Table />
    </>
  );
}
