import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit{

  constructor(
    private adminService:AdminService,
    private formBuilder:FormBuilder,
    private toast:ToastrService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    
  }

  addCourseForm = this.formBuilder.group({
    code: this.formBuilder.control(''),
    name: this.formBuilder.control(''),
    type: this.formBuilder.control(''),
    slots: this.formBuilder.array([
      this.formBuilder.group({
        slot : this.formBuilder.control(''),
        faculty : this.formBuilder.control('')
      })
    ])
  });

  addSlot() {
    let controls = <FormArray>this.addCourseForm.controls['slots'];
    controls.push(
      this.formBuilder.group({
        slot : this.formBuilder.control(''),
        faculty : this.formBuilder.control('')
      })
    )
  }

  removeSlot(idx:any) {
    let controls = <FormArray>this.addCourseForm.controls['slots'];
    controls.removeAt(idx);
  }

  addCourse() {
    console.log(this.addCourseForm.value);
    this.adminService.addCourse(this.addCourseForm.value).subscribe(res => {
      this.toast.success("Course added successfully.....!!!", "success");
      this.router.navigate(['course']);
    })
  }
}
