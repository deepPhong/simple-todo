import { Item, Project } from "./components.js"

export const createSidebar = () => {
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");

  const sidebarTitle = document.createElement("div");
  sidebarTitle.innerHTML = "todo projects";
  sidebarTitle.classList.add("sidebar-title")
  sidebar.appendChild(sidebarTitle)

  const projects = document.createElement("div");
  projects.classList.add("projects-container");

  const line = document.createElement("hr");

  const inbox = document.createElement("button");
  inbox.innerHTML = "INBOX";
  inbox.classList.add("project-item");

  sidebar.append(line);
  sidebar.appendChild(inbox);
  sidebar.appendChild(projects);

  return sidebar
}

export const createBoard = () => {
  const board = document.createElement("div");
  board.classList.add("board");

  return board
}

export const createLayout = () => {
  let layout = document.createElement("div");
  layout.classList.add("container");

  let sidebar = createSidebar();
  layout.appendChild(sidebar);

  let board = createBoard();
  layout.appendChild(board);

  return layout
}

const clearProjects = () => {
  let projectContainer = document.querySelector(".projects-container");
  projectContainer.innerHTML = "";
}

const renderProjects = (projectList) => {
  let projectContainer = document.querySelector(".projects-container");
  projectList.forEach((project) => {
    let projectEntry = document.createElement("button");
    projectEntry.innerHTML = project.title;
    projectEntry.classList.add("project-item");
    projectEntry.contentEditable = true;
    projectEntry.style.whiteSpace = "pre-wrap";
    projectEntry.classList.add("project-item");
    projectContainer.appendChild(projectEntry);
  })
}

export const createItem = () => {
  let itemObject = new Item;

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

  return item
}

export const newProjectButton = (projectList) => {
  const projectButtonContainer = document.createElement("div");
  projectButtonContainer.classList.add("button-container");
  const button = document.createElement("button");
  projectButtonContainer.appendChild(button);
  button.textContent = "new project";
  button.classList.add("new-item");
  button.addEventListener("click", () => {
    let project = new Project;
    projectList.push(project);
    clearProjects();
    renderProjects(projectList);
  });

  return projectButtonContainer
}

export const newItemButton = () => {
  const itemButtonContainer = document.createElement("div");
  itemButtonContainer.classList.add("button-container");
  const button = document.createElement("button");
  itemButtonContainer.appendChild(button);
  button.textContent = "new task";
  button.classList.add("new-item");
  button.addEventListener("click", () => {
    let item = createItem();
    let board = document.querySelector(".board");
    board.appendChild(item);
  });

  return itemButtonContainer
}