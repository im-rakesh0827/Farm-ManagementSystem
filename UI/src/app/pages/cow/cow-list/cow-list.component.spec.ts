import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowListComponent } from './cow-list.component';

describe('CowListComponent', () => {
  let component: CowListComponent;
  let fixture: ComponentFixture<CowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CowListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
