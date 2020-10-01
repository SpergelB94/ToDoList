import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../model';
import { TodoService } from '../model/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../configmdialog/confirmdialog.component';


@Component({
  selector: 'app-home',
  styleUrls: ['home.component.css'],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'completed', 'operations'];
  dataSource: Todo[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private todoService: TodoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTodoList();
  }

  loadTodoList() {
    this.todoService.getTodoList().subscribe(result => {
      this.dataSource = result
    },
      error => console.error(error)
    )
  }

  onDelete(id) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.todoService.deleteTodo(id).subscribe(
          result => {
            this.loadTodoList();
          },
          error => console.error(error)
        );
      }
    });
}
}


