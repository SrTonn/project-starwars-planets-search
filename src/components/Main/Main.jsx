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
    INITIAL_OPTIONS_COLUMN_FILTER,
    selectOrder,
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
        <Select
          name="order-planets"
          options={ INITIAL_OPTIONS_COLUMN_FILTER }
          dataTestId="column-sort"
        />

        <div>
          <label htmlFor="asc">
            Ascendente
            <input
              type="radio"
              id="asc"
              name="sort"
              onChange={ (e) => handleChange(e) }
              value="ASC"
              checked={ selectOrder === 'ASC' }
              data-testid="column-sort-input-asc"
            />
          </label>
          <label htmlFor="desc">
            Descendente
            <input
              type="radio"
              id="desc"
              name="sort"
              onChange={ (e) => handleChange(e) }
              value="DESC"
              checked={ selectOrder === 'DESC' }
              data-testid="column-sort-input-desc"
            />
          </label>
        </div>

        <button
          name="sort-planets"
          type="button"
          onClick={ (e) => handleClick(e) }
          data-testid="column-sort-button"
        >
          ORDENAR
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
