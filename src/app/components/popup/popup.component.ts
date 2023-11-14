import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputData:any;
  deptDetails:any;

  constructor(
    private dialogRef:MatDialogRef<PopupComponent>,
    private adminService:AdminService,
    @Inject(MAT_DIALOG_DATA) data:any,
    private formBuilder:FormBuilder,
    private toast:ToastrService,
  ) { 
    this.inputData = data;
    console.log(data);
    
  }

  ngOnInit(): void {
    this.adminService.getAllDepartmentDetails().subscribe(res => {
      console.log(res);
      this.deptDetails = res;
    })

    if(this.inputData['type'] == 'edit-student') {      
      this.editStudentForm = this.formBuilder.group({
        gender: this.formBuilder.control(this.inputData['value']['gender']),
        phone: this.formBuilder.control(this.inputData['value']['phone']),
        email: this.formBuilder.control(this.inputData['value']['email']),
        name: this.formBuilder.control(this.inputData['value']['name']),
        dept: this.formBuilder.control(this.inputData['value']['dept']),
        year: this.formBuilder.control(this.inputData['value']['year']),
        reg: this.formBuilder.control({value:this.inputData['value']['reg'], disabled: true}),
        sem: this.formBuilder.control(this.inputData['value']['sem']),
      })
    } 
    
    if(this.inputData['type'] == 'edit-dept') {
      this.editDeptForm = this.formBuilder.group({
        dept_id: this.formBuilder.control(this.inputData['value']['dept_id']),
        name: this.formBuilder.control(this.inputData['value']['name']),
        dean: this.formBuilder.control(this.inputData['value']['dean']),
      })
    } 
  }

  editStudentForm = this.formBuilder.group({
    gender: this.formBuilder.control(''),
    phone: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    name: this.formBuilder.control(''),
    dept: this.formBuilder.control(''),
    year: this.formBuilder.control(''),
    reg: this.formBuilder.control(''),
    sem: this.formBuilder.control(''),
  })

  addStudentForm = this.formBuilder.group({
    gender: this.formBuilder.control(''),
    phone: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    name: this.formBuilder.control(''),
    dept: this.formBuilder.control(''),
    year: this.formBuilder.control(''),
    reg: this.formBuilder.control(''),
    sem: this.formBuilder.control(''),
  })
  
  addDeptForm = this.formBuilder.group({
    dept_id: this.formBuilder.control(''),
    name: this.formBuilder.control(''),
    dean: this.formBuilder.control(''),
  })
  
  editDeptForm = this.formBuilder.group({
    dept_id: this.formBuilder.control(''),
    name: this.formBuilder.control(''),
    dean: this.formBuilder.control(''),
  })

  addStudent() {
    // add student and send result
    let result;

    this.adminService.addStudent(this.addStudentForm.value).subscribe(res => {
      this.toast.success('Student record added successfully.....!!!');
      
      result = res;
      this.dialogRef.close(result);
    })
    
  }
  
  editStudent() {
    // add student and send result
    let id = this.inputData['value']['id'];
    let data = this.editStudentForm.value;
    data['reg'] = this.inputData['value']['reg'];
    console.log(data);

    this.adminService.updateStudentDetails(id, data).subscribe(res => {
      this.toast.success('Student Details updated successfully.....!!!', 'Success');
    });

    this.dialogRef.close('Closed');
  }
  
  addDept() { 
    this.adminService.addDepartment(this.addDeptForm.value).subscribe(res => {
      this.toast.success('Department added successfully.....!!!', 'Success');
    })
    
    this.dialogRef.close('Closed');
  }

  editDept() {
    let id = this.inputData['value']['id'];
    let data = this.editDeptForm.value;

    this.adminService.updateDepartmentDetails(id, data).subscribe(res => {
      this.toast.success('Department Details updated successfully.....!!!', 'Success');
    });

    this.dialogRef.close('Closed');
  }


}
