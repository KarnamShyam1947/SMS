import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  studentDetails:any;
  user:any;

  constructor(
    private router:Router,
    private toast:ToastrService,
    private formBuilder:FormBuilder,
    private adminService:AdminService,
  ) { }

  ngOnInit(): void {
  
  }

  loginForm = this.formBuilder.group({
    email : this.formBuilder.control(''),
    password : this.formBuilder.control('')
  });

  login() {
    if(this.loginForm.value.email == 'admin@gmail.com' && this.loginForm.value.password == 'admin') {
      this.user = {
        name : 'Admin',
      }

      this.user = JSON.stringify(this.user);

      localStorage.setItem('user',this.user);
      this.router.navigate(['admin'])
      .then(() => {
        location.reload();
      })
    }
    else {
      this.adminService.getAllStudentDetails().subscribe(res => {
        this.studentDetails = res;
        let user = this.studentDetails.find(
          (u:any) => u.email === this.loginForm.value.email && u.password === this.loginForm.value.password
        );
        console.log(user);
        console.log(this.loginForm.value);
        console.log(this.studentDetails);
  
        if(user) {
          user = JSON.stringify(user);
          localStorage.setItem('user',user);
          this.router.navigate(['student'])
          .then(() => {
            location.reload();
          })
          this.toast.success('Login success');
        }
        else {
          this.toast.error('Login failed');
        }
      })
    }
  }
}
