import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-marks',
  templateUrl: './add-marks.component.html',
  styleUrls: ['./add-marks.component.css']
})
export class AddMarksComponent implements OnInit {
  marks:any;
  courses:any;
  student_id:any;
  studentDetails:any

  constructor(
    private formBuilder:FormBuilder,
    private adminService:AdminService,
    private activeRoute:ActivatedRoute,
    private toast:ToastrService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.student_id = this.activeRoute.snapshot.params['student_id'];
    this.adminService.getStudentDetailsById(this.student_id).subscribe(res => {
      console.log(res);
      this.studentDetails = res;

      this.courses = this.studentDetails.courses;

      this.addMarksForm = this.formBuilder.group({
        student_id : this.formBuilder.control(this.student_id),
        student_reg : this.formBuilder.control(this.studentDetails.reg),
        student_name : this.formBuilder.control(this.studentDetails.name),
        exam_type: this.formBuilder.control('', Validators.required),
        marks: this.formBuilder.array([
          this.formBuilder.group({
            course: this.formBuilder.control(''),
            marks : this.formBuilder.control(''),
          })
        ]),
      })
      
      for(let i = 0; i < this.courses.length; i++) {

        let courseForm = this.formBuilder.group({
          course: this.formBuilder.control(this.courses[i].course),
          marks : this.formBuilder.control(''),
        });
        
        this.addMarksForm.controls['marks'].push(courseForm);
      }

      this.addMarksForm.controls['marks'].removeAt(0);
    })
  }

  addMarksForm = this.formBuilder.group({
    student_id : this.formBuilder.control(''),
    student_reg : this.formBuilder.control(''),
    student_name : this.formBuilder.control(''),
    exam_type: this.formBuilder.control('', Validators.required),
    marks: this.formBuilder.array([
      this.formBuilder.group({
        course: this.formBuilder.control(''),
        marks : this.formBuilder.control(''),
      })
    ]),
  })

  addMarks() {
    let data = this.addMarksForm.value;

    this.adminService.addMarks(data).subscribe(res => {
      console.log(res);
      this.toast.success('Marks add successfully.....!!!', 'Success');
      this.router.navigate(['admin']);

    })
  }

}
