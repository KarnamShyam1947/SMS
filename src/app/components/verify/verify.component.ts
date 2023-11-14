import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit{
  token:any;
  sessionToken:any;

  constructor(
    private activeRoute : ActivatedRoute,
    private toast:ToastrService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.sessionToken = localStorage.getItem('token');
    this.token = this.activeRoute.snapshot.params['token'];

    console.log(this.sessionToken);
    console.log(this.token);

    if(this.sessionToken == this.token) {
      this.toast.success('Token verified successfully');
      this.router.navigate(['set-password']);
    }

    if(this.sessionToken != this.token) {
      // localStorage.clear();

      this.toast.error('Invalid user token','Error');
      this.router.navigate(['home']);
      console.log("error");
      
    }
  }


}
