import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CycleEventEditComponent } from './cycleevent-edit.component';

describe('CycleEventEditComponent', () => {
  let component: CycleEventEditComponent;
  let fixture: ComponentFixture<CycleEventEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CycleEventEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CycleEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});