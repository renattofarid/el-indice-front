import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contact } from '../../../interfaces/contact';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['../../../auth.styles.css'],
  styles: [`
  table {
    width: 100%;
  }
  .mat-form-field {
    font-size: 14px;
    width: 100%;
  }
  td,
  th {
    width: auto;
  }
  .example-button-row {
    position: relative;
  }
  .example-button-row .mat-button-base {
    margin: 8px 8px 8px 0;
  }`]
})
export class ContactsComponent implements OnInit {

  //DataTable
  contacts: Contact[] = [];
  columns: any[] = [
    { col: 'nombre', label: 'Nombres' },
    { col: 'email', label: 'Email' },
    { col: 'telefono', label: 'Teléfono' },
    { col: 'mensaje', label: 'Mensaje' },
    { col: 'created_at', label: 'Fecha' }
  ];
  dataSource!: any;
  displayedColumns!: any[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void { this.getContactMessages() }

  getContactMessages() {
    this.adminService.contactMessages().subscribe({
      next: (c) => {
        console.log(c);
        this.displayedColumns = this.columns.map(c => c.col);
        this.contacts = c;
        this.dataSource = new MatTableDataSource<Contact>(this.contacts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

}
