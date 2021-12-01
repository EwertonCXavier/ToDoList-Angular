import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  providers: [ServicesService]
})
export class CreateTaskComponent implements OnInit {
  createTaskForm?: FormGroup;
  createTask?: Observable<Task>;
  lastId?: Observable<Task[]>;

  id: number = -1;
  constructor(private router: Router, private servicesService: ServicesService) { }



  ngOnInit(): void {
    this.createTaskForm = new FormGroup({
      'description': new FormControl(null),
      'author': new FormControl(null),
      'dueDate': new FormControl(null)
    })

    // Código utilizado para pegar o último id salvo no JSON-Server
    this.lastId = this.servicesService.getTasks();

    this.lastId?.subscribe(data => {
      data.forEach(task => {
        if (task.id > this.id) {
          this.id = task.id
        }
      })
    })
  }

  onSubmit() {
    let taskData = {
      id: this.id + 1,
      author: this.createTaskForm?.controls['author'].value,
      description: this.createTaskForm?.controls['description'].value,
      dueDate: this.createTaskForm?.controls['dueDate'].value,
    }

    if (taskData.author !== null && taskData.description !== null && taskData.dueDate !== null) {
      this.createTask = this.servicesService.addTask(taskData);

      this.createTask?.subscribe({
        next: () => {
          console.log("Enviei o dado!");
          console.log(this.createTask);
        },
        error: (error: any) => console.log(error),
        complete: () => this.router.navigate([''])
      });
    }
  }

}
