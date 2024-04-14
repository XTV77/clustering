import module from "./module.js";
import dataStandartization from "./standartization_module.js";
const rows = 10; //кількість об'єктів
const columns = 2; //кількість характеристик

console.time("time");
function d(X, Y) {
  let dist = 0;
  for (let i = 0; i < columns; i++) {
    dist += (X[i] - Y[i]) ** 2;
  }
  return Math.sqrt(dist);
}

function Wdistance(list) {
  let minDistance = 10 ** 10;
  let index = [];
  let inCluster = [];
  let cluster = {
    pair: [],
    distance: []
  };
  for (let k = 0; k < rows - 1; k++) {
    minDistance = 10 ** 10;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < i; j++) {
        if (
          d(list[i], list[j]) < minDistance &&
          !(inCluster.includes(i) && inCluster.includes(j))
        ) {
          minDistance = d(list[i], list[j]);
          index = [i, j];
        }
      }
    }
    inCluster.push(index[0], index[1]);
    cluster.pair.push(index);
    cluster.distance.push(minDistance);
  }
  console.log(cluster);
}

let price = [5500, 5000, 3200, 5500, 5500, 13000, 16600, 12200, 16000, 16000];
let HP = [100, 130, 550, 510, 450, 450, 510, 140, 230, 250];
let standartedPrice = dataStandartization(price);
let standartedHP = dataStandartization(HP);

let clustersList = [];
const cluster = {
  centroid: [],
  points: []
};
for (let i = 0; i < rows; i++) {
  clustersList[i] = Object.create(cluster);
  (clustersList[i].centroid = [i]),
    (clustersList[i].points = [standartedPrice[i], standartedHP[i]]);
}
console.log(clustersList);

console.timeEnd("time");
