import { ComponentFixture, TestBed } from '@angular/core/testing';
import DetallePersonajePage from './detalle-personaje.page';



describe('DetallePersonajePage', () => {
    let component: DetallePersonajePage;
    let fixture: ComponentFixture<DetallePersonajePage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DetallePersonajePage]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DetallePersonajePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
