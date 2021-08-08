import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() public id: number = 0;
  @Input() public title: string = '';
  @Input() public description: string = '';
  @Input() public deadline: string = '';
  @Input() public completed: boolean = false;

  @Output() public delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() public update: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  public onDelete(): void {
    this.delete.emit(this.id);
  }

  public onUpdate(isCompleted: boolean): void {
    this.update.emit(isCompleted);
  }
}
