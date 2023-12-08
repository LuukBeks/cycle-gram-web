import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CycleEventDeleteComponent } from './cycleevent-delete.component';

describe('CycleEventDeleteComponent', () => {
  let component: CycleEventDeleteComponent;
  let fixture: ComponentFixture<CycleEventDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CycleEventDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CycleEventDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});