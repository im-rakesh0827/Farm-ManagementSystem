import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user.model';
import { LoaderService } from '@shared/services/loader.service';
import { Router } from '@angular/router';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ AllCommunityModule ]);

@Component({
  selector: 'app-user-ag-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './user-ag-grid.component.html',
  styleUrls: ['./user-ag-grid.component.scss']
})
export class UserAgGridComponent implements OnInit {
  rowData: User[] = [];
  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };
  gridApi: any;
  loading = true;
  showGrid = false;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loaderService.show();
    this.loading = true;
    this.showGrid = false;

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.rowData = data;
          this.setColumnDefs();
          this.loading = false;
          this.showGrid = true;
          this.loaderService.hide();
        }, 500);
      },
      error: () => {
        this.error = 'Failed to fetch users.';
        this.loading = false;
        this.loaderService.hide();
        this.showGrid = false;
      }
    });
  }

  setColumnDefs(): void {
    this.columnDefs = [
      { headerName: '#', valueGetter: 'node.rowIndex + 1', width: 70 },
      { headerName: 'Full Name', field: 'fullName' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Role', field: 'role' },
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
        width: 180
      }
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;

    params.api.addEventListener('cellClicked', (event: any) => {
      const user = event.data;
      const action = event.event.target?.dataset?.action;

      if (action === 'view') {
        this.onView(user);
      } else if (action === 'edit') {
        this.onEdit(user);
      } else if (action === 'delete') {
        this.onDelete(user);
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

  onView(user: User): void {
    this.router.navigate(['/user', user.id, 'view']);
  }

  onEdit(user: User): void {
    this.router.navigate(['/user', user.id, 'edit']);
  }

  onDelete(user: User): void {
    if (confirm(`Are you sure you want to delete user ${user.fullName}?`)) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.fetchUsers();
      });
    }
  }

  addNew(): void {
    this.router.navigate(['/user/create']);
  }
}
