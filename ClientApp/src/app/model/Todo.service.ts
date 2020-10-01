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

  deleteTodo(Id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/todo/' + Id);
  }
}
