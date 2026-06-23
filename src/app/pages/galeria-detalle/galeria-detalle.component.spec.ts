import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaDetalle } from './galeria-detalle';

describe('GaleriaDetalle', () => {
  let component: GaleriaDetalle;
  let fixture: ComponentFixture<GaleriaDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriaDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(GaleriaDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
