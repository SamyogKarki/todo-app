import { DeleteConceptById, GetCompositionListListener, NORMAL } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";
import './todo.style.css';

export class ListTodo extends StatefulWidget {
    mytodos: any;
    inpage: number = 10;
    page: number = 1;

    before_render(): void {
        let userId: number = getLocalUserId();
        GetCompositionListListener("the_todo", userId, this.inpage, this.page, NORMAL).subscribe((output: any) => {
            this.mytodos = output;
            this.render();
        });
    }

    after_render() {
        let tableElement = this.getElementById("todo-body");
        if (tableElement) {
            if (this.mytodos && this.mytodos.length > 0) {
                for (let i = 0; i < this.mytodos.length; i++) {
                    let id = this.mytodos[i].the_todo?.id;

                    if (id) {
                        let titleValue = this.mytodos[i].the_todo.title;
                        let statusValue = this.mytodos[i].the_todo.status;

                        let row = document.createElement("tr");

                        let col1 = document.createElement("td");
                        col1.innerHTML = titleValue;

                        let col2 = document.createElement("td");
                        let statusBadge = document.createElement("span");
                        statusBadge.className = `todo-status todo-status-${statusValue}`;
                        statusBadge.innerHTML = statusValue;
                        col2.append(statusBadge);

                        let col3 = document.createElement("td");
                        let editBtn = document.createElement("button");
                        editBtn.className = "todo-btn todo-btn-edit";
                        editBtn.innerHTML = "✏️ Edit";
                        editBtn.id = id;

                        let col4 = document.createElement("td");
                        let delBtn = document.createElement("button");
                        delBtn.className = "todo-btn todo-btn-delete";
                        delBtn.innerHTML = "🗑️ Delete";
                        delBtn.id = id;

                        delBtn.onclick = () => {
                            if (id) {
                                let confirmed = confirm("Are you sure you want to delete this task?");
                                if (confirmed) {
                                    DeleteConceptById(id).then(() => {
                                        console.log("Task deleted");
                                    });
                                }
                            }
                        };

                        let that = this;
                        editBtn.onclick = () => {
                            that.data = {
                                "id": editBtn.id,
                                "title": titleValue,
                                "status": statusValue
                            };
                            that.notify();
                        };

                        col3.append(editBtn);
                        col4.append(delBtn);
                        row.appendChild(col1);
                        row.appendChild(col2);
                        row.appendChild(col3);
                        row.appendChild(col4);
                        tableElement.append(row);
                    }
                }
            } else {
                let row = document.createElement("tr");
                let col = document.createElement("td");
                col.setAttribute("colspan", "4");
                col.className = "todo-empty";
                col.innerHTML = "No tasks yet. Add your first task above!";
                row.appendChild(col);
                tableElement.append(row);
            }
        }
    }

    getHtml(): string {
        return `
        <div class="todo-list-container">
            <h3 class="todo-subheading">Your Tasks</h3>
            <table class="todo-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="todo-body"></tbody>
            </table>
        </div>`;
    }
}