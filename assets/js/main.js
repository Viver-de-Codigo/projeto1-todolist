let tasks = [];

const handleUpdateTaskBadges = () => {
  const completedTasksBadge = document.querySelector("#completedTasksBadge");
  const createdTasksBadge = document.querySelector("#createdTasksBadge");

  if (!completedTasksBadge || !createdTasksBadge) {
    return;
  }

  createdTasksBadge.textContent = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed);

  completedTasksBadge.textContent = `${completedTasks.length} de ${tasks.length}`;
};

const handleCompleteTask = (taskIndex) => {
  console.log(`completed task ${taskIndex}`);
  const getMemoryTask = tasks[taskIndex];
  const taskElement = document.querySelector(`#task-item-${taskIndex}`);

  if (!taskElement || !getMemoryTask) {
    return;
  }

  // change completed property in memo
  getMemoryTask.completed = true;

  // update localStorage task
  const getLocalStorageTasks = window.localStorage.getItem("tasks");
  if (!getLocalStorageTasks) {
    return;
  }

  const parsedLsTasks = JSON.parse(getLocalStorageTasks);

  const getLsTask = parsedLsTasks[taskIndex];

  if (!getLsTask) {
    return;
  }

  getLsTask.completed = true;

  window.localStorage.setItem("tasks", JSON.stringify(parsedLsTasks));

  // add completed task to html
  taskElement.classList.add("completed");

  handleUpdateTaskBadges();
};

const handleRemoveTask = (taskIndex) => {
  console.log("taskIndex", taskIndex);
  const taskElement = document.querySelector(`#task-item-${taskIndex}`);

  if (!taskElement) {
    return;
  }

  taskElement.remove();

  const getLocalStorageTasks = window.localStorage.getItem("tasks");

  if (!getLocalStorageTasks) {
    return;
  }

  const parsedLocalStorageTasks = JSON.parse(getLocalStorageTasks);

  parsedLocalStorageTasks.splice(taskIndex, 1);

  tasks.splice(taskIndex, 1);

  window.localStorage.setItem("tasks", JSON.stringify(parsedLocalStorageTasks));

  handleUpdateTaskBadges();
};

const handleTasks = () => {
  const form = document.querySelector("#formElement");
  const tasksContainer = document.querySelector("#tasksContainer");

  if (!form || !tasksContainer) {
    return;
  }

  const handleLocalStorageInit = () => {
    const getLocalStorageTasks = window.localStorage.getItem("tasks");

    if (!getLocalStorageTasks) {
      window.localStorage.setItem("tasks", JSON.stringify([]));
      return;
    }

    const parsedLsTasks = JSON.parse(getLocalStorageTasks);

    console.log("parsedTasks", parsedLsTasks);

    tasks = parsedLsTasks;
  };

  const addNewLsTask = (newTaskObj) => {
    const getLocalStorageTasks = window.localStorage.getItem("tasks");
    if (!getLocalStorageTasks) {
      return;
    }

    const parsedLsTasks = JSON.parse(getLocalStorageTasks);

    parsedLsTasks.push(newTaskObj);

    window.localStorage.setItem("tasks", JSON.stringify(parsedLsTasks));
  };

  handleLocalStorageInit();

  handleUpdateTaskBadges();

  console.log("tasks", tasks);

  for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
    const task = tasks[taskIndex];

    tasksContainer.insertAdjacentHTML(
      "beforeend",
      `<li class="task-item${
        task.completed ? ` completed` : ""
      }" id="task-item-${taskIndex}">
      <button class="completeTaskBtn" onclick="handleCompleteTask(${taskIndex})">
        <svg
          class="uncompleted-icon"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.96428 1.85958C10.3765 1.85958 11.7571 2.27836 12.9313 3.06297C14.1056 3.84757 15.0208 4.96277 15.5612 6.26752C16.1017 7.57228 16.2431 9.00799 15.9676 10.3931C15.6921 11.7782 15.012 13.0505 14.0134 14.0492C13.0148 15.0478 11.7424 15.7278 10.3573 16.0034C8.9722 16.2789 7.53648 16.1375 6.23173 15.597C4.92697 15.0566 3.81178 14.1414 3.02717 12.9671C2.24257 11.7929 1.82378 10.4123 1.82378 9.00007C1.8311 7.10855 2.58574 5.29658 3.92326 3.95906C5.26079 2.62154 7.07275 1.86689 8.96428 1.85958ZM8.96428 0.2728C7.23972 0.279855 5.55592 0.797691 4.12543 1.76093C2.69494 2.72418 1.58191 4.08964 0.926831 5.68495C0.271755 7.28026 0.104012 9.03389 0.444777 10.7245C0.785541 12.415 1.61954 13.9667 2.84148 15.1837C4.06342 16.4007 5.61852 17.2283 7.31046 17.5622C9.00241 17.896 10.7553 17.7211 12.348 17.0595C13.9406 16.398 15.3015 15.2794 16.2589 13.845C17.2163 12.4105 17.7272 10.7246 17.7273 9.00007C17.7273 7.85098 17.5003 6.7132 17.0595 5.65202C16.6187 4.59085 15.9727 3.62717 15.1585 2.8163C14.3443 2.00543 13.378 1.36333 12.315 0.926849C11.2521 0.490367 10.1134 0.268099 8.96428 0.2728Z"
            fill="#7B7B7B"
          />
        </svg>
        <svg class="completed-icon" width="18"
        height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.9">
            <path d="M11.9801 19.4262C16.0726 19.4262 19.3903 16.1085 19.3903 12.0159C19.3903 7.92336 16.0726 4.60568 11.9801 4.60568C7.8875 4.60568 4.56982 7.92336 4.56982 12.0159C4.56982 16.1085 7.8875 19.4262 11.9801 19.4262Z" fill="#3F8220"/>
            <path d="M11.9643 4.85957C13.3765 4.85957 14.7571 5.27835 15.9313 6.06296C17.1056 6.84757 18.0208 7.96276 18.5612 9.26752C19.1017 10.5723 19.2431 12.008 18.9676 13.3931C18.6921 14.7782 18.012 16.0505 17.0134 17.0492C16.0148 18.0478 14.7424 18.7278 13.3573 19.0034C11.9722 19.2789 10.5365 19.1375 9.23173 18.597C7.92697 18.0566 6.81178 17.1414 6.02717 15.9671C5.24257 14.7929 4.82378 13.4123 4.82378 12.0001C4.8311 10.1085 5.58574 8.29657 6.92326 6.95905C8.26079 5.62153 10.0728 4.86688 11.9643 4.85957ZM11.9643 3.27279C10.2397 3.27985 8.55592 3.79768 7.12543 4.76093C5.69494 5.72417 4.58191 7.08964 3.92683 8.68495C3.27176 10.2803 3.10401 12.0339 3.44478 13.7245C3.78554 15.415 4.61954 16.9667 5.84148 18.1837C7.06342 19.4006 8.61852 20.2283 10.3105 20.5622C12.0024 20.896 13.7553 20.7211 15.348 20.0595C16.9406 19.398 18.3015 18.2794 19.2589 16.8449C20.2163 15.4105 20.7272 13.7246 20.7273 12.0001C20.7273 10.851 20.5003 9.71319 20.0595 8.65202C19.6187 7.59084 18.9727 6.62716 18.1585 5.81629C17.3443 5.00542 16.378 4.36332 15.315 3.92684C14.2521 3.49036 13.1134 3.26809 11.9643 3.27279Z" fill="#3F8220"/>
            <path d="M15.4306 9.34212L11.0986 13.6741L8.61618 11.1916L7.78027 12.0275L11.0986 15.3459L16.2665 10.178L15.4306 9.34212Z" fill="#F2F2F2"/>
          </g>
        </svg>
      </button>
      <p>${task.message}</p>
      <button onclick="handleRemoveTask(${taskIndex})">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.2021 9.98548H12.8716V15.5073H14.2021V9.98548Z"
            fill="#808080"
          />
          <path
            d="M11.4624 9.98548H10.1318V15.5073H11.4624V9.98548Z"
            fill="#808080"
          />
          <path
            d="M18.478 7.16712C18.4754 7.03061 18.4295 6.89846 18.3469 6.78975C18.2642 6.68104 18.1492 6.6014 18.0184 6.56232C17.9596 6.53782 17.8974 6.52252 17.8339 6.51696H14.2868C14.1525 6.07791 13.8808 5.69355 13.5117 5.42047C13.1426 5.14739 12.6956 5 12.2365 5C11.7774 5 11.3304 5.14739 10.9613 5.42047C10.5922 5.69355 10.3205 6.07791 10.1862 6.51696H6.63911C6.58068 6.51814 6.52269 6.52729 6.46674 6.54418H6.45162C6.31318 6.58701 6.19334 6.67547 6.11163 6.79515C6.02992 6.91483 5.99117 7.05866 6.00169 7.20319C6.01222 7.34771 6.0714 7.48441 6.16958 7.59099C6.26776 7.69757 6.39916 7.76774 6.54234 7.79006L7.25298 17.5334C7.26382 17.9127 7.41693 18.2741 7.68191 18.5458C7.94688 18.8175 8.30435 18.9797 8.68332 19H15.7867C16.1662 18.9804 16.5244 18.8186 16.79 18.5468C17.0556 18.2751 17.2092 17.9132 17.22 17.5334L17.9277 7.79914C18.0802 7.77797 18.22 7.70232 18.3212 7.58615C18.4223 7.46999 18.478 7.32116 18.478 7.16712ZM12.2365 6.21456C12.3661 6.21458 12.4943 6.24146 12.6129 6.29351C12.7316 6.34556 12.8382 6.42164 12.926 6.51696H11.547C11.6346 6.42135 11.7411 6.34507 11.8599 6.29299C11.9786 6.24092 12.1069 6.21421 12.2365 6.21456ZM15.7867 17.7904H8.68332C8.60168 17.7904 8.47467 17.6573 8.45955 17.4457L7.75798 7.81123H16.715L16.0135 17.4457C15.9984 17.6573 15.8714 17.7904 15.7867 17.7904Z"
            fill="#808080"
          />
        </svg>
      </button>
    </li>`
    );
  }

  const handleCreateNewTask = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const inputValue = formData.get("add-task");

    const newTaskObj = {
      message: inputValue,
      completed: false,
    };

    // adicionar em memoria
    tasks.push(newTaskObj);

    document.querySelector("#add-task").value = "";

    // add ao html
    tasksContainer.insertAdjacentHTML(
      "beforeend",
      `<li class="task-item" id="task-item-${tasks.length - 1}">
      <button class="completeTaskBtn" onclick="handleCompleteTask(${
        tasks.length - 1
      })">
      <svg
      class="uncompleted-icon"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.96428 1.85958C10.3765 1.85958 11.7571 2.27836 12.9313 3.06297C14.1056 3.84757 15.0208 4.96277 15.5612 6.26752C16.1017 7.57228 16.2431 9.00799 15.9676 10.3931C15.6921 11.7782 15.012 13.0505 14.0134 14.0492C13.0148 15.0478 11.7424 15.7278 10.3573 16.0034C8.9722 16.2789 7.53648 16.1375 6.23173 15.597C4.92697 15.0566 3.81178 14.1414 3.02717 12.9671C2.24257 11.7929 1.82378 10.4123 1.82378 9.00007C1.8311 7.10855 2.58574 5.29658 3.92326 3.95906C5.26079 2.62154 7.07275 1.86689 8.96428 1.85958ZM8.96428 0.2728C7.23972 0.279855 5.55592 0.797691 4.12543 1.76093C2.69494 2.72418 1.58191 4.08964 0.926831 5.68495C0.271755 7.28026 0.104012 9.03389 0.444777 10.7245C0.785541 12.415 1.61954 13.9667 2.84148 15.1837C4.06342 16.4007 5.61852 17.2283 7.31046 17.5622C9.00241 17.896 10.7553 17.7211 12.348 17.0595C13.9406 16.398 15.3015 15.2794 16.2589 13.845C17.2163 12.4105 17.7272 10.7246 17.7273 9.00007C17.7273 7.85098 17.5003 6.7132 17.0595 5.65202C16.6187 4.59085 15.9727 3.62717 15.1585 2.8163C14.3443 2.00543 13.378 1.36333 12.315 0.926849C11.2521 0.490367 10.1134 0.268099 8.96428 0.2728Z"
        fill="#7B7B7B"
      />
    </svg>
    <svg class="completed-icon" width="18"
    height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.9">
        <path d="M11.9801 19.4262C16.0726 19.4262 19.3903 16.1085 19.3903 12.0159C19.3903 7.92336 16.0726 4.60568 11.9801 4.60568C7.8875 4.60568 4.56982 7.92336 4.56982 12.0159C4.56982 16.1085 7.8875 19.4262 11.9801 19.4262Z" fill="#3F8220"/>
        <path d="M11.9643 4.85957C13.3765 4.85957 14.7571 5.27835 15.9313 6.06296C17.1056 6.84757 18.0208 7.96276 18.5612 9.26752C19.1017 10.5723 19.2431 12.008 18.9676 13.3931C18.6921 14.7782 18.012 16.0505 17.0134 17.0492C16.0148 18.0478 14.7424 18.7278 13.3573 19.0034C11.9722 19.2789 10.5365 19.1375 9.23173 18.597C7.92697 18.0566 6.81178 17.1414 6.02717 15.9671C5.24257 14.7929 4.82378 13.4123 4.82378 12.0001C4.8311 10.1085 5.58574 8.29657 6.92326 6.95905C8.26079 5.62153 10.0728 4.86688 11.9643 4.85957ZM11.9643 3.27279C10.2397 3.27985 8.55592 3.79768 7.12543 4.76093C5.69494 5.72417 4.58191 7.08964 3.92683 8.68495C3.27176 10.2803 3.10401 12.0339 3.44478 13.7245C3.78554 15.415 4.61954 16.9667 5.84148 18.1837C7.06342 19.4006 8.61852 20.2283 10.3105 20.5622C12.0024 20.896 13.7553 20.7211 15.348 20.0595C16.9406 19.398 18.3015 18.2794 19.2589 16.8449C20.2163 15.4105 20.7272 13.7246 20.7273 12.0001C20.7273 10.851 20.5003 9.71319 20.0595 8.65202C19.6187 7.59084 18.9727 6.62716 18.1585 5.81629C17.3443 5.00542 16.378 4.36332 15.315 3.92684C14.2521 3.49036 13.1134 3.26809 11.9643 3.27279Z" fill="#3F8220"/>
        <path d="M15.4306 9.34212L11.0986 13.6741L8.61618 11.1916L7.78027 12.0275L11.0986 15.3459L16.2665 10.178L15.4306 9.34212Z" fill="#F2F2F2"/>
      </g>
    </svg>
      </button>
      <p>${inputValue}</p>
     <button onclick="handleRemoveTask(${tasks.length - 1})">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.2021 9.98548H12.8716V15.5073H14.2021V9.98548Z"
            fill="#808080"
          />
          <path
            d="M11.4624 9.98548H10.1318V15.5073H11.4624V9.98548Z"
            fill="#808080"
          />
          <path
            d="M18.478 7.16712C18.4754 7.03061 18.4295 6.89846 18.3469 6.78975C18.2642 6.68104 18.1492 6.6014 18.0184 6.56232C17.9596 6.53782 17.8974 6.52252 17.8339 6.51696H14.2868C14.1525 6.07791 13.8808 5.69355 13.5117 5.42047C13.1426 5.14739 12.6956 5 12.2365 5C11.7774 5 11.3304 5.14739 10.9613 5.42047C10.5922 5.69355 10.3205 6.07791 10.1862 6.51696H6.63911C6.58068 6.51814 6.52269 6.52729 6.46674 6.54418H6.45162C6.31318 6.58701 6.19334 6.67547 6.11163 6.79515C6.02992 6.91483 5.99117 7.05866 6.00169 7.20319C6.01222 7.34771 6.0714 7.48441 6.16958 7.59099C6.26776 7.69757 6.39916 7.76774 6.54234 7.79006L7.25298 17.5334C7.26382 17.9127 7.41693 18.2741 7.68191 18.5458C7.94688 18.8175 8.30435 18.9797 8.68332 19H15.7867C16.1662 18.9804 16.5244 18.8186 16.79 18.5468C17.0556 18.2751 17.2092 17.9132 17.22 17.5334L17.9277 7.79914C18.0802 7.77797 18.22 7.70232 18.3212 7.58615C18.4223 7.46999 18.478 7.32116 18.478 7.16712ZM12.2365 6.21456C12.3661 6.21458 12.4943 6.24146 12.6129 6.29351C12.7316 6.34556 12.8382 6.42164 12.926 6.51696H11.547C11.6346 6.42135 11.7411 6.34507 11.8599 6.29299C11.9786 6.24092 12.1069 6.21421 12.2365 6.21456ZM15.7867 17.7904H8.68332C8.60168 17.7904 8.47467 17.6573 8.45955 17.4457L7.75798 7.81123H16.715L16.0135 17.4457C15.9984 17.6573 15.8714 17.7904 15.7867 17.7904Z"
            fill="#808080"
          />
        </svg>
      </button>
    </li>`
    );

    addNewLsTask(newTaskObj);

    handleUpdateTaskBadges();
  };

  form.addEventListener("submit", handleCreateNewTask);
};

window.addEventListener("load", handleTasks);
