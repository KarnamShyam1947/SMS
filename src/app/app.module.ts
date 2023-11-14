import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './components/popup/popup.component';
import { DepartmentComponent } from './components/department/department.component';
import { ToastrModule } from 'ngx-toastr';
import { VerifyComponent } from './components/verify/verify.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { StudentComponent } from './components/student/student.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { RegisterCourseComponent } from './components/register-course/register-course.component';
import { AddMarksComponent } from './components/add-marks/add-marks.component';
import { ViewMarksComponent } from './components/view-marks/view-marks.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PopupComponent,
    AdminComponent,
    VerifyComponent,
    CoursesComponent,
    StudentComponent,
    AddMarksComponent,
    ViewMarksComponent,
    AddCourseComponent,
    DepartmentComponent,
    SetPasswordComponent,
    RegisterCourseComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
