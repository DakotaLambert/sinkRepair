//this module keeps two different states in sync

import { renderRequests } from "./main.js";

export const applicationState = {
  requests: [],
  plumbers: [],
  completions: []
};

const API = "http://localhost:8088";
//.json files are essentially one big string that resembles a JavaScript object, so you can create data hierarchies in your database

//create a function that fetches the data from the requests array in JSON, then returns a Javascript object
export const fetchRequests = () => {

  //please get the data from internet
  return fetch(`${API}/requests`)

  //.json converts JSON data into JavaScript objects
    .then((response) => response.json())
    .then((serviceRequest) => {
      // applicationState.requests is overwritten with what was fetched
      applicationState.requests = serviceRequest;
    });
};

//create a function that fetches the data from the plumbers property in database.json
export const fetchPlumbers = () => {
  //returns localhost/plumbers
  return fetch(`${API}/plumbers`)

  // then takes JSON as input and reads the data to completion, and resolves it to a JS object
    .then((response) => response.json())

    .then((plumber) => {
      //What exactly does the = part do?
      applicationState.plumbers = plumber;
    });
};
export const fetchCompletions = () => {
  return fetch(`${API}/completions`)
    .then((response) => response.json())
    .then((completion) => {
      // Store the external state in application state
      applicationState.completions = completion;
    });
};





export const getRequests = () => {

  const requestsWithCompletion = applicationState.requests.map(request => {

    request.completed = !!applicationState.completions.find(c => c.requestId === request.id)
      return request

  }).sort((c,n) => {
    return c.completed - n.completed
  })

  console.log(requestsWithCompletion)
  return requestsWithCompletion

};

export const sendRequest = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };
  
  return fetch(`${API}/requests`, fetchOptions)
  .then((response) => response.json())
  .then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};




export const getPlumbers = () => {
  return [...applicationState.plumbers];
};

export const sendPlumber = (plumberName) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plumberName),
  };

  return fetch(`${API}/plumbers`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};





export const saveCompletion = (completionId) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completionId),
  };

  return fetch(`${API}/completions`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("stateChanged", () => {
  renderRequests();
});


export const newObject = () => {
  
}




export const deleteRequest = (id) => {
  return fetch(`${API}/requests/${id}`, { method: "DELETE" }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};
