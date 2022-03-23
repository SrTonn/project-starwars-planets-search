import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [columnFilter, setColumnFilter] = useState(null);
  const [comparisonFilter, setComparisonFilter] = useState(null);
  const [inputValue, setInputValue] = useState(0);
  const [optionsColumnFilter, setOptionsColumnFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const optionsComparisonFilter = [
    'maior que',
    'igual a',
    'menor que',
  ];

  useEffect(() => {
    (async () => {
      const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await data.json();
      setPlanets(results);
      setFilteredPlanets(results);
    })();
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;

    if (value) {
      setFilteredPlanets(planets.filter(({ name }) => name.includes(value)));
    } else {
      setFilteredPlanets(planets);
    }
  };

  const handleSelect = ({ target: { name, value } }) => {
    if (name === 'ColumnFilter') setColumnFilter(value);
    if (name === 'ComparisonFilter') setComparisonFilter(value);
  };

  const handleClick = () => {
    console.clear();
    console.log('columnFilter=>', columnFilter); // population
    console.log('comparisonFilter=>', comparisonFilter); // maior_que
    console.log('inputValue=>', inputValue); // 500

    setFilteredPlanets((prevState) => prevState.filter((obj) => {
      if (comparisonFilter === 'maior que') return +obj[columnFilter] > +inputValue;
      if (comparisonFilter === 'menor que') return +obj[columnFilter] < +inputValue;
      if (comparisonFilter === 'igual a') return inputValue === obj[columnFilter];
      return false;
    }));
    setOptionsColumnFilter((columns) => columns
      .filter((column) => column !== columnFilter));
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
