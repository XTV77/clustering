function clusterConcat(clustersArray, ind) {
  let clustersIndex = [];
  for (let i = 0; i < clustersArray.length; i++) {
    if (clustersArray[i].includes(ind[0])) clustersIndex.push(i);
    if (clustersArray[i].includes(ind[1])) clustersIndex.push(i);
  }
  if (clustersIndex[0] === clustersIndex[1]) return;
  clustersArray[clustersIndex[0]] = clustersArray[clustersIndex[0]].concat(
    clustersArray[clustersIndex[1]]
  );
  nodes.unshift(clustersArray[clustersIndex[0]]);
  clustersArray.splice(clustersIndex[1], 1);
}
function hierarchicalClustering(inputObjectList) {
  const listLength = inputObjectList.length;
  const inputListCopy = [...inputObjectList];
  let clusters = [];
  for (let i = 0; i < listLength; i++) {
    clusters.push(inputObjectList[i].identifier);
  }
  let minDistance = Infinity;
  let index = [];
  while (clusters.length > 1) {
    minDistance = Infinity;
    for (let i = 1; i < listLength; i++) {
      for (let j = 0; j < i; j++) {
        let d = inputListCopy[i].distance[j];
        if (d < minDistance && d != 0) {
          minDistance = d;
          index = [i, j];
        }
      }
    }
    inputListCopy[index[0]].distance[index[1]] = 0;
    clusterConcat(clusters, [
      inputListCopy[index[0]].identifier[0],
      inputListCopy[index[1]].identifier[0]
    ]);
  }
  return clusters;
}
export default hierarchicalClustering;
export let nodes = [];
