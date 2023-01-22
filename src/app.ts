export {} // make file ES module preventing duplication error

/**
 * Calculate the distance between two-dimensional coordinates
 * @param array pointA [x,y]
 * @param array pointB [x,y]
 * @returns {number}
 */
function calculateDistance(pointA: number[], pointB: number[]) {
  return Math.sqrt(
    Math.pow(Math.abs(pointB[0] - pointA[0]), 2) +
      Math.pow(Math.abs(pointB[1] - pointA[1]), 2)
  );
}

/**
 * Calculate the power of link station to given distance
 * @param distance to the link tower
 * @param reach of the link tower
 * @returns {number}
 */
function calculatePower(distance: number, reach: number):number {
  return distance > reach ? 0 : Math.pow(reach - distance, 2);
}

/**
 * Finds best link station for given coordinate point [x,y] from predefined stations
 * @param point
 */
function getBestStation(point: number[]) {
  let stations = [
    { coordinates: [0, 0], reach: 10, power: 0 },
    { coordinates: [20, 20], reach: 5, power: 0 },
    { coordinates: [10, 0], reach: 12, power: 0 },
  ];

  let bestStation = { coordinate: [0, 0], power: 0 };
  stations.forEach((station) => {
    let power = calculatePower(
      calculateDistance(point, station.coordinates),
      station.reach
    );

    console.log(
      point,
      station,
      calculateDistance(point, station.coordinates),
      calculatePower(0, station.reach),
      power
    );

    if (power >= bestStation.power) {
      bestStation.coordinate = station.coordinates;
      bestStation.power = power;
    }
  });

  return bestStation;
}

/**
 * Main execution of program. Loops through
 */

// Points to tests
 let devicePoints: number[][] = [
  [0, 0],
  [100, 100],
  [15, 10],
  [18, 18],
];

devicePoints.forEach((point) => {
  let bestPowerStation = getBestStation(point);
  if (bestPowerStation.power <= 0) {
    console.log(
      "Point [%s,%s]: No link station within reach",
      point[0],
      point[1]
    );
  } else {
    console.log(
      "Best link station for point [%s,%s] is [%s,%s] with power %s",
      point[0],
      point[1],
      bestPowerStation.coordinate[0],
      bestPowerStation.coordinate[1],
      bestPowerStation.power
    );
  }
});
