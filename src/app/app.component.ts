import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SMS';
  user:any;

  constructor(
    private router:Router
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if(this.user) {
      this.user = JSON.parse(this.user);
    }
  }

  logout() {
    if(confirm('Are you sure, you want to log out....???')) {
      localStorage.clear();
      this.router.navigate(['home'])
      .then( () => 
        location.reload()
      )
    }
  }
}
