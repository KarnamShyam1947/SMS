import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [
        MatCardModule,
        MatSortModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        MatPaginatorModule,
    ]
})
export class MaterialModule{}
