import React from "react";
import Count from "./Count";

function Statistics({ total, average, realPercentage, good, bad, neutral }) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>bad</td>
            <td>
              <Count count={bad} />
            </td>
          </tr>

          <tr>
            <td>neutral</td>
            <td>
              <Count count={neutral} />
            </td>
          </tr>

          <tr>
            <td>good</td>
            <td>
              <Count count={good} />
            </td>
          </tr>

          <tr>
            <td>total</td>
            <td>{total}</td>
          </tr>

          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>

          <tr>
            <td>positive</td>
            <td>{realPercentage}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Statistics;
