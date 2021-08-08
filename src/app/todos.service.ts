import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todos/todos.component';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/todos');
  }

  public createTodo(
    title: string,
    description: string,
    deadline: string
  ): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:3000/todos', {
      title,
      description,
      deadline,
      completed: false,
    });
  }

  public deleteTodo(todoId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/todos/${todoId}`);
  }

  public updateTodo(todoId: number, isCompleted: boolean): Observable<Todo> {
    return this.http.patch<Todo>(`http://localhost:3000/todos/${todoId}`, {
      completed: isCompleted
    })
  }
}
