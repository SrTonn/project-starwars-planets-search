import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Context from '../../Context/Context';

export default function Select({ options, dataTestId, name }) {
  const { handleSelect } = useContext(Context);

  useEffect(() => {
    handleSelect({ target: { name, value: options[0] } });
  }, []);

  return (
    <select
      name={ name }
      onChange={ (e) => handleSelect(e) }
      data-testid={ dataTestId }
    >
      {options.map((value) => (
        <option key={ value } value={ value }>{value}</option>
      ))}
    </select>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
