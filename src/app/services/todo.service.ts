import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Todo } from '../models/todo';

@Injectable()
export class TodoService {
  private todoList: AngularFireList<any>;

  constructor(private firebaseDB: AngularFireDatabase) { }

  getTodoList () {
    this.todoList = this.firebaseDB.list('todos');
    return this.todoList;
  }

  addTodo (todo: Todo) {
    this.todoList.push({
      email: todo.email,
      uid: todo.uid,
      todoText: todo.todoText,
      isChecked: todo.isChecked
    })
  }

  checkOrUncheckTodo ($key: string, flag: boolean) {
    this.todoList.update($key, {isChecked: flag})
  }

  removeTodo($key: string) {
    this.todoList.remove($key)
  }
}
