import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MostrarPersonajesComponent } from '../../components/mostrar-personajes/mostrar-personajes.component';
import { Personaje } from '../../interfaces/personajes.interface';
import { RickyAndMortyService } from '../../services/ricky-and-morty.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MostrarPersonajesComponent, HeaderComponent],
    template: `
        <app-header [autor]="'Cacciatori Agustín'"/>
        <main class="container pb-5">
            <app-mostrar-personajes [personajes]="personajes" />
        </main>
  `,
})
export default class HomePage implements OnInit {

    public readonly api = inject(RickyAndMortyService);
    public personajes?: Personaje[] = [];

    async ngOnInit(): Promise<void> {
        this.personajes = await this.api.getPersonajes();
    }
}
