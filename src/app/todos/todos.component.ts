import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  public todos: Todo[] = [];
  public todoForm: FormGroup;

  constructor(private todosService: TodosService) {
    this.todoForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.todosService.getTodos().subscribe((allTodos: Todo[]) => {
      this.todos = allTodos;
    });
  }

  public onSubmit(): void {
    if (!this.todoForm.valid) {
      return;
    }

    this.todosService
      .createTodo(
        this.todoForm.value.title,
        this.todoForm.value.description,
        this.todoForm.value.deadline
      )
      .subscribe((newTodo: Todo) => {
        this.todos.push(newTodo);
        this.todoForm.reset();
      });
  }

  public deleteTodo(todoId: number): void {
    this.todosService.deleteTodo(todoId).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    });
  }

  public updateTodo(todoId: number, isCompleted: boolean): void {
    this.todosService.updateTodo(todoId, isCompleted)
      .subscribe((updatedTodo: Todo) => {
        this.todos = this.todos.map((todo) => todo.id !== todoId ? todo : updatedTodo)
      })
  }
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
}
