import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createF: FormGroup;

  constructor(
    private router: Router,
    private HttpClient: HttpClient,
    private userService: UsersService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    
  }

  onSubmit() {
    this.register();
  }

  register() {
    const formModel = this.createF.value;
    const createFForm: any = {
      name: formModel.name as string,
      job: formModel.job as string
    };
    this.userService.createUser(createFForm);
  }

  // createForm
  createForm() {
    this.createF = this.fb.group({
      name: '',
      job: ''
    });
  }
}
