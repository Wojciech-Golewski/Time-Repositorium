import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface IncomingDataOfAvailableColumns {
  customer: string;
  project: string;
  country: string;
  supportLevel: string;
}

const CUSTOMERS: string[] = [
  'IBM', 'Microsoft', 'Space-X', 'Tesla', 'ITER'
];
const PROJECTS: string[] = [
  'Virtual Reactor', 'Tokamak', 'Staropolis-5', 'Model 3', 'Quantum Power ZX10'
];
const COUNTRIES: string[] = [
  'Uganda', 'Wakanda', 'Yemen', 'Oman', 'Chile', 'Iceland', 'Greenland'
];
const SUPPORTLEVELS: string[] = [
  'Level 1', 'Level 2', 'COBOL level'
];

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MainTableComponent implements OnInit {

  availableColumns: string[] = ['customer', 'project', 'country', 'supportLevel'];
  daysOfTheWeek: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  dataSource: MatTableDataSource<IncomingDataOfAvailableColumns>;
  expandedElement: IncomingDataOfAvailableColumns | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
    // this.availableColumns.concat(this.daysOfTheWeek);

    // Create 100 users
    const randomTimeEntries = Array.from({length: 100}, () => createNewRandomTimeEntry());

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(randomTimeEntries);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

function createNewRandomTimeEntry(): IncomingDataOfAvailableColumns {
  return {
    customer: CUSTOMERS[Math.round(Math.random() * (CUSTOMERS.length - 1))],
    project: PROJECTS[Math.round(Math.random() * (PROJECTS.length - 1))],
    country: COUNTRIES[Math.round(Math.random() * (COUNTRIES.length - 1))],
    supportLevel: SUPPORTLEVELS[Math.round(Math.random() * (SUPPORTLEVELS.length - 1))]
  };
}