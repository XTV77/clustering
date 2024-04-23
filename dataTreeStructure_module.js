function sameArray(arr1, arr2) {
  if (
    arr1.length == arr2.length &&
    arr1[0] == arr2[0] &&
    arr1[arr1.length - 1] == arr2[arr2.length - 1]
  )
    return true;
  else return false;
}
function createTreeStructure(cluster, nodeSet) {
  if (cluster.length < 2)
    return { root: cluster, node_1: cluster[0].toString() };
  if (cluster.length < 3)
    return {
      root: cluster,
      node_1: cluster[0].toString(),
      node_2: cluster[1].toString()
    };
  for (let i = 0; i < nodeSet.length; i++) {
    if (sameArray(cluster, nodeSet[i])) {
      nodeSet.splice(i, 1);
      break;
    }
  }
  let nodeSet1 = [cluster[0]],
    nodeSet2 = cluster.slice(1, cluster.length);
  for (let i = 0; i < nodeSet.length; i++) {
    if (
      cluster[0] == nodeSet[i][0] &&
      nodeSet[i][nodeSet[i].length - 1] == cluster[nodeSet[i].length - 1]
    ) {
      nodeSet1 = cluster.slice(0, nodeSet[i].length);
      nodeSet2 = cluster.slice(nodeSet[i].length, cluster.length);
      break;
    }
  }
  return {
    root: cluster,
    node_1: createTreeStructure(nodeSet1, nodeSet),
    node_2: createTreeStructure(nodeSet2, nodeSet)
  };
}

export { createTreeStructure, sameArray };
