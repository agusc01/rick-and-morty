import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEpisodioPage } from './detalle-episodio.page';

describe('DetalleEpisodioPage', () => {
  let component: DetalleEpisodioPage;
  let fixture: ComponentFixture<DetalleEpisodioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEpisodioPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleEpisodioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
