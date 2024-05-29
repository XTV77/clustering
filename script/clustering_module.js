function clusterConcat(clustersArray, identifier, dist) {
  let clusterIndex = [];
  for (let i = 0; i < clustersArray.length; i++) {
    if (clustersArray[i].includes(identifier[0])) clusterIndex.push(i);
    if (clustersArray[i].includes(identifier[1])) clusterIndex.push(i);
  }
  if (clusterIndex[0] === clusterIndex[1]) return;
  clustersArray[clusterIndex[0]] = clustersArray[clusterIndex[0]].concat(
    clustersArray[clusterIndex[1]]
  );
  nodes.clusterID.unshift(clustersArray[clusterIndex[0]]);
  nodes.clusterDist.unshift(dist);
  clustersArray.splice(clusterIndex[1], 1);
}

function hierarchicalClustering(inputObjectList) {
  nodes.clusterID = [];
  nodes.clusterDist = [];

  const listLength = inputObjectList.length;
  let clustersArray = [];
  for (let i = 0; i < listLength; i++) {
    clustersArray.push(inputObjectList[i].identifier);
  }
  let minDistance = Infinity;
  let index = [];
  while (clustersArray.length > 1) {
    minDistance = Infinity;
    for (let i = 1; i < listLength; i++) {
      for (let j = 0; j < i; j++) {
        let d = inputObjectList[i].distance[j];
        if (d < minDistance && d !== 0) {
          minDistance = d;
          index = [i, j];
        }
      }
    }
    inputObjectList[index[0]].distance[index[1]] = 0;
    clusterConcat(
      clustersArray,
      [
        inputObjectList[index[0]].identifier[0],
        inputObjectList[index[1]].identifier[0]
      ],
      minDistance
    );
  }
  return clustersArray[0];
}
export default hierarchicalClustering;
export let nodes = {
  clusterID: [],
  clusterDist: []
};
