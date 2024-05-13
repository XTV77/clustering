function dataStandartization(inputArr) {
  const arrLength = inputArr.length;
  let standartedArr = [];
  let average = 0;
  let standartDeviation = 0;
  for (let i = 0; i < arrLength; i++) {
    average += inputArr[i];
  }
  average /= arrLength;
  average = parseFloat(average.toFixed(4));
  for (let i = 0; i < arrLength; i++) {
    standartDeviation += (inputArr[i] - average) ** 2;
  }
  standartDeviation = Math.sqrt(standartDeviation / (arrLength - 1)); //Некореговане стандартне відхилення (/n) (кориговане n-1)
  standartDeviation = parseFloat(standartDeviation.toFixed(4));
  if (standartDeviation === 0) {
    for (let i = 0; i < arrLength; i++) {
      standartedArr.push(0);
    }
  } else {
    for (let i = 0; i < arrLength; i++) {
      standartedArr[i] = parseFloat(
        ((inputArr[i] - average) / standartDeviation).toFixed(4)
      );
    }
  }
  return standartedArr;
}

export default dataStandartization;
