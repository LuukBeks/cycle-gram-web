import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BicycleEditComponent } from './cycleroute-edit.component';

describe('BicycleEditComponent', () => {
  let component: BicycleEditComponent;
  let fixture: ComponentFixture<BicycleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BicycleEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BicycleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});