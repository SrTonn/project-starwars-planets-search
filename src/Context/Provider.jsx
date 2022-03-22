import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

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

  const context = {
    planets: filteredPlanets,
    handleChange,
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
