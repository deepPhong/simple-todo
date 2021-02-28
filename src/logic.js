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
}

export const addProjectToList = (projectList, title) => {
  let project = new Project();
  project.title = title;
  project.id = title;
  projectList[title] = project;
}