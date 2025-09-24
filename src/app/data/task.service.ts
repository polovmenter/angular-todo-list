import { Injectable, signal } from '@angular/core';
import { Task } from './task.interface';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    readonly storageKey = 'taskList';
    tasks = signal<Task[]>([]);

    constructor() {
        this.getTasks();
    }

    addTask(data: { title: string, description?: string }) {
        this.tasks.update(current => {
            let newList = [
                {
                    id: this.generateID(),
                    completed: false,
                    dateOfCreation: new Date(),
                    ...data
                },
                ...current];

            this.saveTasks(newList);

            return newList;
        })
    }

    getTasks() {
        this.tasks.set(JSON.parse(localStorage.getItem(this.storageKey) ?? '[]') as Task[]);
    }

    deleteTask(targetID: string) {
        this.tasks.update(tasks => {
            const newList = tasks.filter(item => item.id !== targetID);
            this.saveTasks(newList);
            return newList;
        })
    }

    toggleTaskStatus(targetId: string) {
        this.tasks.update(tasks => {
            for (let task of tasks) {
                if (task.id == targetId) task.completed = !task.completed;
            }
            this.saveTasks(tasks);
            return tasks;
        })
    }

    saveTasks(tasks: Task[]) {
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }

    generateID() {
        return Date.now().toString();
    }
}
