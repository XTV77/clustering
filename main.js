import * as mod from "./module.js";
import dataStandartization from "./standartization_module.js";
const rows = 10; //кількість об'єктів
const columns = 2; //кількість характеристик

console.time("time");
function EuclidDistance(X, Y) {
  //x,Y = massive
  let dist = 0;
  for (let i = 0; i < columns; i++) {
    dist += (X[i] - Y[i]) ** 2;
  }
  return Math.sqrt(dist);
}
function distanceCalculation(list) {
  let distList = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++)
      distList.push(EuclidDistance(list[i].points, list[j].points));
    list[i].distance = distList;
    distList = [];
  }
}
function clusterConection(cluster_1, cluster_2) {
  const newCluster = Object.create(cluster);
  let distList = [];
  newCluster.centroid = cluster_1.centroid.concat(cluster_2.centroid);
  for (let i = 0; i < rows; i++) {
    if (
      (cluster_1.distance[i] < cluster_2.distance[i] &&
        cluster_1.distance[i] != 0) ||
      (cluster_1.distance[i] > cluster_2.distance[i] &&
        cluster_2.distance[i] == 0)
    )
      distList.push(cluster_1.distance[i]);
    else distList.push(cluster_2.distance[i]);
  }
  newCluster.distance = distList;
  return newCluster;
}

function minDistance(list) {
  let minDistance = Infinity;
  let index = [];
}

let price = [5500, 5000, 3200, 5500, 5500, 13000, 16600, 12200, 16000, 16000];
let HP = [100, 130, 550, 510, 450, 450, 510, 140, 230, 250];
let standartedPrice = dataStandartization(price);
let standartedHP = dataStandartization(HP);

let clustersList = [];
const cluster = {
  centroid: [],
  distance: [],
  points: []
};
for (let i = 0; i < rows; i++) {
  clustersList[i] = Object.create(cluster);
  (clustersList[i].centroid = [i]),
    (clustersList[i].points = [standartedPrice[i], standartedHP[i]]);
}
distanceCalculation(clustersList);
console.log(clusterConection(clustersList[8], clustersList[9]));

console.timeEnd("time");
