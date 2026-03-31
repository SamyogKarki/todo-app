import { DeleteConceptById, GetCompositionListListener, NORMAL } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";
import './todo.style.css';

export class ListTodo extends StatefulWidget {
    mytodos: any;
    inpage: number = 100;
    page: number = 1;
    activeTab: string = "all";

    before_render(): void {
        let userId: number = getLocalUserId();
        GetCompositionListListener("the_todo", userId, this.inpage, this.page, NORMAL).subscribe((output: any) => {
            this.mytodos = output;
            this.render();
        });
    }

    after_render() {
        this.renderTab(this.activeTab);

        // Tab click events
        let tabs = ["all", "pending", "in-progress", "completed"];
        tabs.forEach(tab => {
            let tabEl = this.getElementById(`tab-${tab}`);
            if (tabEl) {
                tabEl.onclick = () => {
                    this.activeTab = tab;

                    // Update active tab style
                    tabs.forEach(t => {
                        let el = this.getElementById(`tab-${t}`);
                        if (el) el.className = "todo-tab";
                    });
                    tabEl.className = "todo-tab todo-tab-active";

                    // Clear and re-render table body
                    let body = this.getElementById("todo-body");
                    if (body) body.innerHTML = "";
                    this.renderTab(tab);
                };
            }
        });
    }

    renderTab(filter: string) {
        let tableElement = this.getElementById("todo-body");
        if (!tableElement) return;

        let filtered = this.mytodos;
        if (filter !== "all") {
            filtered = this.mytodos.filter((item: any) =>
                item.the_todo?.status === filter
            );
        }

        if (filtered && filtered.length > 0) {
            for (let i = 0; i < filtered.length; i++) {
                let id = filtered[i].the_todo?.id;
                if (!id) continue;

                let titleValue = filtered[i].the_todo.title;
                let statusValue = filtered[i].the_todo.status;

                let row = document.createElement("tr");

                // Title
                let col1 = document.createElement("td");
                col1.innerHTML = titleValue;

                // Status badge
                let col2 = document.createElement("td");
                let statusBadge = document.createElement("span");
                statusBadge.className = `todo-status todo-status-${statusValue}`;
                statusBadge.innerHTML = statusValue;
                col2.append(statusBadge);

                // Edit button
                let col3 = document.createElement("td");
                let editBtn = document.createElement("button");
                editBtn.className = "todo-btn todo-btn-edit";
                editBtn.innerHTML = "✏️ Edit";
                editBtn.id = id;

                // Delete button
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
        } else {
            let row = document.createElement("tr");
            let col = document.createElement("td");
            col.setAttribute("colspan", "4");
            col.className = "todo-empty";
            col.innerHTML = `No ${filter === "all" ? "" : filter} tasks found.`;
            row.appendChild(col);
            tableElement.append(row);
        }
    }

    getTaskCount(filter: string): number {
        if (!this.mytodos) return 0;
        if (filter === "all") return this.mytodos.length;
        return this.mytodos.filter((item: any) =>
            item.the_todo?.status === filter
        ).length;
    }

    getHtml(): string {
        let allCount = this.getTaskCount("all");
        let pendingCount = this.getTaskCount("pending");
        let progressCount = this.getTaskCount("in-progress");
        let completedCount = this.getTaskCount("completed");

        return `
        <div class="todo-list-container">
            <h3 class="todo-subheading">Your Tasks</h3>

            <div class="todo-tabs">
                <button id="tab-all" class="todo-tab todo-tab-active">
                    All <span class="todo-count">${allCount}</span>
                </button>
                <button id="tab-pending" class="todo-tab">
                    Pending <span class="todo-count todo-count-pending">${pendingCount}</span>
                </button>
                <button id="tab-in-progress" class="todo-tab">
                    In Progress <span class="todo-count todo-count-progress">${progressCount}</span>
                </button>
                <button id="tab-completed" class="todo-tab">
                    Completed <span class="todo-count todo-count-completed">${completedCount}</span>
                </button>
            </div>

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