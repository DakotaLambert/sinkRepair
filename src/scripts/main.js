import { fetchPlumbers, fetchRequests } from "./dataAccess.js";
import { SinkRepair } from "./SinkRepair.js";
// import { deleteRequest } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

export const renderRequests = () => {
  fetchRequests()
    .then(() => fetchPlumbers())
    .then(() => {
      mainContainer.innerHTML = SinkRepair();
    });
};



mainContainer.addEventListener("stateChanged", () => {
  renderRequests();
});

renderRequests()
// mainContainer.addEventListener("stateChanged",
// customEvent => {
//   renderRequests()
// })