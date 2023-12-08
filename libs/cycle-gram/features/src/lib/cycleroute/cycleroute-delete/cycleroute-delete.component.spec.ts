import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CycleRouteDeleteComponent } from './cycleroute-delete.component';

describe('CycleRouteDeleteComponent', () => {
  let component: CycleRouteDeleteComponent;
  let fixture: ComponentFixture<CycleRouteDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CycleRouteDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CycleRouteDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});