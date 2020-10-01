import { Component, Inject, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../model';
import { TodoService } from '../model/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../configmdialog/confirmdialog.component';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ToDoAddComponent } from '../todoadd/todoadd.component';



@Component({
  selector: 'app-home',
  styleUrls: ['home.component.css'],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit, AfterViewInit  {
  public array: any;
  displayedColumns: string[] = ['name', 'completed', 'operations'];
  dataSource: MatTableDataSource<Todo>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private todoService: TodoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTodoList();
    this.dataSource.paginator = this.paginator;
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  loadTodoList() {
    this.todoService.getTodoList().subscribe(result => {
      this.dataSource = new MatTableDataSource(result); 
    },
      error => console.error(error)
    )
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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

  updateTodo(id: string) {
    const dialogRef = this.dialog.open(ToDoAddComponent, {
      width: '400px',
      data: { passval: id }
     
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      this.loadTodoList();
    });

  }
  openAdd() {
    const dialogRef = this.dialog.open(ToDoAddComponent, {
      width: '400px',
       data: { passval: '' }
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      this.loadTodoList();
    });

  }
}



