import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Task {
  id: number;
  description: string;
  author: string;
  dueDate: Date;
}

const URL = 'http://localhost:3000/tasks';

@Injectable()
export class ServicesService {

  constructor(private http: HttpClient) {
    console.log("Serviço todo-list instanciado!");
  }

  addTask(task: Task) {
    return this.http.post<Task>(URL, task);
  }

  getTasks() {
    return this.http.get<Task[]>(URL);
  }

  deleteTaskById(id: number) {
    return this.http.delete<Task>(`${URL}/${id}`);
  }

  updateTask(id: number, task: Task) {
    return this.http.put<Task>(`${URL}/${id}`, task);
  }

  getTaskById(id: number) {
    return this.http.get<Task>(`${URL}/${id}`);
  }


}
