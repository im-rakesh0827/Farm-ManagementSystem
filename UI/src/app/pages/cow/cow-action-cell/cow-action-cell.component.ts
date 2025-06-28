import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cow-action-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="ag-btn ag-btn-edit" (click)="onEdit()">Edit</button>
    <button class="ag-btn ag-btn-delete" (click)="onDelete()">Delete</button>
  `
})
export class CowActionCellComponent {
  @Input() data: any;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.data.id);
  }

  onDelete() {
    this.delete.emit(this.data.id);
  }
}
