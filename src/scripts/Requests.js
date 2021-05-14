import { getPlumbers, getRequests, saveCompletion } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

export const Requests = () => {
  const requests = getRequests();
  const plumbers = getPlumbers();
  return `
  
  ${requests
    .map((requestObject) => {
      return `
      <li>
      ${requestObject.description}
      
      <select class="plumbers" id="plumbers">
      <option value="">Choose Plumber</option>
      ${plumbers.map((plumbers) => {
        return `<option value="${requestObject.id}--${plumbers.name}">${plumbers.name}</option>`;
      })}
      </select>
        <button class="request__delete" id="request--${requestObject.id}">
      Delete
      </button>

      </select>
      </li>
      `;
    })
    .join("")}
    
    `;
};

mainContainer.addEventListener("change", (event) => {
  if (event.target.id === "plumbers") {
    const [requestId, plumberName] = event.target.value.split("--");
    const requestIdNumber = parseInt(requestId)

    const completion = {
      requestId: requestIdNumber,
      plumberName,
      date_created: new Date().toLocaleTimeString() + " | " + new Date().toLocaleDateString(),
    };

    saveCompletion(completion);
    /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            
  }
});

// mainContainer.addEventListener("change", () => {
//   let completionCopy = {...applicationState.completions}

//   if(completionCopy.completed === true) {
//     completionCopy.sort((current, next) => {
//       return current.completionCopy - next.completionCopy
//     })
//   }
// })