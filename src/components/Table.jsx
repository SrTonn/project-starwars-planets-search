import React, { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';

export default function Table() {
  const { planets } = useContext(Context);
  const [tableHeadList, setTabletHeadList] = useState([]);

  useEffect(() => {
    if (planets.length > 0) {
      setTabletHeadList(Object.keys(planets[0]));
    }
  }, [planets]);

  return (
    <table>
      <thead>
        <tr>
          {tableHeadList.map((th) => {
            if (th === 'residents') return;
            return <th key={ th }>{th}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {planets.map((obj) => (
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
