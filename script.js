// Отримуємо в константу елемент для виводу
const rootElement = document.getElementById("root");
// Виводимо (відмальовуємо) нашу розмітку
ReactDOM.createRoot(rootElement).render(<h1></h1>);

const rows = 10; //кількість об'єктів
const columns = 2; //кількість характеристик

console.time("time");
function metricDistance(X, Y) {
  let d = 0;
  for (let i = 0; i < columns; i++) {
    d += (X[i] - Y[i]) ** 2;
  }
  return Math.sqrt(d);
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
  console.log(avgInputArr);
  for (let i = 0; i < arrLength; i++) {
    standartDeviation += (inputArr[i] - avgInputArr) ** 2;
  }
  standartDeviation = Math.sqrt(standartDeviation / (arrLength - 1)); //Некореговане стандартне відхилення (кориговане n-1)
  standartDeviation = parseFloat(standartDeviation.toFixed(4));
  console.log(arrLength);
  console.log(standartDeviation);
  for (let i = 0; i < arrLength; i++) {
    standartedArr[i] = parseFloat(
      ((inputArr[i] - avgInputArr) / standartDeviation).toFixed(4)
    );
  }
  return standartedArr;
}
function lowestDistance() {}

let price = [5500, 5000, 3200, 5500, 5500, 13000, 16600, 12200, 16000, 16000];
let HP = [100, 130, 550, 510, 450, 450, 510, 140, 230, 250];
let standartedPrice = arrayStandartization(price);
let standartedHP = arrayStandartization(HP);

let objectList = [];
for (let i = 0; i < rows; i++) {
  objectList[i] = [standartedPrice[i], standartedHP[i]];
}

console.log(objectList);
console.log(metricDistance(objectList[4], objectList[3]));
console.timeEnd("time");
