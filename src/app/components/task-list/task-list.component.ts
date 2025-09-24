import { Component, DestroyRef, ElementRef, HostBinding, HostListener, inject, OnInit } from '@angular/core';
import { TaskService } from '../../data/task.service';
import { TaskComponent } from "../task/task.component";
import { debounce, debounceTime, fromEvent, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-task-list',
    imports: [TaskComponent],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
    taskService = inject(TaskService);
    taskList = this.taskService.tasks;
    topDistance = 0;
    destroyRef = inject(DestroyRef);

    @HostBinding('style.height') get height() {
        return `calc(100vh - ${this.topDistance}px)`;
    };

    constructor(private elementRef: ElementRef<HTMLElement>) { }

    ngOnInit() {
        this.calcHeight()
        fromEvent(window, 'resize').pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.calcHeight());
    }

    onToggled(targetID: string) {
        this.taskService.toggleTaskStatus(targetID);
    }

    onDeleted(targetID: string) {
        this.taskService.deleteTask(targetID);
    }

    calcHeight() {
        this.topDistance =  this.elementRef.nativeElement.getBoundingClientRect().top;
    }
}
