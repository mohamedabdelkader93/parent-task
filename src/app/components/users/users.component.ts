import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loggedUser: any;
  usersList: any;

  constructor(
    private userService: UsersService
  ) {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(usersList => { return this.usersList = usersList });
  }

  deleteUser(user){
    this.userService.deleteUser(user);
  }

}
