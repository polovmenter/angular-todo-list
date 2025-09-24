import { Component, inject } from '@angular/core';
import { TaskService } from '../../data/task.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskData } from '../../data/task.interface';

@Component({
    selector: 'app-task-form',
    imports: [ReactiveFormsModule],
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
    taskService = inject(TaskService);

    taskForm = new FormGroup({
        title: new FormControl<string>('', Validators.required),
        description: new FormControl<string>('')
    });

    addTask() {
        if (this.taskForm.valid) {
            this.taskService.addTask(this.taskForm.value as TaskData);
            this.taskForm.reset();
        }
    }
}
