import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from '../../components/header/header.component';
import { MostrarPersonajesComponent } from '../../components/mostrar-personajes/mostrar-personajes.component';
import { Personaje } from '../../interfaces/personajes.interface';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MostrarPersonajesComponent, HeaderComponent, MatPaginatorModule],
    template: `
        <main class="container">
            <app-header [autor]="'Cacciatori Agustín'"/>
            <app-mostrar-personajes [personajes]="personajes" />
            <!-- <mat-paginator
                class="mb-5"
                [length]="100"
                [pageSize]="10"
                [pageSizeOptions]="[5, 10, 25, 100]"
                aria-label="Select page">
            </mat-paginator> -->
        </main>
  `,
})
export default class HomePage implements OnInit {

    public readonly api = inject(RickAndMortyService);
    public personajes?: Personaje[] = [];

    async ngOnInit(): Promise<void> {
        this.personajes = await this.api.getPersonajes();
    }
}
