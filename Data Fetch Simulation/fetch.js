const postsList = document.querySelector(".items-list");
const postTemplate = document.getElementById("item");
const fetchButton = document.querySelector(".fetch-items");
const sendDataForm = document.getElementById("send-data-form");
const submitButton = sendDataForm.querySelector(".submit");
const clearAllButton = document.querySelector(".clear-items");

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(method, url);
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.send(data);
  });
  return promise;
}

function setTimer(duration) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!");
    }, duration);
  });
  return promise;
}

function clearData() {
  postsList.innerHTML = `<template id="item">
          <div class="container">
            <h3></h3>
            <p></p>
            <button class="btn-small">DELETE</button>
          </div>
        </template>`;
}

function getData() {
  document.querySelector(".fetching").classList.remove("invisible");
  clearData();
  setTimer(5000).then(() => {
    sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts")
      .then((responses) => {
        postsList.addEventListener("click", (event) => {
          if (event.target.tagName === "BUTTON") {
            deleteData(event.target.parentElement.parentElement.id);
            event.target.parentElement.remove();
          }
        });
        for (const response of responses) {
          const postEl = document.importNode(postTemplate.content, true);
          postEl.querySelector("h3").textContent = response.title.toUpperCase();
          postEl.querySelector("p").textContent = response.body;
          postEl.querySelector("li").id = response.id;
          postsList.append(postEl);
        }
      })
      .finally(() => {
        document.querySelector(".fetching").classList.add("invisible");
      });
  });
}

async function sendData() {
  const titleText = document.getElementById("title").value;
  const descriptionText = document.getElementById("description").value;
  console.log(titleText, descriptionText);
  const userId = Math.random();
  const post = {
    title: titleText,
    body: descriptionText,
    userId: userId,
  };

  response = await sendHttpRequest(
    "POST",
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
  console.log(response);
}

async function deleteData(userId) {
  const response = await sendHttpRequest(
    "DELETE",
    `https://jsonplaceholder.typicode.com/posts/${userId}`
  );

  console.log(response);
}

sendDataForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});

fetchButton.addEventListener("click", getData);
clearAllButton.addEventListener("click", clearData);
