import React from 'react'
import { Data } from "../Utils/Windata"

function Table1() {
  const getGammaStats = () => {
    const gammaStats = {};

    // Iterate over each item in the Data array
    Data.forEach(item => {
      const { Alcohol, Ash, Hue, Magnesium } = item;

      // Calculate gamma using the formula (Ash * Hue) / Magnesium
      const gamma = (Ash * Hue) / Magnesium;

      if (!gammaStats[Alcohol]) {
        // Initialize an object for the current Alcohol value
        gammaStats[Alcohol] = {
          values: [],
          countMap: new Map(),
          maxCount: 0,
          modes: []
        };
      }

      const groupData = gammaStats[Alcohol];

      // Add the gamma value to the values array
      groupData.values.push(gamma);

      // Update the countMap and maxCount for mode calculation
      const count = (groupData.countMap.get(gamma) || 0) + 1;
      groupData.countMap.set(gamma, count);

      if (count > groupData.maxCount) {
        groupData.maxCount = count;
        groupData.modes = [gamma];
      } else if (count === groupData.maxCount) {
        groupData.modes.push(gamma);
      }
    });

    // Calculate statistical measures for each alcohol group
    for (const alcohol in gammaStats) {
      const groupData = gammaStats[alcohol];

      const mean = calculateMean(groupData.values);
      const median = calculateMedian(groupData.values);
      const mode = groupData.modes;

      // Store the calculated statistical measures for the current alcohol group
      gammaStats[alcohol] = { mean, median, mode };
    }

    return gammaStats;
  };

  const calculateMean = values => {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length;
  };

  const calculateMedian = values => {
    const sortedValues = [...values].sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 0) {
      return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
    } else {
      return sortedValues[middleIndex];
    }
  };

  // Calculate gamma statistics and store the result in gammaStats
  const gammaStats = getGammaStats();


  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          <th>Alcohol 1</th>
          <th>Alcohol 2</th>
          <th>Alcohol 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Gamma Mean</td>
          <td>{gammaStats[1]?.mean?.toFixed(3)}</td>
          <td>{gammaStats[2]?.mean?.toFixed(3)}</td>
          <td>{gammaStats[3]?.mean?.toFixed(3)}</td>
        </tr>
        <tr>
          <td>Gamma Median</td>
          <td>{gammaStats[1]?.median?.toFixed(3)}</td>
          <td>{gammaStats[2]?.median?.toFixed(3)}</td>
          <td>{gammaStats[3]?.median?.toFixed(3)}</td>
        </tr>
        <tr>
          <td>Gamma Mode</td>
          <td>{gammaStats[1]?.mode?.map(value => value.toFixed(3)).join(', ')}</td>
          <td>{gammaStats[2]?.mode?.map(value => value.toFixed(3)).join(', ')}</td>
          <td>{gammaStats[3]?.mode?.map(value => value.toFixed(3)).join(', ')}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table1
