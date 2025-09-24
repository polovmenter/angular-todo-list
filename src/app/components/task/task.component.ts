import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Task } from '../../data/task.interface';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-task',
    imports: [ DatePipe ],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss'
})
export class TaskComponent {
    @Input() task!: Task;

    @Output() toggle = new EventEmitter<string>();
    @Output() delete = new EventEmitter<string>();

    @HostBinding('class.completed') get isCompleted() {
        return this.task.completed;
    }

    onToggle() {
        this.toggle.emit(this.task.id);
    }

    onDelete() {
        this.delete.emit(this.task.id);
    }
}
