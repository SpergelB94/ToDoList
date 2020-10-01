import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../model';
import { TodoService } from '../model/todo.service';

@Component({
  selector: 'todoadd',
  templateUrl: './todoadd.component.html'

})

export class ToDoAddComponent implements OnInit {
  todoInput: Todo;
  updateid: string = '';

  constructor(private route: ActivatedRoute, public todoAddDialog: MatDialogRef<ToDoAddComponent>, private todoService: TodoService, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.passval != '') {
      this.updateid = data.passval;
    }

    this.todoInput = new Todo();
  }

  ngOnInit(): void {

    if (this.updateid != '') {
      this.todoService.getTodo(this.updateid).subscribe(oldTodo => {
        this.todoInput = oldTodo;
      });
    }
  }

  cancel(): void {
    this.todoAddDialog.close();
  }

  saveTodo(): void {
    if (this.updateid == '') {
      const newTodo = new Todo();
      newTodo.name = this.todoInput.name;
      newTodo.completed = this.todoInput.completed;
      this.todoService.create(newTodo).subscribe(result => {
        this.todoAddDialog.close();
      });
    } else {
      //UPDATE
      const updateTodo = new Todo();
      updateTodo.name = this.todoInput.name;
      updateTodo.id = this.todoInput.id;
      updateTodo.completed = this.todoInput.completed;
      this.todoService.update(this.updateid, updateTodo).subscribe(result => {
        this.todoAddDialog.close();
      });
    }
  }
}
