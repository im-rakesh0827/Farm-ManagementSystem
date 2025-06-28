import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CowService } from '@shared/services/cow.service';
import { Cow } from '@app/shared/models/cow.models';
import { LoaderService } from '@app/shared/services/loader.service';

@Component({
  selector: 'app-cow-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cow-form.component.html',
  styleUrls: ['./cow-form.component.scss']
})
export class CowFormComponent implements OnInit {
  cow: Cow = {
    id: 0,
    tagNumber: '',
    breed: '',
    birthDate: '',
    isMilking: false,
    healthStatus: ''
  };

isEdit = false;
  isView = false;
  IsReadOnly = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cowService: CowService,
    private loaderService :LoaderService
  ) { }
  
  

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const mode = this.route.snapshot.paramMap.get('mode');

    if (mode === 'view') {
      this.isView = true;
      this.IsReadOnly = true;
    }
    if (id) {
      this.isEdit = true;
      // this.cowService.getById(id).subscribe(data => this.cow = data);
      this.cowService.getById(id).subscribe(data => {
  this.cow = {
    ...data,
    birthDate: this.formatDateToLocalISO(data.birthDate)
  };
});

    }
  }

  formatDateToLocalISO(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Get year, month, day in local time
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}


  save() {
    this.loaderService.show();
    if (this.isEdit) {
      this.cowService.update(this.cow).subscribe(() => {
        this.router.navigate(['cow-list']);
      });
    } else {
      this.cowService.create(this.cow).subscribe(() => {
        this.router.navigate(['/cow-list']);
      });
    }
    this.loaderService.hide();
  }
}
