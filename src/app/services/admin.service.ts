import { Injectable } from '@angular/core';
import { Department } from '../models/DataTypes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http:HttpClient,
  ) { }

  baseUrl = 'http://localhost:3000'

  // Department services
  addDepartment(data:any) {
    let url = `${this.baseUrl}/department`;

    return this.http.post(url, data);
  }

  getAllDepartmentDetails() : Observable<Department[]>{
    let url = `${this.baseUrl}/department`;

    return this.http.get<Department[]>(url);
  }
  
  getDepartmentDetailsById(id:number) : Observable<Department> {
    let url = `${this.baseUrl}/department/${id}`;

    return this.http.get<Department>(url);
  }

  updateDepartmentDetails(id:number, data:any) {
    let url = `${this.baseUrl}/department/${id}`;

    return this.http.put(url, data);
  }
  
  deleteDepartmentDetails(id:number) {
    let url = `${this.baseUrl}/department/${id}`;

    return this.http.delete(url);
  }

  // student services
  addStudent(data:any) {
    let url = `${this.baseUrl}/student`;

    return this.http.post(url, data);
  }

  getAllStudentDetails(){
    let url = `${this.baseUrl}/student`;

    return this.http.get(url);
  }
  
  getStudentDetailsById(id:number) {
    let url = `${this.baseUrl}/student/${id}`;

    return this.http.get(url);
  }

  updateStudentDetails(id:number, data:any) {
    let url = `${this.baseUrl}/student/${id}`;

    return this.http.put(url, data);
  }
  
  deleteStudentDetails(id:number) {
    let url = `${this.baseUrl}/student/${id}`;

    return this.http.delete(url);
  }

  // course and marks services
  getAllCourseDetails() {
    let url = `${this.baseUrl}/courses`;
    return this.http.get(url);
  }
  
  getCourseDetailsById(id:any) {
    let url = `${this.baseUrl}/courses/${id}`;
    return this.http.get(url);
  }

  addCourse(data:any) {
    let url = `${this.baseUrl}/courses`;
    return this.http.post(url, data);
  }
  
  updateCourse(data:any, id:any) {
    let url = `${this.baseUrl}/courses/${id}`;
    return this.http.put(url, data);
  }

  registerCourses(id:any, data:any) {
    let url = `${this.baseUrl}/student/${id}`;

    return this.http.put(url, data);
  }

  addMarks(data:any) {
    let url = `${this.baseUrl}/marks`;
    return this.http.post(url, data);
  }
  
  getMarks(data:any) {
    let url = `${this.baseUrl}/marks?student_id=${data}`;
    return this.http.get(url);
  }
  
  getMarksWithExamType(data:any, type:any) {
    let url = `${this.baseUrl}/marks?student_id=${data}&exam_type=${type}`;
    return this.http.get(url);
  }

}
