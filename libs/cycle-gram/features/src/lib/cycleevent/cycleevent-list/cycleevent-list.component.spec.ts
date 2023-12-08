import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CycleEventListComponent } from './cycleevent-list.component';

describe('CycleEventListComponent', () => {
  let component: CycleEventListComponent;
  let fixture: ComponentFixture<CycleEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CycleEventListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CycleEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});