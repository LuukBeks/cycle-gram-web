import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CycleRouteDetailComponent } from './cycleroute-detail.component';

describe('CycleRouteDetailComponent', () => {
  let component: CycleRouteDetailComponent;
  let fixture: ComponentFixture<CycleRouteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CycleRouteDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CycleRouteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});