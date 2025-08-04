import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { CowService } from '@shared/services/cow.service';
import { LoaderService } from '@app/shared/services/loader.service';
import { AlertService } from '@shared/services/alert.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cow-list',
  standalone: true,
  imports: [CommonModule, AgGridModule, MatSnackBarModule],
  templateUrl: './cow-list.component.html',
  styleUrls: ['./cow-list.component.scss']
})
export class CowListComponent implements OnInit {
  cows: any[] = [];
  loading = true;
  error: string | null = null;
  gridApi: any;

  columnDefs: ColDef[] = [
    { field: 'tagNumber', headerName: 'Tag Number' },
    { field: 'breed', headerName: 'Breed' },
    {
      field: 'birthDate',
      headerName: 'Birth Date',
      valueFormatter: this.dateFormatter
    },
    {
      field: 'isMilking',
      headerName: 'Milking',
      valueFormatter: (params) => (params.value ? 'Yes' : 'No'),
      cellRenderer: null 
    },
    { field: 'healthStatus', headerName: 'Health Status' },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
  return `
    <button class="ag-btn ag-btn-view" data-action="view">View</button>
    <button class="ag-btn ag-btn-edit" data-action="edit">Edit</button>
    <button class="ag-btn ag-btn-delete" data-action="delete">Delete</button>
  `;
},
      sortable: false,
      filter: false,
      width: 200
    }
  ];

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };

  constructor(
    private cowService: CowService,
    private router: Router,
    private loaderService: LoaderService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.fetchCows();

  }


showGrid = false;
fetchCows() {
  this.loaderService.show();
  this.loading = true;
  this.showGrid = false; 

  this.cowService.getAll().subscribe({
    next: (data) => {
      setTimeout(() => {
        this.cows = data;
        this.loading = false;
        this.loaderService.hide();
        this.showGrid = true; 
        // this.alertService.success('Cow loaded successfully');

      }, 500);
    },
    error: () => {
      this.error = 'Failed to load cows.';
      this.loading = false;
      setTimeout(() => {
        this.loaderService.hide();
        this.showGrid = false;
      }, 500);
    }
  });
}


  onGridReady(params: any) {
    this.gridApi = params.api;

    params.api.addEventListener('cellClicked', (event: any) => {
      if (event.event.target?.dataset?.action === 'view') {
        this.viewCow(event.data.id);
      }
      else if (event.event.target?.dataset?.action === 'edit') {
        this.editCow(event.data.id);
      } else if (event.event.target?.dataset?.action === 'delete') {
        this.deleteCow(event.data.id);
      }
    });

    setTimeout(() => {
      this.gridApi.sizeColumnsToFit();
    }, 100);
  }

  onPageSizeChanged(event: any) {
    const value = Number(event.target.value);
    this.gridApi.paginationSetPageSize(value);
  }

  addNew() {
    this.router.navigate(['/cow-form']);
  }


  viewCow(id: number) {
    this.router.navigate(['/cow-form', id, 'view'])
  }
  editCow(id: number) {
    this.router.navigate(['/cow-form', id, 'edit']);
  }
  



  deleteCow(id: number) {
    if (confirm('Are you sure you want to delete this cow?')) {
      this.cowService.delete(id).subscribe(() => this.fetchCows());
    }
  }

  dateFormatter(params: any) {
    return new Date(params.value).toLocaleDateString();
  }
}
