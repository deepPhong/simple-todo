import { Project } from './components.js';
import { renderLayout, renderProjects } from './layout.js';

export const initPage = () => {

  let container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);

  let projectList = {};
  addProjectToList(projectList, "Inbox");
  renderLayout(projectList, "Inbox");
  renderProjects(projectList);
  let inbox = document.querySelector(".project-item");
  inbox.style.textDecoration = "underline solid rgb(223, 208, 1) 4px";
}

export const addProjectToList = (projectList, title) => {
  let project = new Project();
  project.title = title;
  project.id = title;
  projectList[title] = project;
}