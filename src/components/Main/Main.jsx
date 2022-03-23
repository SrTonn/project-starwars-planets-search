import React, { useContext } from 'react';
import Context from '../../Context/Context';
import Select from '../Select/Select';
import Table from '../Table/Table';

export default function Main() {
  const {
    handleChange,
    handleClick,
    setInputValue,
    inputValue,
    optionsColumnFilter,
    optionsComparisonFilter,
  } = useContext(Context);

  return (
    <>
      <h1>Projeto Star Wars</h1>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          onChange={ (e) => handleChange(e) }
        />
        <Select
          name="ColumnFilter"
          options={ optionsColumnFilter }
          dataTestId="column-filter"
        />
        <Select
          name="ComparisonFilter"
          options={ optionsComparisonFilter }
          dataTestId="comparison-filter"
        />
        <input
          type="number"
          data-testid="value-filter"
          onChange={ (e) => setInputValue(e.target.value) }
          value={ inputValue }
        />
        <button
          type="button"
          onClick={ handleClick }
          data-testid="button-filter"
        >
          FILTRAR
        </button>
      </div>
      <Table />
    </>
  );
}
