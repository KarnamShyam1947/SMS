import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PopupComponent } from '../popup/popup.component';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  data:any;
  dataSource:any;

  @ViewChild(MatPaginator) paginator !:MatPaginator;

  constructor(
    private adminService:AdminService,
    private emailService:EmailService,
    private toast:ToastrService,
    private dialog:MatDialog,
  ) {
    this.adminService.getAllStudentDetails().subscribe(res => {
      console.log(res);
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit(): void {
    this.adminService.getAllStudentDetails().subscribe(res => {
      // console.log(res);
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
    })
  }
  
  displayedColumns: string[] = ['No.', 'Registration Number', 'Name', 'Email', 'Phone', 'Sem', 'Department', 'Gender', 'Action'];

  

  filter(e:any) {
    let value = (e.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  openAddStudent() {
    var popup = this.dialog.open(PopupComponent, {
      height: '600px',
      width: '900px',
      data : {
        'title' : 'Add Student',
        'type' : 'student',
      }
    })

    popup.afterClosed().subscribe(res => {
      console.log(res); 
      let token = this.makeRandom(30);
      localStorage.setItem('token', token);
      localStorage.setItem('req_user', JSON.stringify(res));

      let url = "http://localhost:4200/verify/"+token;
      console.log(url);

      this.emailService.sendVerificationEmail(res['email'], res['name'], url)
      .then(res =>  console.log(res) )
      .catch(err => console.log(err) );

      this.ngOnInit();     
    })
  }

  editStudent(id:any) {
    console.log(id);
    
    var popup = this.dialog.open(PopupComponent, {
      height: '600px',
      width: '900px',
      data : {
        'title' : 'Edit Student',
        'type' : 'edit-student',
        'value' : this.data.find((r:any) => r.id === id)
      }
    })

    popup.afterClosed().subscribe(res => {
      console.log(res);   
      this.ngOnInit();   
    })
  }

  deleteStudent(id:any) {
    if(confirm('Are you sure you want to delete the record')) {
      this.adminService.deleteStudentDetails(id).subscribe(res => {
        this.toast.success('Student record deleted successfully', 'Success');
        this.ngOnInit();
      })
    }
  }

  makeRandom(lengthOfCode: number) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
    let text = "";

    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

}
