import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  private todoList: any[]
  private todo: Todo;
  private userEmail: string;
  private userUid: string
  private todoForm: FormGroup;
  private todoText: string;

  constructor(private todoService: TodoService, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      'todoText': [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    })

    this.authService.getAuth().subscribe(user => {
      this.todoService.getTodoList().snapshotChanges().subscribe(item => {
        this.todoList = []

        item.forEach(element => {
          let el = element.payload.toJSON()
          el['$key'] = element.key
          if(user.uid === el['uid']) {
            this.todoList.push(el)
          }
        })

        this.todoList.sort((a, b) => {
          return a.isChecked - b.isChecked
        })
      })
    })
  }

  addTodo () {
    this.authService.getAuth().subscribe(user => {
      this.userEmail = user.email
      this.userUid = user.uid

      if(this.todoText !== '') {
        this.todo = {
          email: this.userEmail,
          uid: this.userUid,
          todoText: this.todoText,
          isChecked: false
        }
      }


      this.todoService.addTodo(this.todo)
      this.todo = null
      this.todoText = null
    })
  }

  alterCheck ($key: string, isChecked: boolean) {
    this.todoService.checkOrUncheckTodo($key, !isChecked)
  }

  removeTodo ($key: string) {
    this.todoService.removeTodo($key)
  }
}
