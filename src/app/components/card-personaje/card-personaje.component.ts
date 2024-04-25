import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Personaje } from '../../interfaces/personajes.interface';
import { EspeciePipe } from '../../pipes/especie.pipe';
import { EstadoPipe } from '../../pipes/estado.pipe';

@Component({
    selector: 'app-card-personaje',
    standalone: true,
    imports: [CommonModule, EspeciePipe, EstadoPipe, RouterModule],
    template: `
        <article class="card mb-3">
            <div class="d-flex align-items-center p-3" [routerLink]="['/personaje',personaje.id]">
                <img [src]="personaje.image" class="img-fluid mr-3" alt="Avatar Personaje">
                <div class="text-start ms-2">
                    <h5 class="text-info">{{personaje.name}}</h5>
                    <p class="mb-0">Tipo: {{personaje.species | especie}}</p>
                    <p class="mb-0">Estado: {{personaje.status | estado}}</p>
                </div>
            </div>
        </article>
    `,
    styles: `
        img{
            max-width: 100px;
        }
        .card{
           cursor:pointer;
           &:hover{
                transform: scale(1.1);
                transition: all 0.5s;
                background-color: var(--bs-success);
           }
    }`
})
export class CardPersonajeComponent {

    @Input() personaje!: Personaje;
}
