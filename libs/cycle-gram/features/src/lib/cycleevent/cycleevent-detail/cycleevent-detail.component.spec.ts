import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CycleEventDetailComponent } from './cycleevent-detail.component';

describe('CycleEventDetailComponent', () => {
  let component: CycleEventDetailComponent;
  let fixture: ComponentFixture<CycleEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CycleEventDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CycleEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});