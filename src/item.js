import { format } from "date-fns";

export default class Item {
  title = "Name";

  description = "Description";

  dueDate = format(new Date(), "yyyy-MM-dd");

  priority;

  index;

  checked = false;

  toggleChecked = () => {
    this.checked = this.checked !== true;
  };
}
