import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent implements OnInit {
  courses:any;
  slots:any;
  user:any;

  constructor(
    private adminService:AdminService,
    private formBuilder:FormBuilder,
    private toast:ToastrService,
    private route:Router,
  ) {}

  ngOnInit(): void {
    // get user details from local storage
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    console.log(this.user);
    
    this.registerCourseForm = this.formBuilder.group({
      name: this.formBuilder.control({value: this.user.name, disabled: true}),
      reg : this.formBuilder.control({value: this.user.reg, disabled: true}),
      courses: this.formBuilder.array([
        this.formBuilder.group({
          course: this.formBuilder.control(''),
          slot: this.formBuilder.control('')
        })
      ])
    })

    this.adminService.getAllCourseDetails().subscribe(res => {
      this.courses = res;
    })
  }

  registerCourseForm = this.formBuilder.group({
    name: this.formBuilder.control(''),
    reg : this.formBuilder.control(''),
    courses: this.formBuilder.array([
      this.formBuilder.group({
        course: this.formBuilder.control(''),
        slot: this.formBuilder.control('')
      })
    ])
  })

  addCourse() {
    let controls = <FormArray>this.registerCourseForm.controls['courses'];

    controls.push(
      this.formBuilder.group({
        course: this.formBuilder.control(''),
        slot: this.formBuilder.control(''),
      })
    );

    
    
  }

  getSlots(e:any) {
    this.slots = this.courses.find(
      (r:any) => r.name == e.value
    );
    this.slots = this.slots.slots;
  }

  removeCourse(i:any) {
    let controls = <FormArray>this.registerCourseForm.controls['courses'];

    controls.removeAt(i);
  }

  registerCourse() {
    console.log(this.registerCourseForm.value);
    let r = this.registerCourseForm.value;
    delete r.name;
    delete r.reg;

    let id = this.user.id;
    this.user['courses'] = r.courses;

    delete this.user.id;
    console.log(this.user);

    this.adminService.registerCourses(id, this.user).subscribe(res => {
      console.log(res);
      this.toast.success('You are successfully register the courses', 'Course');
      this.route.navigate(['student']);
    })
    
  }
}
