import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.scss']
})
export class TodoInfoComponent implements OnInit {
  private todo: any
  private userEmail: string
  private userUid: string

  constructor(private router: Router, private route: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit() {
    this.getTodo(this.route.snapshot.params['key'])
  }

  getTodo ($key) {
    this.todo = this.todoService.getTodoList().snapshotChanges().subscribe(item => {
      this.todo = null
      item.forEach(element => {
        let el = element.payload.toJSON()
        el['$key'] = element.key
        if($key === el['$key']) {
          this.todo = el
        }
      })
    })
  }
}
