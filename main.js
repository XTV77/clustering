import module from "./module.js";

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
function arrayStandartization(inputArr) {
  const arrLength = inputArr.length;
  let standartedArr = [];
  let avgInputArr = 0;
  let standartDeviation = 0;
  for (let i = 0; i < arrLength; i++) {
    avgInputArr += inputArr[i];
  }
  avgInputArr /= arrLength;
  avgInputArr = parseFloat(avgInputArr.toFixed(4));
  for (let i = 0; i < arrLength; i++) {
    standartDeviation += (inputArr[i] - avgInputArr) ** 2;
  }
  standartDeviation = Math.sqrt(standartDeviation / (arrLength - 1)); //Некореговане стандартне відхилення (кориговане n-1)
  standartDeviation = parseFloat(standartDeviation.toFixed(4));
  for (let i = 0; i < arrLength; i++) {
    standartedArr[i] = parseFloat(
      ((inputArr[i] - avgInputArr) / standartDeviation).toFixed(4)
    );
  }
  return standartedArr;
}
function lowestDistance(list) {
  let lowestD = 100;
  let cluster = {
    finded: [],
    pairs: [],
    distance: []
  };
  for (let k = 0; k < rows - 1; k++) {
    lowestD = 100;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < i; j++) {
        if (d(list[i], list[j]) < lowestD) {
          lowestD = d(list[i], list[j]);
        }
      }
    }
    console.log(lowestD);
  }
}

let price = [5500, 5000, 3200, 5500, 5500, 13000, 16600, 12200, 16000, 16000];
let HP = [100, 130, 550, 510, 450, 450, 510, 140, 230, 250];
let standartedPrice = arrayStandartization(price);
let standartedHP = arrayStandartization(HP);

let objectList = [];
for (let i = 0; i < rows; i++) {
  objectList[i] = [standartedPrice[i], standartedHP[i]];
}
lowestDistance(objectList);

console.timeEnd("time");
