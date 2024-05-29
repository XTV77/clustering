const mainRoot = document.getElementById("dendograme-area");

import dataStandartization from "./standartization_module.js";
import hierarchicalClustering, { nodes } from "./clustering_module.js";
import { createTreeStructure, sameArray } from "./dataTreeStructure_module.js";
import renderTree, {
  removeTree,
  getSize,
  midlePosition,
  rightPosition
} from "./renderTree_module.js";

const Object_cluster = {
  attributeValue: [],
  identifier: [],
  distance: []
};

let rows = 1;
let columns = 1;
if (
  localStorage.getItem("countOFcolumns") !== null &&
  localStorage.getItem("countOFrows") !== null
) {
  rows = parseInt(localStorage.getItem("countOFrows")); //кількість об'єктів
  columns = parseInt(localStorage.getItem("countOFcolumns")); //кількість характеристик
}
let objectList = [];
let attributesValueList = [];

//////////////////////////////////////////////////////////////////
//*************************************************************//
//*************************Function***************************//
//***********************************************************//
//////////////////////////////////////////////////////////////

function EuclidDistance(X, Y) {
  //x,Y = array
  let sum = 0;
  for (let i = 0; i < columns; i++) {
    sum += (X[i] - Y[i]) ** 2;
  }
  return Math.sqrt(sum);
}

function ultrametricDistance(X, Y) {
  //x,Y = array
  let sum = 0;
  for (let i = 0; i < columns; i++) {
    sum += (X[i] - Y[i]) ** 2;
  }
  return Math.sqrt(sum) / (1 + Math.sqrt(sum));
}

function maxUltrametricDistance(X, Y) {
  //x,Y = array
  let max = 0;
  for (let i = 0; i < columns; i++) {
    if (Math.abs(X[i] - Y[i]) > max) max = Math.abs(X[i] - Y[i]);
  }
  return max;
}

function distanceCalculation(inputObjectList, distFunc) {
  let distList = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++)
      distList.push(
        distFunc(
          inputObjectList[i].attributeValue,
          inputObjectList[j].attributeValue
        )
      );
    inputObjectList[i].distance = distList;
    distList = [];
  }
}

//////////////////////////////////////////////////////////////////
//*************************************************************//
//***********************EvenListener*************************//
//***********************************************************//
//////////////////////////////////////////////////////////////

document.getElementById("open-close__button").addEventListener("click", () => {
  const menu = document.querySelector(".input-data__menu");
  if (menu.style.top === "0px") {
    menu.style.top = "-88%";
    document.getElementById("open-close__button").style.transform =
      "rotate(45deg)";
  } else {
    menu.style.top = "0px";
    document.getElementById("open-close__button").style.transform =
      "rotate(225deg)";
  }
});

document
  .querySelector(".get-rows-columns__button")
  .addEventListener("click", () => {
    const countOFrows = document.getElementById("getRows").value;
    const countOFcolumns = document.getElementById("getColumns").value;
    if (
      0 < parseFloat(countOFrows) &&
      0 < parseFloat(countOFcolumns) &&
      11 > parseFloat(countOFrows) &&
      11 > parseFloat(countOFcolumns)
    ) {
      rows = countOFrows;
      columns = countOFcolumns;
      localStorage.setItem("countOFrows", countOFrows);
      localStorage.setItem("countOFcolumns", countOFcolumns);
    } else {
      alert("максимальна розмірність 10 х 10");
    }
    document.getElementById("getRows").value = "";
    document.getElementById("getColumns").value = "";
  });

document.getElementById("create-tree__button").addEventListener("click", () => {
  const createTreeButton = document.getElementById("create-tree__button");
  createTreeButton.style.boxShadow = "";

  /////////////////////////////////////////
  // rows = 10;
  // columns = 5;

  let IDsList = document.getElementsByClassName("identifier");
  // let IDsList = [];
  // for (let i = 0; i < rows; i++) {
  //   IDsList.push(`${i + 1}`);
  // }

  let allAttributesValuesList = document.getElementsByClassName("row");
  // let allAttributesValuesList = [
  //   [1992, 2001, 1991, 2007, 2006, 1985, 2018, 2022, 2003, 1995],
  //   [68, 217, 399, 133, 76, 128, 86, 230, 132, 479],
  //   [32, 24, 18, 75, 89, 62, 19, 84, 68, 90],
  //   [98, 31, 70, 89, 74, 32, 31, 31, 72, 47],
  //   [18, 79, 15, 90, 69, 65, 49, 39, 8, 7]
  // ].flat();

  attributesValueList = [];
  let newAttrColumn = [];
  // for (let i = 0; i < allAttributesValuesList.length; i++) {
  //   newAttrColumn.push(allAttributesValuesList[i]);
  //   if (newAttrColumn.length === rows) {
  //     attributesValueList.push(dataStandartization(newAttrColumn));
  //     newAttrColumn = [];
  //   }
  // }
  for (let i = 0; i < allAttributesValuesList.length; i++) {
    if (allAttributesValuesList[i].value === "") newAttrColumn.push(0);
    else newAttrColumn.push(parseFloat(allAttributesValuesList[i].value));
    if (newAttrColumn.length === rows) {
      attributesValueList.push(dataStandartization(newAttrColumn));
      newAttrColumn = [];
    }
  }

  objectList = [];
  let attrArray = [];
  for (let i = 0; i < rows; i++) {
    objectList[i] = Object.create(Object_cluster);
    if (IDsList[i].value === "") objectList[i].identifier = [`${i}`];
    else objectList[i].identifier = [IDsList[i].value]; ////IDsList[i].value
    attrArray = [];
    for (let j = 0; j < columns; j++) {
      attrArray.push(attributesValueList[j][i]);
    }
    objectList[i].attributeValue = attrArray;
  }

  removeTree();

  console.time("metric");

  if (document.getElementById("ultrametric-distance").checked) {
    distanceCalculation(objectList, ultrametricDistance);
  } else if (document.getElementById("max-distance").checked) {
    distanceCalculation(objectList, maxUltrametricDistance);
  } else {
    distanceCalculation(objectList, EuclidDistance);
  }

  console.timeEnd("metric");

  const mainCluster = hierarchicalClustering(objectList);
  let nodesIDCopy = [...nodes.clusterID];

  const dataTree = createTreeStructure(mainCluster, nodesIDCopy);

  renderTree(dataTree, mainRoot, midlePosition, 1, 0);
});

document.getElementById("change-size__button").addEventListener("click", () => {
  const newHeight = document.getElementById("newHeight").value;
  const newWidth = document.getElementById("newWidth").value;
  document.getElementById("newHeight").value = "";
  document.getElementById("newWidth").value = "";
  if (newHeight !== "" || newWidth !== "") {
    getSize(newHeight, newWidth);
    const createTreeButton = document.getElementById("create-tree__button");
    createTreeButton.style.boxShadow = "0px 0px 12px #ffffff";
  }
});
