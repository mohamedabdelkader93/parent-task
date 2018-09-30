import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  selectedUser: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.userService.getUserById(this.id).subscribe(selectedUser => {
        this.selectedUser = selectedUser
        this.selectedUser = this.selectedUser.data
        console.log(this.selectedUser);
      });
   });
  }

}
