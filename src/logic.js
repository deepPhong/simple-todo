import { renderLayout, renderProjects, addProjectToList } from "./layout";

export default function initPage() {
  const container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);

  const projectList = {};
  addProjectToList(projectList, "Inbox");
  renderLayout(projectList, "Inbox");
  renderProjects(projectList);
  const inbox = document.querySelector(".project-item");
  inbox.style.textDecoration = "underline solid rgb(223, 208, 1) 4px";
}
