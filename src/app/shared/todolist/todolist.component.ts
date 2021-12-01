import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  providers: [ServicesService]
})

export class TodolistComponent implements OnInit {
  tasksList?: Observable<Task[]>;
  deletedItem?: Observable<Task>;


  constructor(private servicesService: ServicesService, private router: Router) { }

  ngOnInit(): void {
    this.tasksList = this.servicesService.getTasks();

    this.tasksList?.subscribe({
      next: () => {
        console.log("Acessei o dado!");
        console.log(this.tasksList);
      },
      error: (error) => console.log(error),
      complete: () => console.log("Acesso finalizado!")
    });
  }

  deleteItem(id: number) {
    this.deletedItem = this.servicesService.deleteTaskById(id);

    this.deletedItem?.subscribe({
      next: () => {
        console.log("Deletado com sucesso!"),
          this.ngOnInit()
      },
      error: (error) => console.log(error),
      complete: () => console.log("Final da operaçao!")
    })
  }

  createTask() {
    this.router.navigate(['create-task']);
  }

  editTask(taskId: number) {
    this.router.navigate([`edit-task/${taskId}`]);
  }

}
