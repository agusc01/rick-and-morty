import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardPersonajeComponent } from '../../components/card-personaje/card-personaje.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Personaje } from '../../interfaces/ricky-and-morty.interface';
import { RickyAndMortyService } from '../../services/ricky-and-morty.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, CardPersonajeComponent, HeaderComponent],
    template: `
        <app-header [autor]="'Cacciatori Agustín'"/>
        <main class="container">
            <div class="row text-center">
                @for (
                    personaje of this.personajes;
                    track personaje.id
                ) {
                    <div class="col col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                        <app-card-personaje [personaje]='personaje'/>
                    </div>
                } @empty {
                    <h1 class="text-danger text-center">
                        No hay personajes disponibles
                    </h1>
                }
            </div>
        </main>
  `,
})
export default class HomePage implements OnInit {

    public readonly api = inject(RickyAndMortyService);
    public personajes?: Personaje[];

    async ngOnInit(): Promise<void> {
        this.personajes = await this.api.getPersonajes();
    }
}
