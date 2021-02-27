import { format } from 'date-fns'

export class Item {
  title = "Name";
  description = "Description";
  dueDate = format(new Date(), 'yyyy-MM-dd');
  priority;
  checked = false;

  toggleChecked = () => {
    this.checked = true? false: true;
  }
}

export class Project {
  title = "Project";
  description = "Description";
  items = [];

  set title(text) {
    return text
  }

  set description(text) {
    return text
  }

  addItem = (item) => {
    this.items.push(item);
  }

  removeItem = (itemIndex) => {
    this.items.splice(itemIndex, 1)
  }
} 
