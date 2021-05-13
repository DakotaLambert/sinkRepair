import { renderRequests } from "./main.js";

export const applicationState = {
  requests: [],
  plumbers: [],
  completions: []
};

const API = "http://localhost:8088";

export const fetchRequests = () => {
  return fetch(`${API}/requests`)
    .then((response) => response.json())
    .then((serviceRequests) => {
      // Store the external state in application state
      applicationState.requests = serviceRequests;
    });
};
export const fetchPlumbers = () => {
  return fetch(`${API}/plumbers`)
    .then((response) => response.json())
    .then((plumber) => {
      // Store the external state in application state
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

    let isComplete = [...applicationState.requests]
    
    isComplete.sort((current, next) => {
        return current.completed - next.completed
    })

  return [...applicationState.requests];
};
export const getPlumbers = () => {
  return [...applicationState.plumbers];
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

mainContainer.addEventListener("stateChanged", (customEvent) => {
  renderRequests();
});

export const deleteRequest = (id) => {
  return fetch(`${API}/requests/${id}`, { method: "DELETE" }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};
