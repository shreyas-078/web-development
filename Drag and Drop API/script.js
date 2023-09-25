const task1 = document.querySelector(".stuff-1");
const task2 = document.querySelector(".stuff-2");

const activeStuff = document.querySelector(".active-stuff");
const doneStuff = document.querySelector(".done-stuff");

activeStuff.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
});

doneStuff.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
});

activeStuff.addEventListener("dragover", (event) => {
  event.preventDefault();
  activeStuff.classList.add("active");
});

doneStuff.addEventListener("dragover", (event) => {
  event.preventDefault();
  doneStuff.classList.add("active");
});

activeStuff.addEventListener("dragleave", () => {
  activeStuff.classList.remove("active");
});

doneStuff.addEventListener("dragleave", () => {
  doneStuff.classList.remove("active");
});

doneStuff.addEventListener("drop", (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  let dropId = event.dataTransfer.getData("text/plain");
  if (dropId && doneStuff.querySelector(`#${dropId}`)) {
    return;
  }
  if (dropId === "task1" || dropId === "task2") {
    let dropTask = document.importNode(document.getElementById(dropId), true);
    activeStuff.removeChild(activeStuff.querySelector(`#${dropId}`));
    doneStuff.append(dropTask);
  }
  doneStuff.classList.remove("active");
});

activeStuff.addEventListener("drop", (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  let dropId = event.dataTransfer.getData("text/plain");
  if (dropId && activeStuff.querySelector(`#${dropId}`)) {
    return;
  }
  if (dropId === "task1" || dropId === "task2") {
    let dropTask = document.importNode(document.getElementById(dropId), true);
    doneStuff.removeChild(doneStuff.querySelector(`#${dropId}`));
    activeStuff.append(dropTask);
  }
  activeStuff.classList.remove("active");
});

activeStuff.addEventListener("dragend", () => {
  activeStuff.classList.remove("active");
});

doneStuff.addEventListener("dragend", () => {
  doneStuff.classList.remove("active");
});
