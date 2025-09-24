export interface Task {
    id: string,
    title: string,
    completed: boolean,
    dateOfCreation: Date,
    description?: string
}

export interface TaskData {
    title: string,
    description?: string
}