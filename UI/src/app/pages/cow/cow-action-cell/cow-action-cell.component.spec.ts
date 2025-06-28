import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowActionCellComponent } from './cow-action-cell.component';

describe('CowActionCellComponent', () => {
  let component: CowActionCellComponent;
  let fixture: ComponentFixture<CowActionCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CowActionCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CowActionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
