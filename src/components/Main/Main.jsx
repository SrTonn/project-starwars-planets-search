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
    handleClickRemoveFilter,
    filterByNumericValues,
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
          name="filter"
          type="button"
          onClick={ (e) => handleClick(e) }
          data-testid="button-filter"
        >
          FILTRAR
        </button>
        <button
          name="remove-filters"
          type="button"
          onClick={ (e) => handleClick(e) }
          data-testid="button-remove-filters"
        >
          REMOVER FILTROS
        </button>
      </div>

      {filterByNumericValues.map(({ column, comparison, value }) => (
        <div key={ column } data-testid="filter">
          {`${column} ${comparison} ${value}`}
          <button
            type="button"
            name={ column }
            onClick={ ({ target }) => handleClickRemoveFilter(target) }
          >
            ❌
          </button>
        </div>
      ))}

      <Table />
    </>
  );
}
