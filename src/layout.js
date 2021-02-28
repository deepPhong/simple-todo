import { Item } from "./components.js"
import { addProjectToList } from "./logic.js"

export const renderSidebar = (projectList) => {
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");

  const sidebarTitle = document.createElement("div");
  sidebarTitle.innerHTML = "simple todo";
  sidebarTitle.classList.add("sidebar-title")
  const line = document.createElement("hr");
  sidebarTitle.appendChild(line);

  const projects = document.createElement("div");
  projects.classList.add("projects-container");

  sidebar.appendChild(sidebarTitle)
  sidebar.appendChild(projects);
  sidebar.append(newProjectButton(projectList))

  let container = document.querySelector(".container");
  container.appendChild(sidebar);
}

export const renderBoard = (projectList, projectId) => {
  let board = document.createElement("div");
  board.classList.add("board");
  board.dataset.project = projectId;
  board.appendChild(newItemButton(projectList, projectId))

  let container = document.querySelector(".container");
  container.appendChild(board);
  projectList[projectId].items.forEach((item) => {
    if (item.checked === false) {
      renderItem(item, projectList, projectId);
    }
  })

  let bottomline = document.createElement("hr");
  bottomline.style.width = "95%";
  board.appendChild(bottomline);

  projectList[projectId].items.forEach((item) => {
    if (item.checked === true) {
      renderItem(item, projectList, projectId);
    }
  })
}

export const clearBoard = () => {
  let board = document.querySelector(".board");
  board.remove();
}

export const renderLayout = (projectList, defaultProjectId) => {
  renderSidebar(projectList)
  renderBoard(projectList, defaultProjectId);
}

export const renderProjects = (projectList) => {
  let projectContainer = document.querySelector(".projects-container");
  for (const projectId in projectList) {
    let projectEntry = document.createElement("button");
    projectEntry.innerHTML = projectId;
    projectEntry.classList.add("project-item");
    projectEntry.contentEditable = true;
    projectEntry.style.whiteSpace = "pre-wrap";
    projectEntry.classList.add("project-item");
    projectEntry.addEventListener("click", () => {
      let board = document.querySelector(".board");
      if (board.dataset.project !== projectId) {
        clearBoard();
        renderBoard(projectList, projectId);
      }
    })
    projectContainer.appendChild(projectEntry);
  }
}

export const clearProjects = () => {
  let projectContainer = document.querySelector(".projects-container");
  projectContainer.innerHTML = "";
}

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
    renderBoard(projectList, projectId)
  })
  
  const form = document.createElement("div");
  form.classList.add("item-content");

  const title = document.createElement("input");
  title.type = "text";
  title.value = itemObject.title;
  title.classList.add("item-input");
  title.addEventListener("change", () => {
    itemObject.title = title.value;
  })

  const description = document.createElement("input");
  description.type = "text";
  description.value = itemObject.description;
  description.classList.add("item-input");
  description.classList.add("item-description");
  description.addEventListener("change", () => {
    itemObject.description = description.value;
  })

  const dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.name = "dueDate";
  dueDate.value = itemObject.dueDate;
  dueDate.classList.add("date-form");

  if (itemObject.checked === true) {
    title.style.textDecoration = "line-through solid rgb(223, 208, 1) 4px";
    description.style.textDecoration = "line-through solid rgb(223, 208, 1) 4px";
  }

  form.appendChild(checkbox);
  form.appendChild(title);
  form.appendChild(description);
  form.appendChild(dueDate);
  item.appendChild(form);

  let board = document.querySelector(".board");
  board.appendChild(item);
}

export const newProjectButton = (projectList) => {
  const projectButtonContainer = document.createElement("div");
  projectButtonContainer.classList.add("button-container");
  const button = document.createElement("button");
  projectButtonContainer.appendChild(button);
  button.textContent = "new project";
  button.classList.add("new-item");
  button.addEventListener("click", () => {
    let container = document.querySelector(".container");

    let lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    container.appendChild(lightbox);

    let form = document.createElement("form");
    form.classList.add("project-form");
    let title = document.createElement("input");
    title.type = "text";
    title.id = "project-title";
    title.classList.add("project-input");
    let submit = document.createElement("button");
    submit.innerHTML = "create";
    submit.classList.add("new-item");
    submit.addEventListener("click", (e) => {
      e.preventDefault()
      addProjectToList(projectList, document.querySelector("#project-title").value);
      clearProjects();
      renderProjects(projectList);
      let lightbox = document.querySelector("#lightbox");
      lightbox.remove();
      let dimmer = document.querySelector(".dimmer");
      dimmer.remove();
    })
    form.appendChild(title);
    form.appendChild(submit);
    lightbox.appendChild(form);

    let dimmer = document.createElement("div");
    dimmer.className = 'dimmer';

    dimmer.onclick = function(){
      container.removeChild(this);
      let lightbox = document.querySelector("#lightbox");
      lightbox.remove();
    }
    container.appendChild(dimmer);
    lightbox.style.visibility = 'visible';
  });

  return projectButtonContainer
}

export const newItemButton = (projectList, projectId) => {
  const itemButtonContainer = document.createElement("div");
  itemButtonContainer.classList.add("button-container");
  const button = document.createElement("button");
  itemButtonContainer.appendChild(button);
  button.textContent = "new task";
  button.classList.add("new-item");
  button.addEventListener("click", () => {
    let item = new Item;
    projectList[projectId].addItem(item);
    clearBoard();
    renderBoard(projectList, projectId);
  });

  return itemButtonContainer
}