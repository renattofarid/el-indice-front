import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/auth/services/admin.service';
import { PreInscription } from '../../../interfaces/pre-inscriptions';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
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
export class InscriptionsComponent implements OnInit {

  //DataTable
  preInscriptions: PreInscription[] = [];
  columns: any[] = [
    { col: 'nombres', label: 'Nombres' },
    { col: 'apellidos', label: 'Apellidos' },
    { col: 'dni', label: 'DNI' },
    { col: 'email', label: 'Email' },
    { col: 'apoderado', label: 'Apoderado' },
    { col: 'telefono', label: 'Teléfono' },
    { col: 'grado', label: 'Grado' },
    { col: 'nivel', label: 'Nivel' },
    { col: 'created_at', label: 'Fecha' }
  ];
  dataSource!: any;
  displayedColumns!: any[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void { this.getContactMessages() }

  getContactMessages() {
    this.adminService.preInscriptions().subscribe({
      next: (c) => {
        console.log(c);
        this.displayedColumns = this.columns.map(c => c.col);
        this.preInscriptions = c;
        this.dataSource = new MatTableDataSource<PreInscription>(this.preInscriptions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

}
