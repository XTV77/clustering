import * as mod from "./module.js";
import dataStandartization from "./standartization_module.js";
import hierarchicalClustering, { nodes } from "./clustering_module.js";
import { createTreeStructure, sameArray } from "./dataTreeStructure_module.js";
import renderTree, { midlePosition } from "./renderTree_module.js";

const rows = 10; //кількість об'єктів
const columns = 2; //кількість характеристик
const Object_cluster = {
  identifier: [],
  distance: [],
  points: []
};

console.time("time");
function EuclidDistance(X, Y) {
  //x,Y = massive
  let sum = 0;
  for (let i = 0; i < columns; i++) {
    sum += (X[i] - Y[i]) ** 2;
  }
  return Math.sqrt(sum);
}
function distanceCalculation(cluster) {
  let distList = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++)
      distList.push(EuclidDistance(cluster[i].points, cluster[j].points));
    cluster[i].distance = distList;
    distList = [];
  }
}

let price = [5500, 5000, 3200, 5500, 5500, 13000, 16600, 12200, 16000, 16000];
let HP = [100, 130, 550, 510, 450, 450, 510, 140, 230, 250];
let standartedPrice = dataStandartization(price);
let standartedHP = dataStandartization(HP);

let objectList = [];
for (let i = 0; i < rows; i++) {
  objectList[i] = Object.create(Object_cluster);
  (objectList[i].identifier = [i + 1]),
    (objectList[i].points = [standartedPrice[i], standartedHP[i]]);
}

distanceCalculation(objectList);
let root = hierarchicalClustering(objectList)[0];

let nodesCopy = {};
for (let key in nodes) {
  nodesCopy[key] = [...nodes[key]];
}

const dataTree = createTreeStructure(root, nodesCopy.clusterID);
const dataTreeJSON = JSON.stringify(dataTree);
const rootElement = document.getElementById("root");

renderTree(dataTree, rootElement, 1, midlePosition);
console.timeEnd("time");
