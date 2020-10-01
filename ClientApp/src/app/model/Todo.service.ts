import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from '../model';


@Injectable({
  providedIn: 'root'
})


export class TodoService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl + 'api/todo');
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(this.baseUrl + 'api/todo/' + id);
  }

  create(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl + 'api/todo' , newTodo);
  }
  update(id: string, newTodo: Todo) {
    return this.http.put<Todo>(this.baseUrl + 'api/todo/' + id, newTodo);
  }

  deleteTodo(Id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/todo/' + Id);
  }
}
