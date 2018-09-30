import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerF: FormGroup;

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
    const formModel = this.registerF.value;
    const registerFForm: any = {
      email: formModel.email as string,
      password: formModel.password as string
    };
    this.userService.register(registerFForm);
  }

  // createForm
  createForm() {
    this.registerF = this.fb.group({
      email: '',
      password: ''
    });
  }

}
