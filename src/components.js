import { format } from 'date-fns'

export class Item {
  title = "Name";
  description = "Description";
  dueDate = format(new Date(), 'yyyy-MM-dd');
  priority;
  index;
  checked = false;

  toggleChecked = () => {
    this.checked = this.checked === true? false: true;
  }
}

export class Project {
  title = "Project";
  description = "Description";
  items = {};
  counter = 0;
  selected = false;

  addItem = (item) => {
    item.index = this.counter;
    this.items[this.counter] = item;
    this.counter += 1;
  }

  removeItem = (item) => {
    delete this.items[item.index];
  }

  toggleSelected = () => {
    this.selected = this.selected === true? false: true;
  }
} 