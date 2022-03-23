import React, { useContext } from 'react';
import { uid } from 'uid';
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
            return <th key={ uid() }>{removeUnderline(th)}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((obj) => (
          <tr key={ obj.name }>
            {Object.keys(planets[0])
              .map((content) => (
                <td
                  key={ uid() }
                  data-testid={ content === 'name' ? 'planet-name' : null }
                >
                  {obj[content]}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
