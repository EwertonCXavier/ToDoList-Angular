import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
  providers: [ServicesService]
})
export class EditTaskComponent implements OnInit {

  editTaskForm?: FormGroup;
  editTask?: Observable<Task>;
  task?: Observable<Task>;

  id: number = -1;
  constructor(private router: Router, private servicesService: ServicesService, private route: ActivatedRoute) { }
  taskId: number = 0;


  ngOnInit(): void {
    this.editTaskForm = new FormGroup({
      'description': new FormControl(null),
      'author': new FormControl(null),
      'dueDate': new FormControl(null)
    });

    console.log('Id aqui: ' + this.route.snapshot.paramMap.get('id'));

    // if (this.route.snapshot.paramMap.get('id') !== null) {
    console.log(typeof (this.route.snapshot.paramMap.get('id')));

    this.taskId = Number(this.route.snapshot.paramMap.get('id'))
    this.task = this.servicesService.getTaskById(this.taskId);

    this.task?.subscribe(data => {
      this.editTaskForm?.setValue({
        description: data.description,
        author: data.author,
        dueDate: data.dueDate
      })

      console.log(data);
    })


    console.log(this.editTaskForm.value);
  }

  onSubmit() {
    let taskData = {
      id: this.id + 1,
      author: this.editTaskForm?.controls['author'].value,
      description: this.editTaskForm?.controls['description'].value,
      dueDate: this.editTaskForm?.controls['dueDate'].value,
    }

    if (taskData.author !== null && taskData.description !== null && taskData.dueDate !== null) {
      this.editTask = this.servicesService.updateTask(this.taskId, taskData);

      this.editTask?.subscribe({
        next: () => {
          console.log("Enviei o dado!");
          console.log(this.editTask);
        },
        error: (error: any) => console.log(error),
        complete: () => this.router.navigate([''])
      });
    }
  }

}
