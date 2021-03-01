import Project from "./project";
import Item from "./item";

export const addProjectToList = (projectList, title) => {
  const project = new Project();
  project.title = title;
  project.id = title;
  projectList[title] = project;
};

const renderSidebar = (projectList, projectId) => {
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");

  const sidebarTitle = document.createElement("div");
  sidebarTitle.innerHTML = "simple todo";
  sidebarTitle.classList.add("sidebar-title");
  const topline = document.createElement("hr");
  sidebarTitle.appendChild(topline);

  const projects = document.createElement("div");
  projects.classList.add("projects-container");

  sidebar.appendChild(sidebarTitle);
  sidebar.appendChild(projects);

  sidebar.append(newProjectButton(projectList));
  sidebar.appendChild(newItemButton(projectList, projectId));

  const container = document.querySelector(".container");
  container.appendChild(sidebar);
};

const renderBoard = (projectList, projectId) => {
  const board = document.createElement("div");
  board.classList.add("board");
  board.dataset.project = projectId;

  const sidebar = document.querySelector(".sidebar");
  const newItem = document.querySelector(".new-item-button");
  newItem.remove();
  sidebar.appendChild(newItemButton(projectList, projectId));

  const container = document.querySelector(".container");
  container.appendChild(board);
  Object.values(projectList[projectId].items).forEach((item) => {
    if (item.checked === false) {
      renderItem(item, projectList, projectId);
    }
  });

  Object.values(projectList[projectId].items).forEach((item) => {
    if (item.checked === true) {
      renderItem(item, projectList, projectId);
    }
  });
};

export const renderLayout = (projectList, defaultProjectId) => {
  renderSidebar(projectList, defaultProjectId);
  renderBoard(projectList, defaultProjectId);
};

export const clearBoard = () => {
  const board = document.querySelector(".board");
  board.remove();
};

export const clearProjects = () => {
  const projectContainer = document.querySelector(".projects-container");
  projectContainer.innerHTML = "";
};

export const renderProjects = (projectList) => {
  const projectContainer = document.querySelector(".projects-container");
  Object.keys(projectList).forEach((projectId) => {
    const projectEntry = document.createElement("button");
    projectEntry.innerHTML = projectId;
    projectEntry.classList.add("project-item");
    projectEntry.style.whiteSpace = "pre-wrap";
    projectEntry.classList.add("project-item");
    if (projectList[projectId].selected === true) {
      projectEntry.style.textDecoration =
        "underline solid rgb(223, 208, 1) 4px";
    }
    projectEntry.addEventListener("click", () => {
      if (projectList[projectId].selected === false) {
        Object.keys(projectList).forEach((projectId) => {
          projectList[projectId].selected = false;
        });
        projectList[projectId].toggleSelected();
      }
      const board = document.querySelector(".board");
      if (board.dataset.project !== projectId) {
        clearBoard();
        renderBoard(projectList, projectId);
        clearProjects();
        renderProjects(projectList);
      }
    });
    projectContainer.appendChild(projectEntry);
  });
};

export const renderItem = (itemObject, projectList, projectId) => {
  const item = document.createElement("div");
  item.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = itemObject.checked;
  checkbox.addEventListener("change", () => {
    itemObject.toggleChecked();
    clearBoard();
    renderBoard(projectList, projectId);
  });

  const form = document.createElement("div");
  form.classList.add("item-content");

  const title = document.createElement("input");
  title.type = "text";
  title.value = itemObject.title;
  title.classList.add("item-input");
  title.addEventListener("change", () => {
    itemObject.title = title.value;
  });

  const description = document.createElement("input");
  description.type = "text";
  description.value = itemObject.description;
  description.classList.add("item-input");
  description.classList.add("item-description");
  description.addEventListener("change", () => {
    itemObject.description = description.value;
  });

  const dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.name = "dueDate";
  dueDate.value = itemObject.dueDate;
  dueDate.classList.add("date-form");

  const deleteItem = document.createElement("button");
  deleteItem.innerHTML = "delete";
  deleteItem.classList.add("item-delete");
  deleteItem.addEventListener("click", () => {
    projectList[projectId].removeItem(itemObject);
    clearBoard();
    renderBoard(projectList, projectId);
  });

  if (itemObject.checked === true) {
    title.style.textDecoration = "line-through solid rgb(223, 208, 1) 4px";
    description.style.textDecoration =
      "line-through solid rgb(223, 208, 1) 4px";
    item.style.opacity = "0.5";
  }

  form.appendChild(checkbox);
  form.appendChild(title);
  form.appendChild(description);
  form.appendChild(dueDate);
  form.append(deleteItem);
  item.appendChild(form);

  const board = document.querySelector(".board");
  board.appendChild(item);
};

export const newProjectButton = (projectList) => {
  const projectButtonContainer = document.createElement("div");
  projectButtonContainer.classList.add("button-container");
  const button = document.createElement("button");
  projectButtonContainer.appendChild(button);
  button.textContent = "new project";
  button.classList.add("new-button");
  button.addEventListener("click", () => {
    const container = document.querySelector(".container");

    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    container.appendChild(lightbox);

    const form = document.createElement("form");
    form.classList.add("project-form");
    const title = document.createElement("input");
    title.type = "text";
    title.id = "project-title";
    title.classList.add("project-input");
    const submit = document.createElement("button");
    submit.innerHTML = "create";
    submit.classList.add("new-button");
    submit.addEventListener("click", (e) => {
      e.preventDefault();
      addProjectToList(
        projectList,
        document.querySelector("#project-title").value
      );
      clearProjects();
      renderProjects(projectList);
      const lightbox = document.querySelector("#lightbox");
      lightbox.remove();
      const dimmer = document.querySelector(".dimmer");
      dimmer.remove();
    });
    form.appendChild(title);
    form.appendChild(submit);
    lightbox.appendChild(form);

    const dimmer = document.createElement("div");
    dimmer.className = "dimmer";

    dimmer.onclick = function () {
      container.removeChild(this);
      const lightbox = document.querySelector("#lightbox");
      lightbox.remove();
    };
    container.appendChild(dimmer);
    lightbox.style.visibility = "visible";
  });

  return projectButtonContainer;
};

export const newItemButton = (projectList, projectId) => {
  const itemButtonContainer = document.createElement("div");
  itemButtonContainer.classList.add("button-container");
  const button = document.createElement("button");
  itemButtonContainer.appendChild(button);
  button.textContent = "new task";
  button.classList.add("new-button");
  button.classList.add("new-item-button");
  button.addEventListener("click", () => {
    const item = new Item();
    projectList[projectId].addItem(item);
    clearBoard();
    renderBoard(projectList, projectId);
  });

  return itemButtonContainer;
};
