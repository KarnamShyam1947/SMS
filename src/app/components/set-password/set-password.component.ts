import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, ValidationErrors, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  user:any;

  constructor(
    private router:Router,
    private toast:ToastrService,
    private authService:AuthService,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('req_user');
    this.user = JSON.parse(this.user);

    console.log(this.user['email']);
    if(this.user == null) {
      this.router.navigate(['home']);
    }
    else {
      this.setPasswordFrom = this.formBuilder.group({
        email: this.formBuilder.control({value:this.user['email'], disabled:true}, Validators.required),
        pass1 : this.formBuilder.control('', Validators.required),
        pass2 : this.formBuilder.control('', Validators.required),
      }, {
        validators: this.checkPassword,
      })
    }
  }

  checkPassword : ValidatorFn = (control : AbstractControl) : ValidationErrors | null=> {
    let pass1 = control.get('pass1');
    let pass2 = control.get('pass2');

    if(pass1 && pass2 && pass2.errors && !pass2.errors['PasswordMatchError']) {
      return null;
    }

    if(pass1 && pass2 && pass1.value != pass2.value) {
      pass2.setErrors({
        'PasswordMatchError' : true,
      })
    }    

    return null;
  }

  setPasswordFrom = this.formBuilder.group({
    email : this.formBuilder.control('', Validators.required),
    pass1 : this.formBuilder.control('', Validators.required),
    pass2 : this.formBuilder.control('', Validators.required),
  }, {
    validators: this.checkPassword,
  });

  setPassword() {
    let id = this.user['id'];
    let data = this.user;
    delete data.id;

    data['password'] = this.setPasswordFrom.value.pass1;
    console.log(data);
    
    this.authService.setPassword(id, data).subscribe(res => {
      localStorage.clear();
      
      this.toast.success('Password set successfully', 'Success');
      this.router.navigate(['home']);
    })
  }

}
