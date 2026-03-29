import { StatefulWidget } from 'mftsccs-browser';
import { CreateTodo } from "./create.todo";
import { ListTodo } from "./list.todo";
import './todo.style.css';

export class TodoApp extends StatefulWidget {

    mount_child() {
        let widget1 = this.getElementById("widget1");
        let widget2 = this.getElementById("widget2");
        let creating = new CreateTodo();
        let listing = new ListTodo();

        if (widget1) {
            this.childWidgets.push(creating);
            creating.mount(widget1);
        }
        if (widget2) {
            listing.dataChange((value: any) => {
                this.UpdateChildData(value, creating);
            });
            this.childWidgets.push(listing);
            listing.mount(widget2);
        }
    }

    getHtml(): string {
        return `
        <div class="todo-wrapper">
            <div id="widget1"></div>
            <div id="widget2"></div>
        </div>`;
    }
}