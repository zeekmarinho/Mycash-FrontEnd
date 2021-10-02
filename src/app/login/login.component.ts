import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Authentication } from '../models/user';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  autentication: Authentication;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }  

  registerUser(){
    this.router.navigate(['/cadastro-usuario']);
  }

  login(){
    if(this.loginForm.valid){
      this.autentication = this.loginForm.value;
      this.loginService.authentication(this.autentication).subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token', data);
          localStorage.setItem('username', this.autentication.username);
          localStorage.setItem('password', this.autentication.password);
          this.router.navigate(['/dashboard']);
        }
      );    
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Preencha corretamente todos os campos'
      })
    }
  }

}
