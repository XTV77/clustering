import * as mod from "./module.js";
import dataStandartization from "./standartization_module.js";
import hierarchicalClustering, { nodes } from "./clustering_module.js";
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
//console.log(root, nodes);

// let arrTest = [1, 2, 3, 4, 5];
// function recurs(x) {
//   if (x.length < 3) return { node_1: x[0], node_2: x[1] };

//   return { node_1: x.shift(), node_2: recurs(x) };
// }
function nodecreator(cluster, node) {
  if (cluster.length < 2) return { node_1: cluster[0].toString() };
  if (cluster.length < 3)
    return { node_1: cluster[0].toString(), node_2: cluster[1].toString() };
  for (let i = 0; i < node.length; i++) {
    if (
      cluster.length == node[i].length &&
      cluster[0] == node[i][0] &&
      cluster[cluster.length - 1] == node[i][cluster.length - 1]
    ) {
      name = node[0].toString();
      node.splice(i, 1);
      break;
    }
  }
  let node1 = [cluster[0]],
    node2 = cluster.slice(1, cluster.length);
  for (let i = 0; i < node.length; i++) {
    if (
      cluster[0] == node[i][0] &&
      node[i][node[i].length - 1] == cluster[node[i].length - 1]
    ) {
      node1 = cluster.slice(0, node[i].length);
      node2 = cluster.slice(node[i].length, cluster.length);
      break;
    }
  }
  return {
    node_1: nodecreator(node1, node),
    node_2: nodecreator(node2, node)
  };
}
let nodesCopy = [...nodes];
const dataTree = nodecreator(root, nodesCopy);
const dataTreeJSON = JSON.stringify(dataTree);
console.log(dataTreeJSON);

console.timeEnd("time");
