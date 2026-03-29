import { CreateTheConnectionLocal, LocalSyncData, MakeTheInstanceConceptLocal, PatcherStructure, PRIVATE, UpdateComposition } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import './todo.style.css';
import { getLocalUserId } from "../user/login.service";

export class CreateTodo extends StatefulWidget {

    after_render(): void {
        let userId: number = getLocalUserId();
        let order: number = 1;
        let title = this.getElementById("title") as HTMLInputElement;
        let status = this.getElementById("status") as HTMLSelectElement;
        let id = this.getElementById("id") as HTMLInputElement;

        if (this.data) {
            title.value = this.data.title;
            status.value = this.data.status;
            id.value = this.data.id;
        }

        let submitButton = this.getElementById("submit");
        if (submitButton) {
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();

                if (id.value) {
                    let patcherStructure: PatcherStructure = new PatcherStructure();
                    patcherStructure.compositionId = Number(id.value);
                    patcherStructure.patchObject = {
                        "title": title.value,
                        "status": status.value
                    }
                    UpdateComposition(patcherStructure);
                    title.value = "";
                    status.value = "pending";
                    id.value = "";
                } else {
                    MakeTheInstanceConceptLocal("the_todo", "", true, userId, PRIVATE).then((mainconcept) => {
                        MakeTheInstanceConceptLocal("title", title.value, false, userId, PRIVATE).then((concept) => {
                            MakeTheInstanceConceptLocal("status", status.value, false, userId, PRIVATE).then((concept2) => {
                                CreateTheConnectionLocal(mainconcept.id, concept.id, mainconcept.id, order, "", userId).then(() => {
                                    CreateTheConnectionLocal(mainconcept.id, concept2.id, mainconcept.id, order, "", userId).then(() => {
                                        LocalSyncData.SyncDataOnline();
                                        title.value = "";
                                        status.value = "pending";
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
                <div class="todo-form-group">
                    <label class="todo-label">Task Title</label>
                    <input type="text" id="title" class="todo-input" placeholder="Enter task title...">
                </div>
                <div class="todo-form-group">
                    <label class="todo-label">Status</label>
                    <select id="status" class="todo-input">
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