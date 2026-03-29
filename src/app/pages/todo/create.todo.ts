import { CreateTheConnectionLocal, LocalSyncData, MakeTheInstanceConceptLocal, PatcherStructure, PRIVATE, UpdateComposition } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import './todo.style.css';
import { getLocalUserId } from "../user/login.service";

export class CreateTodo extends StatefulWidget {

after_render(): void {
    let userId: number = getLocalUserId();
    let order: number = 1;
    let title = this.getElementById("title") as HTMLInputElement;
    let statusHidden = this.getElementById("status") as HTMLInputElement;
    let statusSelect = this.getElementById("status-select") as HTMLSelectElement;
    let statusGroup = this.getElementById("status-group") as HTMLElement;
    let id = this.getElementById("id") as HTMLInputElement;
    let submitButton = this.getElementById("submit") as HTMLButtonElement;

    if (this.data) {
        // Editing mode — show status dropdown
        title.value = this.data.title;
        statusHidden.value = this.data.status;
        id.value = this.data.id;
        statusGroup.style.display = "block";
        statusSelect.value = this.data.status;
        submitButton.innerHTML = "Update Task";
    }

    if (submitButton) {
        submitButton.onclick = (ev: Event) => {
            ev.preventDefault();

            // Use select value if editing, hidden value if creating
            let finalStatus = id.value ? statusSelect.value : "pending";

            if (id.value) {
                let patcherStructure: PatcherStructure = new PatcherStructure();
                patcherStructure.compositionId = Number(id.value);
                patcherStructure.patchObject = {
                    "title": title.value,
                    "status": finalStatus
                }
                UpdateComposition(patcherStructure);
                title.value = "";
                id.value = "";
                statusGroup.style.display = "none";
                statusSelect.value = "pending";
                submitButton.innerHTML = "Add Task";
            } else {
                MakeTheInstanceConceptLocal("the_todo", "", true, userId, PRIVATE).then((mainconcept) => {
                    MakeTheInstanceConceptLocal("title", title.value, false, userId, PRIVATE).then((concept) => {
                        MakeTheInstanceConceptLocal("status", "pending", false, userId, PRIVATE).then((concept2) => {
                            CreateTheConnectionLocal(mainconcept.id, concept.id, mainconcept.id, order, "", userId).then(() => {
                                CreateTheConnectionLocal(mainconcept.id, concept2.id, mainconcept.id, order, "", userId).then(() => {
                                    LocalSyncData.SyncDataOnline();
                                    title.value = "";
                                });
                            });
                        });
                    });
                });
            }
        }
    }
}

getHtml(): string {
    return `
    <div class="todo-form-container">
        <h2 class="todo-heading">📝 To-Do List</h2>
        <form class="todo-form">
            <input type="number" id="id" hidden>
            <input type="text" id="status" hidden value="pending">
            <div class="todo-form-group">
                <label class="todo-label">Task Title</label>
                <input type="text" id="title" class="todo-input" placeholder="Enter task title...">
            </div>
            <div class="todo-form-group" id="status-group" style="display:none;">
                <label class="todo-label">Status</label>
                <select id="status-select" class="todo-input">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <button class="todo-btn todo-btn-primary" id="submit" type="submit">
                Add Task
            </button>
        </form>
    </div>`;
}
}