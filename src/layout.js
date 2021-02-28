import { Item, Project } from "./components.js"
import { addProjectToList } from "./logic.js"

export const renderSidebar = (projectList) => {
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");

  const sidebarTitle = document.createElement("div");
  sidebarTitle.innerHTML = "todo projects";
  sidebarTitle.classList.add("sidebar-title")
  const line = document.createElement("hr");
  sidebarTitle.append(line);

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
    renderItem(item);
  })
  return board
}

export const clearBoard = () => {
  let board = document.querySelector(".board");
  board.remove();
}

export const renderLayout = (projectList, defaultProjectId) => {
  let container = document.querySelector(".container");
  renderSidebar(projectList)

  // let sidebar = renderSidebar(projectList);
  // container.appendChild(sidebar);

  let board = renderBoard(projectList, defaultProjectId);
  container.appendChild(board);
}

export const clearProjects = () => {
  let projectContainer = document.querySelector(".projects-container");
  projectContainer.innerHTML = "";
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
      if (board.dataset !== projectId) {
        clearBoard();
        let newBoard = renderBoard(projectList, projectId);
        let layout = document.querySelector(".container");
        layout.appendChild(newBoard);
      }
    })
    projectContainer.appendChild(projectEntry);
  }
}

export const renderItem = (itemObject) => {
  const item = document.createElement("div");
  item.classList.add("item");
  
  const form = document.createElement("div");
  form.classList.add("item-content");

  const title = document.createElement("div");
  title.innerHTML = itemObject.title;
  title.contentEditable = true;

  const description = document.createElement("div");
  description.innerHTML = itemObject.description;
  description.contentEditable = true;

  const dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.name = "dueDate";
  dueDate.value = itemObject.dueDate;
  dueDate.classList.add("date-form");

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