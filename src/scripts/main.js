import { fetchPlumbers, fetchRequests } from "./dataAccess.js";
import { SinkRepair } from "./SinkRepair.js";
import { deleteRequest } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

export const renderRequests = () => {
  fetchRequests()
    .then(() => fetchPlumbers())
    .then(() => {
      mainContainer.innerHTML = SinkRepair();
    });
};

mainContainer.addEventListener("click", (click) => {
  if (click.target.id.startsWith("request--")) {
    const [, requestId] = click.target.id.split("--");
    deleteRequest(parseInt(requestId));
  }
});
// mainContainer.addEventListener(
//   "stateChanged",
//   customEvent => {
//       renderRequests()
//   }
// )
renderRequests();
