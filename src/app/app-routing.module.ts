import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { DepartmentComponent } from './components/department/department.component';
import { VerifyComponent } from './components/verify/verify.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { StudentComponent } from './components/student/student.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { RegisterCourseComponent } from './components/register-course/register-course.component';
import { AddMarksComponent } from './components/add-marks/add-marks.component';
import { ViewMarksComponent } from './components/view-marks/view-marks.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'home', redirectTo:'', pathMatch:'full'},
  {path:'verify/:token', component:VerifyComponent},
  {path:'set-password', component:SetPasswordComponent},
  {path:'admin', component:AdminComponent, canActivate:[authGuard]},
  {path:'course', component:CoursesComponent, canActivate:[authGuard]},
  {path:'student', component:StudentComponent, canActivate:[authGuard]},
  {path:'add-course', component:AddCourseComponent, canActivate:[authGuard]},
  {path:'view-marks', component:ViewMarksComponent, canActivate:[authGuard]},
  {path:'department', component:DepartmentComponent, canActivate:[authGuard]},
  {path:'add-marks/:student_id', component:AddMarksComponent, canActivate:[authGuard]},
  {path:'register-course', component:RegisterCourseComponent, canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
