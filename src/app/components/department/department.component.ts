import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/models/DataTypes';
import { AdminService } from 'src/app/services/admin.service';
import { PopupComponent } from '../popup/popup.component';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit{
  data:Department[] = [];
  dataSource:any;
  displayedColumns:any = ['Id', 'Department Id' ,'Department Name', 'Head of Department', 'Action'];
  @ViewChild(MatPaginator) paginator !:MatPaginator;

  constructor(
    private adminService:AdminService,
    private toast:ToastrService,
    private dialog:MatDialog,
  ){
    this.adminService.getAllDepartmentDetails().subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });

  }

  ngOnInit(): void {
    this.adminService.getAllDepartmentDetails().subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource(res);
    })
  }
  
  filter(e:Event) {
    let value = (e.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  addDepartment() {
    var popup = this.dialog.open(PopupComponent, {
      height: '500px',
      width: '800px',
      data : {
        'title' : 'Add Department',
        'type' : 'dept',
      } 
    })

    popup.afterClosed().subscribe(res => {
      this.ngOnInit();
    });
  }

  editDepartment(id:number) {
    var value = this.data.find((t:any) => t.id === id);
    
    var popup = this.dialog.open(PopupComponent, {
      height: '500px',
      width: '800px',
      data : {
        'title' : 'Edit Department',
        'type' : 'edit-dept',
        'value' : value
      } 
    })

    popup.afterClosed().subscribe(res => {
      this.ngOnInit();
    });
  }

  deleteDepartment(id:number) {
    if(confirm('Are you sure. you want to delete the record')) {
      this.adminService.deleteDepartmentDetails(id).subscribe(res => {
        this.toast.success('Record Deleted successfully.....!!!', 'Success');
        this.ngOnInit();
      })
    }
  }
  
}
