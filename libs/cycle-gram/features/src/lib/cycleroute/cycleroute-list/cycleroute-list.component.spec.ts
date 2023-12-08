import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CycleRouteListComponent } from './cycleroute-list.component';

describe('CycleRouteListComponent', () => {
  let component: CycleRouteListComponent;
  let fixture: ComponentFixture<CycleRouteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CycleRouteListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CycleRouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});