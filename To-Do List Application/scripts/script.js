const taskControls = document.querySelector(".to-do-controls");
const addNewTaskButton = document.querySelector(".add-new-item");
const addTaskButton = document.querySelector(".add-item");
const taskName = taskControls.querySelector(".to-do-text");
const taskHeadingText = document.querySelector(".to-do-text-heading");
const taskDate = taskControls.querySelector(".date-selector");
const nameHelperText = taskControls.querySelector(".task-name-helper-text");
const dateHelperText = taskControls.querySelector(".date-helper-text");
const resetFieldsButton = document.querySelector(".reset-fields");
const dueDateText = document.querySelector(".due-date");
const emptyHelperText = document.querySelector(".empty-helper-text");
const duplicateElementHelperText = document.querySelector(
    ".duplicate-element-helper-text"
);
const clearListButton = document.querySelector(".clear-list");
const taskList = document.querySelector(".list-items");
const confirmDeletionSection = document.querySelector(".confirm-clear-list");
const NothingHelperText = document.querySelector(".nothing-helper-text");

let tasks = [];
let dueDates = [];
let numberOftasks = 0;

function getTodayDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    today = yyyy + "-" + mm + "-" + dd;
    document.querySelector(".date-selector").setAttribute("min", today);
}

getTodayDate();

function showTaskControls() {
    nameHelperText.classList.add("invisible");
    dateHelperText.classList.add("invisible");
    taskDate.value = "";
    taskName.value = "";
    taskControls.classList.toggle("invisible");
}

function checkZeroTasks() {
    if (tasks.length === 0) {
        emptyHelperText.classList.remove("invisible");
    }
}

function addTaskToList() {
    let dueDate;
    let nameOfTask;
    if (taskName.value === "" && taskDate.value === "") {
        nameHelperText.classList.remove("invisible");
        dateHelperText.classList.remove("invisible");
    } else if (taskName.value === "" && taskDate.value) {
        nameHelperText.classList.remove("invisible");
        dateHelperText.classList.add("invisible");
    } else if (taskDate.value === "" && taskName.value) {
        dateHelperText.classList.remove("invisible");
        nameHelperText.classList.add("invisible");
    }
    if (taskName.value && taskDate.value) {
        nameHelperText.classList.add("invisible");
        dateHelperText.classList.add("invisible");
        nameOfTask = taskName.value;
        dueDate = taskDate.value;
        createNewTaskItem(nameOfTask, dueDate);
        emptyHelperText.classList.add("invisible");
    }
}

function createNewTaskItem(nameOfTask, dueDate) {
    taskList.style.display = "block";
    const taskItem = new TaskItem(nameOfTask, dueDate);
    taskItem.renderTaskItem();
    resetFields();
}

function resetFields() {
    nameHelperText.classList.add("invisible");
    dateHelperText.classList.add("invisible");
    taskDate.value = "";
    taskName.value = "";
}

function checkDuplicateTask(taskName, taskDate) {
    let flag = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (taskName === tasks[i] && dueDates[i] === taskDate) {
            flag = 1;
        }
    }
    return flag;
}

function showTaskInnerControls(task) {
    const inner = task.parentElement.querySelector(".task-inner-controls");
    inner.classList.toggle("invisible");
}

function removeTask(target) {
    const eleToRemove = target.parentElement.parentElement;
    const taskElementToRemove =
        target.parentElement.parentElement.querySelector(
            ".task-heading"
        ).textContent;
    const taskNameToRemoveIndex =
        taskElementToRemove.indexOf("Task :") + "Task: ".length;
    const dueDateToRemoveIndex =
        taskElementToRemove.indexOf("Due: ") + "Due: ".length;
    const taskNameToRemove = taskElementToRemove
        .slice(taskNameToRemoveIndex, dueDateToRemoveIndex - "Due: ".length)
        .trim();
    const dueDateToRemove = taskElementToRemove
        .slice(dueDateToRemoveIndex)
        .trim();
    removeTaskAndDueDate(taskNameToRemove, dueDateToRemove);
    taskList.removeChild(eleToRemove);
    checkZeroTasks();
    hideNothingHelperText();
}

function removeTaskAndDueDate(taskName, dueDate) {
    for (let i = 0; i < tasks.length; i++) {
        if (taskName === tasks[i] && dueDate === dueDates[i]) {
            tasks.splice(i, 1);
            dueDates.splice(i, 1);
        }
    }
}

class TaskItem {
    constructor(taskName, taskDate) {
        this.taskName = taskName;
        this.taskDate = taskDate;
    }

    renderTaskItem() {
        const taskList = document.querySelector(".list-items");
        const newTaskElement = document.createElement("li");
        if (checkDuplicateTask(this.taskName, this.taskDate)) {
            duplicateElementHelperText.classList.remove("invisible");
            return;
        } else {
            tasks.push(this.taskName);
            dueDates.push(this.taskDate);
            numberOftasks++;
        }
        newTaskElement.className = `task-item item-${tasks.length}`;
        newTaskElement.innerHTML = `
        <p class = "task-heading heading-${numberOftasks}">Task: ${this.taskName} <br> Due: ${this.taskDate}</p>
        <div class = "task-inner-controls controls-${numberOftasks} invisible">
            <button class = "btn remove-task-button rem-button-${tasks.length}" type = "button">Remove Task</button>
        </div>
        `;
        taskList.append(newTaskElement);
        duplicateElementHelperText.classList.add("invisible");
        taskList.classList.remove("invisible");
        hideNothingHelperText();
    }
}

function showConfirmDeletion() {
    confirmDeletionSection.classList.remove("invisible");
    const confirmBackground = confirmDeletionSection.querySelector(
        ".confirm-background"
    );
    confirmBackground.removeEventListener("click", () => {
        confirmDeletionSection.classList.add("invisible");
    });
    confirmBackground.addEventListener("click", () => {
        confirmDeletionSection.classList.add("invisible");
    });
    const yesButton = confirmDeletionSection.querySelector(".confirm-yes");
    yesButton.removeEventListener("click", clearAllTasks);
    yesButton.addEventListener("click", clearAllTasks);
    const noButton = confirmDeletionSection.querySelector(".confirm-no");
    noButton.removeEventListener("click", () => {
        confirmDeletionSection.classList.add("invisible");
    });
    noButton.addEventListener("click", () => {
        confirmDeletionSection.classList.add("invisible");
    });
}

function clearAllTasks() {
    if (tasks.length > 0) {
        const taskList = document.querySelector(".list-items");
        taskList.innerHTML = "";
        taskList.style.display = "none";
        numberOftasks = 0;
        taskDate.value = "";
        taskName.value = "";
        tasks = [];
        dueDates = [];
        hideNothingHelperText();
    } else {
        showNothingHelperText();
    }
    checkZeroTasks();
    confirmDeletionSection.classList.add("invisible");
}

function showNothingHelperText() {
    NothingHelperText.classList.remove("invisible");
}

function hideNothingHelperText() {
    NothingHelperText.classList.add("invisible");
}

addNewTaskButton.addEventListener("click", showTaskControls);
addTaskButton.addEventListener("click", addTaskToList);
resetFieldsButton.addEventListener("click", resetFields);
taskList.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("task-heading")) {
        showTaskInnerControls(target);
    }
    if (target.classList.contains("remove-task-button")) {
        removeTask(target);
    }
});
clearListButton.addEventListener("click", showConfirmDeletion);
