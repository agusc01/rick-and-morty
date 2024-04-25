import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Personaje } from '../../interfaces/ricky-and-morty.interface';
import { EspeciePipe } from '../pipes/especie.pipe';
import { EstadoPipe } from '../pipes/estado.pipe';

@Component({
    selector: 'app-card-personaje',
    standalone: true,
    imports: [CommonModule, EspeciePipe, EstadoPipe],
    template: `
        <article class="card mb-3">
            <div class="d-flex align-items-center p-3" (click)="verDetalle(personaje.id)">
                <img src="{{personaje.image}}" class="img-fluid mr-3" alt="Avatar Personaje" style="max-width: 100px;">
                <div class="text-start ms-2">
                    <h5 class="text-info">{{personaje.name}}</h5>
                    <p class="mb-0">Tipo: {{personaje.species | especie}}</p>
                    <p class="mb-0">Estado: {{personaje.status | estado}}</p>
                </div>
            </div>
        </article>
    `,
    styles: `
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
    private readonly router = inject(Router);

    verDetalle(id: number): void {
        this.router.navigate(['/personaje', id]);
    }
}
