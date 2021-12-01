import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './shared/create-task/create-task.component';
import { EditTaskComponent } from './shared/edit-task/edit-task.component';
import { TodolistComponent } from './shared/todolist/todolist.component';

const routes: Routes = [
  { path: '', component: TodolistComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'edit-task/:id', component: EditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
