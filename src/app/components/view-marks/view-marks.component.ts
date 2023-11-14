import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-marks',
  templateUrl: './view-marks.component.html',
  styleUrls: ['./view-marks.component.css']
})
export class ViewMarksComponent implements OnInit {
  user:any;
  userId:any;
  marks:any;
  result:boolean = false;
  error:boolean = false;

  constructor(
    private adminService:AdminService,
    // private 
  ) { }
 
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);

    this.userId = this.user['id'];

    this.adminService.getMarks(this.userId).subscribe(res => {
      this.marks = res;
      console.log(this.marks);
    })
  }

  getMarks(e:any) {

    let type = e.value;
    this.result = false;
    this.error = false;
    
    console.log(type);
    this.adminService.getMarksWithExamType(this.userId, type).subscribe(res => {
      this.marks = res;
      
      if(this.marks.length != 0) {
        this.marks = this.marks[0].marks;
        this.result = true;
      } 
      else {
        this.error = true;
      }

      console.log(this.marks);
      
    })
  }

}
