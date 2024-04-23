import * as mod from "./module.js";
import dataStandartization from "./standartization_module.js";
import hierarchicalClustering, { nodes } from "./clustering_module.js";
import { createTreeStructure, sameArray } from "./tree_module.js";
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

function renderTree(tree, X) {
  let L = X,
    R = X;
  if (tree.root.length < 2) return;
  let Y = 0;
  for (let i = 0; i < nodes.clusterID.length; i++) {
    if (sameArray(tree.root, nodes.clusterID[i])) {
      Y = nodes.clusterDist[i];
    }
  }
  leftBranch(X, Y);
  if (typeof tree.node_2 == "object") {
    renderTree(tree.node_1, (L += 25));
    renderTree(tree.node_2, (R -= 50));
  }
}
let num = 1;
function leftBranch(X, Y) {
  const newBranch = document.createElement("div");
  newBranch.classList.value = "branch";
  newBranch.style.left = `calc(50% - ${X}px)`;
  newBranch.style.bottom = `2px`;
  newBranch.style.width = `${40 + Y * 20}px`;
  newBranch.style.height = `${Y * 250}px`;
  newBranch.innerHTML = `${num}`;
  rootElement.append(newBranch);
  num++;
}
function rightBranch() {}

renderTree(dataTree, 40);
console.timeEnd("time");
