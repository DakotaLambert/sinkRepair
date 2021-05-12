import { getPlumbers, getRequests, saveCompletion } from "./dataAccess.js";


const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("change", (event) => {

  
  if (event.target.id === "plumbers") {
    const [requestId, plumberName] = event.target.value.split("--");
    
    // let formatDate = formatDate.toISOString()
    /*
    This object should have 3 properties
    1. requestId
    2. plumberId
    3. date_created
    */
   const completion = {
     requestId,
     plumberName,
     date_created: new Date().toLocaleTimeString() + " | " + new Date().toLocaleDateString()

    };
    
    saveCompletion(completion);
    /*
              Invoke the function that performs the POST request
              to the `completions` resource for your API. Send the
              completion object as a parameter.
           */
  }
});

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
        <button class="request__delete"
                id="request--${requestObject.id}">
            Delete
        </button>
</select>
    </li>
`;
      })
      .join("")}
      
`;
};
