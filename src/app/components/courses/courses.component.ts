import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses:any;

  constructor(
    private adminService:AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllCourseDetails().subscribe(res => {
      this.courses = res;
    })
  }

  deleteCourse(courseId:any, idx:any) {
    let course:any;

    this.adminService.getCourseDetailsById(courseId).subscribe(res => {
      if(confirm('Are you sure u want to delete?')){
        course = res;

        let slots = course['slots'];
        console.log(slots);
        slots.splice(idx, 1);

        course['slots'] = slots;

        console.log(course);
        
        this.adminService.updateCourse(course, courseId).subscribe(res => {
          console.log(res);
        })

        this.ngOnInit();
      }
    });



    // console.log(courseId);
    // console.log(idx);
  }

  
}
