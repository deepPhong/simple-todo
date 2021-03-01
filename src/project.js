export default class Project {
  title = "Project";

  description = "Description";

  items = {};

  counter = 0;

  selected = false;

  addItem = (item) => {
    item.index = this.counter;
    this.items[this.counter] = item;
    this.counter += 1;
  };

  removeItem = (item) => {
    delete this.items[item.index];
  };

  toggleSelected = () => {
    this.selected = this.selected !== true;
  };
}
