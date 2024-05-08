import { nodes } from "./clustering_module.js";
import { sameArray } from "./dataTreeStructure_module.js";

function renderTree(
  dataTreeStructure,
  renderRoot,
  clusterWidth,
  clusterPosition
) {
  if (dataTreeStructure.root.length < 2) return;
  let clusterHeight = 0;
  for (let i = 0; i < nodes.clusterID.length; i++) {
    if (sameArray(dataTreeStructure.root, nodes.clusterID[i])) {
      clusterHeight = nodes.clusterDist[i];
    }
  }
  const newSubcluster = document.createElement("div");
  clusterPosition(newSubcluster, clusterWidth, clusterHeight);
  newSubcluster.innerHTML = `[${dataTreeStructure.root}]`;
  renderRoot.append(newSubcluster);
  let newRoot = newSubcluster;

  if (typeof dataTreeStructure.node_2 == "object") {
    renderTree(
      dataTreeStructure.node_1,
      newRoot,
      clusterWidth / 2,
      leftPosition
    );
    renderTree(
      dataTreeStructure.node_2,
      newRoot,
      clusterWidth / 2,
      rightPosition
    );
  }
}

const standartedHeight = 250;
const standartedWidth = 300;
function leftPosition(cluster, width, height) {
  cluster.classList.value = "branch";
  cluster.style.left = `0px`;
  cluster.style.bottom = "0px";
  cluster.style.transform = `translate(${-50}%)`;
  cluster.style.width = `${standartedWidth * width + 10}px`;
  cluster.style.height = `${height * standartedHeight}px`;
}
function rightPosition(cluster, width, height) {
  cluster.classList.value = "branch";
  cluster.style.right = `0px`;
  cluster.style.bottom = "0px";
  cluster.style.transform = `translate(${50}%)`;
  cluster.style.width = `${standartedWidth * width + 10}px`;
  cluster.style.height = `${height * standartedHeight}px`;
}
function midlePosition(cluster, width, height) {
  cluster.classList.value = "branch";
  cluster.style.bottom = "0px";
  cluster.style.left = `calc(50% - ${0}px)`;
  cluster.style.transform = `translate(${-50}%)`;
  cluster.style.width = `${standartedWidth * width + 10}px`;
  cluster.style.height = `${height * standartedHeight}px`;
}

export default renderTree;
export { leftPosition, rightPosition, midlePosition };
