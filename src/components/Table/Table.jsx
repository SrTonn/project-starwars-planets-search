import React, { useContext } from 'react';
import Context from '../../Context/Context';
import removeUnderline from '../../helpers/formatText';

export default function Table() {
  const { planets, filteredPlanets } = useContext(Context);

  return (
    <table>
      <thead>
        <tr>
          {planets.length > 0 && Object.keys(planets[0]).map((th) => {
            if (th === 'residents') return;
            return <th key={ th }>{removeUnderline(th)}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((obj) => (
          <tr key={ obj.name }>
            <td>{obj.name}</td>
            <td>{obj.rotation_period}</td>
            <td>{obj.orbital_period}</td>
            <td>{obj.diameter}</td>
            <td>{obj.climate}</td>
            <td>{obj.gravity}</td>
            <td>{obj.terrain}</td>
            <td>{obj.surface_water}</td>
            <td>{obj.population}</td>
            <td>{obj.film}</td>
            <td>{obj.created}</td>
            <td>{obj.edited}</td>
            <td>{obj.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
