import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  dataSource:any;
  courses:any;
  user:any;

  displayedColumns = [
    'Course Name',
    'Slot',
  ]

  constructor(
    private adminService:AdminService,

  ) { 
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);

    this.adminService.getStudentDetailsById(this.user.id).subscribe((res:any) => {
      this.courses = res['courses'];
      console.log(this.courses);
      
    })
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);

    this.adminService.getStudentDetailsById(this.user.id).subscribe((res:any) => {
      this.courses = res['courses'];
      console.log(this.courses);
      this.dataSource = new MatTableDataSource(this.courses);
    })
  }

}
