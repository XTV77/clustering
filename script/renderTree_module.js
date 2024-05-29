const dendogrameArea = document.getElementById("dendograme-area");

import { nodes } from "./clustering_module.js";
import { sameArray } from "./dataTreeStructure_module.js";

export default renderTree;
export { leftPosition, rightPosition, midlePosition };

export function removeTree() {
  const allBranch = document.querySelectorAll(".branch");
  allBranch.forEach((el) => el.remove());
  const axis = document.querySelectorAll(".distance-axis");
  axis.forEach((el) => el.remove());
}

function renderTree(
  dataTreeStructure,
  renderRoot,
  clusterPosition,
  width,
  heightdiff
) {
  if (dataTreeStructure.root.length < 2) return;
  let height = 0;

  for (let i = 0; i < nodes.clusterID.length; i++) {
    if (sameArray(dataTreeStructure.root, nodes.clusterID[i])) {
      height = nodes.clusterDist[i] * branchHeight;
    }
  }
  const newSubcluster = document.createElement("div");
  clusterPosition(newSubcluster, width, height + heightdiff);
  addPoint(height, heightdiff, `[${dataTreeStructure.root}]`);
  newSubcluster.innerHTML = `[${dataTreeStructure.root}]`;
  newSubcluster.setAttribute(
    "title",
    `[${dataTreeStructure.root}],--(H:${(height / branchHeight).toFixed(3)})--`
  );
  renderRoot.append(newSubcluster);
  let newRoot = newSubcluster;

  if (typeof dataTreeStructure.node_2 === "object") {
    renderTree(
      dataTreeStructure.node_1,
      newRoot,
      leftPosition,
      width / 2,
      heightdiff - 14
    );
    renderTree(
      dataTreeStructure.node_2,
      newRoot,
      rightPosition,
      width / 2,
      heightdiff - 14
    );
  }
}

let branchHeight = 150;
let branchdWidth = 200;
export function getSize(height, width) {
  if (height !== "" && parseInt(height) > 0 && parseInt(height) < 1001)
    branchHeight = parseInt(height);
  if (width !== "" && parseInt(width) > 0 && parseInt(width) < 1001)
    branchdWidth = parseInt(width);
}

function leftPosition(cluster, width, height) {
  cluster.classList.value = "branch";
  cluster.style.left = `0px`;
  cluster.style.bottom = "0px";
  cluster.style.transform = `translate(${-50}%)`;
  cluster.style.width = `${branchdWidth * width + 10}px`;
  cluster.style.height = `${height}px`;
}
function rightPosition(cluster, width, height) {
  cluster.classList.value = "branch";
  cluster.style.right = `0px`;
  cluster.style.bottom = "0px";
  cluster.style.transform = `translate(${50}%)`;
  cluster.style.width = `${branchdWidth * width + 10}px`;
  cluster.style.height = `${height}px`;
}
function midlePosition(cluster, width, height) {
  cluster.classList.value = "branch";
  cluster.style.bottom = "0px";
  cluster.style.left = `calc(50% - ${0}px)`;
  cluster.style.transform = `translate(${-50}%)`;
  cluster.style.width = `${branchdWidth * width + 10}px`;
  cluster.style.height = `${height}px`;
}

function addPoint(height, diff, clusterName) {
  const newPoint = document.createElement("div");
  newPoint.classList.add("distance-axis");
  newPoint.innerHTML = `${clusterName}--${(height / branchHeight).toFixed(
    3
  )}————`;
  newPoint.style.bottom = `${height + diff}px`;
  dendogrameArea.append(newPoint);
}
