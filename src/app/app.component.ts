import { Component } from '@angular/core';
import { TaskFormComponent } from "./components/task-form/task-form.component";
import { TaskListComponent } from "./components/task-list/task-list.component";

@Component({
    selector: 'app-root',
    imports: [TaskFormComponent, TaskListComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    
}
