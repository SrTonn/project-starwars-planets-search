import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const INITIAL_FILTER_BY_NAME = {
  filterByName: {
    name: '',
  },
};

const INITIAL_FILTER_BY_NUMERIC_VALUES = {
  filterByNumericValues: [
  ],
};

const INITIAL_ORDER = {
  order: {
    column: 'population',
    sort: 'ASC',
  },
};

const INITIAL_OPTIONS_COLUMN_FILTER = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    ...INITIAL_FILTER_BY_NAME,
    ...INITIAL_FILTER_BY_NUMERIC_VALUES,
    ...INITIAL_ORDER,
  });

  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [columnFilter, setColumnFilter] = useState(null);
  const [comparisonFilter, setComparisonFilter] = useState(null);
  const [inputValue, setInputValue] = useState(0);
  const [selectOrderColumn, setSelectOrderColumn] = useState(null);
  const [selectOrder, setSelectOrder] = useState('ASC');
  const [optionsColumnFilter, setOptionsColumnFilter] = useState(
    INITIAL_OPTIONS_COLUMN_FILTER,
  );

  const optionsComparisonFilter = [
    'maior que',
    'igual a',
    'menor que',
  ];

  useEffect(() => {
    (async () => {
      const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await data.json();
      results.sort((a, b) => a.name.localeCompare(b.name));
      setPlanets(results);
      setFilteredPlanets(results);
    })();
  }, []);

  useEffect(() => {
    const valueName = filters.filterByName.name.toLowerCase();
    setFilteredPlanets(planets
      .filter(({ name }) => name.toLowerCase().includes(valueName)));

    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((elements) => {
        setFilteredPlanets((prevState) => {
          const temp = prevState.filter((obj) => {
            const { comparison, value: numericValue, column } = elements;
            if (comparison === 'maior que') return +obj[column] > +numericValue;
            if (comparison === 'menor que') return +obj[column] < +numericValue;
            return numericValue === obj[column];
          });
          return [...temp];
        });
      });
    }
  }, [filters, planets]);

  useEffect(() => {
    const columnsUsed = filters.filterByNumericValues.map((element) => element.column);
    setOptionsColumnFilter((columns) => columns
      .filter((column) => !columnsUsed.includes(column)));
  }, [filters.filterByNumericValues]);

  useEffect(() => {
    const { column, sort } = filters.order;
    setFilteredPlanets((prevState) => {
      if (prevState.length === 0) return prevState;
      const sorted = prevState.sort((a, b) => (
        sort === 'ASC'
          ? a[column].localeCompare(b[column], 'en', { numeric: true })
          : b[column].localeCompare(a[column], 'en', { numeric: true })
      ));
      console.log('el=>', sorted[0][column]);
      console.log('isNaN=>', Number.isNaN(Number(sorted[0][column])));
      while (Number.isNaN(Number(sorted[0][column]))) {
        sorted.push(sorted.shift());
      }
      return sorted;
    });
  }, [filters.order]);
  // Ref.: https://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array
  // Ref².: https://stackoverflow.com/questions/24909371/move-item-in-array-to-last-position

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'sort') {
      setSelectOrder(value);
    } else if (value) {
      setFilters((prevState) => ({
        ...prevState,
        filterByName: { name: value },
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        filterByName: { name: '' },
      }));
    }
  };

  const handleSelect = ({ target: { name, value } }) => {
    if (name === 'ColumnFilter') setColumnFilter(value);
    if (name === 'ComparisonFilter') setComparisonFilter(value);
    if (name === 'order-planets') setSelectOrderColumn(value);
  };

  const handleClick = ({ target: { name } }) => {
    if (name === 'sort-planets') {
      setFilters((prevState) => ({
        ...prevState,
        order: {
          column: selectOrderColumn,
          sort: selectOrder,
        },
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        filterByNumericValues: name === 'remove-filters' ? [] : [
          ...prevState.filterByNumericValues,
          {
            column: columnFilter,
            comparison: comparisonFilter,
            value: inputValue,
          },
        ],
      }));

      if (optionsColumnFilter[1]) setColumnFilter(optionsColumnFilter[1]);
    }
  };

  const handleClickRemoveFilter = ({ name }) => {
    setFilters((prevState) => ({
      ...prevState,
      filterByNumericValues: [
        ...prevState.filterByNumericValues.filter(({ column }) => column !== name),
      ],
    }));
  };

  const context = {
    planets,
    filteredPlanets,
    handleChange,
    handleSelect,
    setInputValue,
    handleClick,
    inputValue,
    optionsColumnFilter,
    optionsComparisonFilter,
    filters, // remover antes do push
    handleClickRemoveFilter,
    filterByNumericValues: filters.filterByNumericValues,
    INITIAL_OPTIONS_COLUMN_FILTER,
    selectOrder,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
