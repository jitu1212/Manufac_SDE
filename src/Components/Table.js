import React from 'react'
import { Data } from '../Utils/Windata'

function Table() {
  // Function to calculate statistical measures for flavonoid data grouped by alcohol values
  const getFlavanoidsStats = () => {
    // Object to store grouped data
    const groupedData = {};

    // Iterate over each item in the data
    Data.forEach(item => {
      const { Alcohol, Flavanoids } = item;

      // Check if alcohol group exists in the groupedData object
      if (!groupedData[Alcohol]) {
        // If not, initialize the alcohol group with count, sum, and values
        groupedData[Alcohol] = {
          count: 0,
          sum: 0,
          values: [],
        };
      }

      // Increment count, sum, and add flavonoid value to the alcohol group
      groupedData[Alcohol].count++;
      groupedData[Alcohol].sum += Flavanoids;
      groupedData[Alcohol].values.push(Flavanoids);
    });

    // Object to store flavonoid statistics
    const flavanoidsStats = {};

    // Iterate over each alcohol group in the groupedData object
    for (const alcohol in groupedData) {
      const { count, sum, values } = groupedData[alcohol];

      // Calculate mean
      const mean = sum / count;

      // Sort flavonoid values
      const sortedValues = values.sort((a, b) => a - b);

      // Calculate median
      const middleIndex = Math.floor(sortedValues.length / 2);
      const median =
        sortedValues.length % 2 === 0
          ? (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2
          : sortedValues[middleIndex];

      // Calculate mode using the findMode function
      const mode = findMode(values);

      // Store mean, median, and mode in flavanoidsStats object
      flavanoidsStats[alcohol] = { mean, median, mode };
    }

    // Return the flavanoidsStats object
    return flavanoidsStats;
  };

  // Function to calculate the mode of an array of values
  const findMode = values => {
    // Object to store value counts
    const countMap = {};
    let maxCount = 0;
    let modes = [];

    // Iterate over each value in the array
    values.forEach(value => {
      // Check if the value exists in the countMap object
      if (!countMap[value]) {
        countMap[value] = 0;
      }

      // Increment the count for the value
      countMap[value]++;

      // Check if the count exceeds the maxCount
      if (countMap[value] > maxCount) {
        maxCount = countMap[value];
        modes = [value];
      } else if (countMap[value] === maxCount) {
        // If the count is equal to the maxCount, add the value to modes array
        modes.push(value);
      }
    });

    // Return the modes array
    return modes;
  };

  // Call the getFlavanoidsStats function and store the result in flavanoidsStats variable
  const flavanoidsStats = getFlavanoidsStats();
  return (

    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {Object.keys(flavanoidsStats).map(alcohol => (
            <th key={alcohol}>{`Alcohol ${alcohol}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Flavanoids Mean</td>
          {Object.keys(flavanoidsStats).map(alcohol => (
            <td key={alcohol}>{flavanoidsStats[alcohol].mean.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          {Object.keys(flavanoidsStats).map(alcohol => (
            <td key={alcohol}>{flavanoidsStats[alcohol].median.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Mode</td>
          {Object.keys(flavanoidsStats).map(alcohol => (
            <td key={alcohol}>{flavanoidsStats[alcohol].mode.join(', ')}</td>
          ))}
        </tr>
      </tbody>
    </table>


  )
}

export default Table
