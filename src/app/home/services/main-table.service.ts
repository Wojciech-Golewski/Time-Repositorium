import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { ColumnType } from '../models/column-type.model';
import { AvailableColumns } from '../models/available-columns.model';

@Injectable({
  providedIn: 'root'
})
export class MainTableService {

  availableColumns: ColumnType[] = [
    {
      propertyName: 'customer',
      value: 'Customer'
    },
    {
      propertyName: 'project',
      value: 'Project'
    },
    {
      propertyName: 'country',
      value: 'Country'
    },
    {
      propertyName: 'supportLevel',
      value: 'Support Level'
    }
  ];

  daysOfTheWeek: ColumnType[] = [
    {
      propertyName: 'monday',
      value: 'Monday'
    },
    {
      propertyName: 'tuesday',
      value: 'Tuesday'
    },
    {
      propertyName: 'wednesday',
      value: 'Wednesday'
    },
    {
      propertyName: 'thursday',
      value: 'Thursday'
    },
    {
      propertyName: 'friday',
      value: 'Friday'
    },
    {
      propertyName: 'saturday',
      value: 'Saturday'
    },
    {
      propertyName: 'sunday',
      value: 'Sunday'
    }
  ];

  constructor() { }

  getMainTableData(): Observable<AvailableColumns[]> {
    return of(Array.from({length: 100}, () => this.createNewRandomTimeEntry()));
  }

  getMainRows(): Observable<ColumnType[]> {
    return of(this.availableColumns);
  }

  getDaysOfTheWeek(): Observable<ColumnType[]> {
    return of(this.daysOfTheWeek);
  }

  createNewRandomTimeEntry(): AvailableColumns {
    return {
      customer: CUSTOMERS[Math.round(Math.random() * (CUSTOMERS.length - 1))],
      project: PROJECTS[Math.round(Math.random() * (PROJECTS.length - 1))],
      country: COUNTRIES[Math.round(Math.random() * (COUNTRIES.length - 1))],
      supportLevel: SUPPORTLEVELS[Math.round(Math.random() * (SUPPORTLEVELS.length - 1))]
    };
  }

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