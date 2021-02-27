import { Item, Project } from './components.js';
import { 
  createSidebar, 
  createBoard, 
  createLayout, 
  createProject, 
  renderProjects, 
  newProjectButton, 
  newItemButton 
} from './layout.js';

export const initPage = () => {
  let layout = createLayout()
  document.body.appendChild(layout)

  let projectList = [];

  let sidebar = document.querySelector(".sidebar");
  sidebar.append(newProjectButton(projectList))

  let board = document.querySelector(".board");
  board.appendChild(newItemButton());
}