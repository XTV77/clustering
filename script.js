// Отримуємо в константу елемент для виводу
const rootElement = document.getElementById("root");
// Виводимо (відмальовуємо) нашу розмітку

ReactDOM.createRoot(rootElement).render(<h1>12</h1>);

console.time("time");
function metricDistance(x, y) {
  return Math.abs(x - y);
}
function dataStandartization(inputArr) {
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
  standartDeviation = Math.sqrt(standartDeviation / arrLength); //Некореговане стандартне відхилення (кориговане n-1)
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
let price = [5500, 5000, 3200, 5500, 5500, 13000, 16600, 12200, 16000, 16000];
console.log(`string + num ${dataStandartization(price)}`);
console.timeEnd("time");
