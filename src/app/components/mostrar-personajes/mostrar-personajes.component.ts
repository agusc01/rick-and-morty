import { Component, Input } from '@angular/core';
import { Personaje } from '../../interfaces/personajes.interface';
import { CardPersonajeComponent } from '../card-personaje/card-personaje.component';

@Component({
    selector: 'app-mostrar-personajes',
    standalone: true,
    imports: [CardPersonajeComponent],
    template: `
        <div class="row text-center">
            @for (
                personaje of this.personajes;
                track personaje.id
            ) {
                <div class="col col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <app-card-personaje [personaje]='personaje'/>
                </div>
            } @empty {
                @if(!personajes){
                    <div class="wrapper">
                        <h1 class="text-danger text-center">
                            No hay personajes disponibles
                        </h1>
                    </div>
                }@else {
                    <div class="wrapper">
                        <h1 class="text-warning text-center">
                            Cargando ...
                        </h1>
                    </div>
                }
            }
        </div>
    `,
    styles: `
        .wrapper {
            min-height: 500px;
            width: 100%;
            display:flex;
            justify-content:center;
            align-items:center;
        }
    `
})
export class MostrarPersonajesComponent {
    @Input() public personajes?: Personaje[] = [];
}
