import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MainTableService } from '../../services/main-table.service';
import { ColumnType } from '../../models/column-type.model';
import { forkJoin } from 'rxjs';
import { DataToTable } from '../../models/data-to-table.model';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MainTableComponent implements OnInit {
  availableColumns: ColumnType[];
  columnsPropertiesForRows: string[] = [];
  daysOfTheWeek: ColumnType[];
  dataSource: MatTableDataSource<DataToTable>;
  expandedElement: DataToTable | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private mainTableService: MainTableService) {}

  ngOnInit() {
    this.getAllData();
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

  private getAllData(): void {
    forkJoin(
      this.mainTableService.getMainColumns(),
      this.mainTableService.getDaysOfTheWeek(),
      this.mainTableService.getMainTableData()
    ).subscribe(
      (result: [ColumnType[], ColumnType[], DataToTable[]]) => {
        this.availableColumns = result[0].concat(result[1]);
        this.availableColumns.forEach((columnProperty) => {
          this.columnsPropertiesForRows.push(columnProperty.propertyName);
        });
        this.dataSource = new MatTableDataSource(result[2]);
      },
      (error) => {
        // TODO handle error mechanism missing
      }
    );
  }
}
