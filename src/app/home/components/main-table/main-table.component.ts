import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MainTableService } from '../../services/main-table.service';
import { ColumnType } from '../../models/column-type';
import { AvailableColumns } from '../../models/available-columns.model';

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

  availableColumns: ColumnType[];
  columnsPropertiesForRows: string[] = [];
  daysOfTheWeek: ColumnType[];
  dataSource: MatTableDataSource<AvailableColumns>;
  expandedElement: AvailableColumns | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private mainTableService: MainTableService
  ) { }

  ngOnInit() {

    this.mainTableService.getMainRows()
      .subscribe(data => {
        this.availableColumns = data;
        this.availableColumns.forEach(columnProperty => {
          this.columnsPropertiesForRows.push(columnProperty.propertyName);
        })
        console.log('availableColumns :', data);
    });

    this.mainTableService.getDaysOfTheWeek()
      .subscribe(data => {
        this.daysOfTheWeek = data;
        console.log('daysOfTheWeek :', data);
    });

    this.mainTableService.getMainTableData()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        console.log('dataSource :', data);
    });

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
