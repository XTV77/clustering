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

export default arrayStandartization;
