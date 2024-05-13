import { nodes } from "./clustering_module.js";
import { sameArray } from "./dataTreeStructure_module.js";

export function removeTree() {
  const allBranch = document.querySelectorAll(".branch");
  allBranch.forEach((el) => el.remove());
}

function renderTree(dataTreeStructure, renderRoot, width, clusterPosition) {
  if (dataTreeStructure.root.length < 2) return;
  let height = 0;
  for (let i = 0; i < nodes.clusterID.length; i++) {
    if (sameArray(dataTreeStructure.root, nodes.clusterID[i])) {
      height = nodes.clusterDist[i];
    }
  }
  const newSubcluster = document.createElement("div");
  clusterPosition(newSubcluster, width, height);
  newSubcluster.innerHTML = `[${dataTreeStructure.root}]`;
  renderRoot.append(newSubcluster);
  let newRoot = newSubcluster;

  if (typeof dataTreeStructure.node_2 === "object") {
    renderTree(dataTreeStructure.node_1, newRoot, width / 2, leftPosition);
    renderTree(dataTreeStructure.node_2, newRoot, width / 2, rightPosition);
  }
}

let branchHeight = 50;
let branchdWidth = 50;
export function getSize(height, width) {
  if (height !== "" && parseInt(height) > 0 && parseInt(height) < 500)
    branchHeight = parseInt(height);
  if (width !== "" && parseInt(width) > 0 && parseInt(width) < 500)
    branchdWidth = parseInt(width);
}

function leftPosition(cluster, width, height) {
  cluster.classList.value = "branch";
  cluster.style.left = `0px`;
  cluster.style.bottom = "0px";
  cluster.style.transform = `translate(${-50}%)`;
  cluster.style.width = `${branchdWidth * width + 10}px`;
  cluster.style.height = `${height * branchHeight}px`;
}
function rightPosition(cluster, width, height) {
  cluster.classList.value = "branch";
  cluster.style.right = `0px`;
  cluster.style.bottom = "0px";
  cluster.style.transform = `translate(${50}%)`;
  cluster.style.width = `${branchdWidth * width + 10}px`;
  cluster.style.height = `${height * branchHeight}px`;
}
function midlePosition(cluster, width, height) {
  cluster.classList.value = "branch";
  cluster.style.bottom = "0px";
  cluster.style.left = `calc(50% - ${0}px)`;
  cluster.style.transform = `translate(${-50}%)`;
  cluster.style.width = `${branchdWidth * width + 10}px`;
  cluster.style.height = `${height * branchHeight}px`;
}

export default renderTree;
export { leftPosition, rightPosition, midlePosition };
