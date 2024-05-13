import dataStandartization from "./standartization_module.js";
import hierarchicalClustering, { nodes } from "./clustering_module.js";
import { createTreeStructure, sameArray } from "./dataTreeStructure_module.js";
import renderTree, {
  removeTree,
  getSize,
  midlePosition
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
  //x,Y = massive
  let sum = 0;
  for (let i = 0; i < columns; i++) {
    sum += (X[i] - Y[i]) ** 2;
  }
  return Math.sqrt(sum);
}

function ultrametricDistance(X, Y) {
  //x,Y = massive
  let sum = 0;
  for (let i = 0; i < columns; i++) {
    sum += (X[i] - Y[i]) ** 2;
  }
  return Math.sqrt(sum) / (1 + Math.sqrt(sum));
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

  let allAttributes = document.getElementsByClassName("row");
  let IDsList = document.getElementsByClassName("identifier");

  attributesValueList = [];
  let newAttrColumn = [];
  for (let i = 0; i < allAttributes.length; i++) {
    if (allAttributes[i].value === "") newAttrColumn.push(0);
    else newAttrColumn.push(parseFloat(allAttributes[i].value));
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
    else objectList[i].identifier = [IDsList[i].value];
    attrArray = [];
    for (let j = 0; j < columns; j++) {
      attrArray.push(attributesValueList[j][i]);
    }
    objectList[i].attributeValue = attrArray;
  }
  removeTree();
  try {
    if (document.getElementById("Euclid-distance").checked) {
      distanceCalculation(objectList, EuclidDistance);
      console.log(objectList);
    } else {
      distanceCalculation(objectList, ultrametricDistance);
      console.log(objectList);
    }

    const mainCluster = hierarchicalClustering(objectList);
    let nodesIDCopy = [...nodes.clusterID];
    const dataTree = createTreeStructure(mainCluster, nodesIDCopy);
    const rootElement = document.getElementById("dendograme-area");
    renderTree(dataTree, rootElement, 1, midlePosition);
  } catch {
    alert("error");
  }
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
