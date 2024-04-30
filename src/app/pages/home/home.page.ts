import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from '../../components/header/header.component';
import { MostrarPersonajesComponent } from '../../components/mostrar-personajes/mostrar-personajes.component';
import { Personajes } from '../../interfaces/personajes.interface';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MostrarPersonajesComponent, HeaderComponent, MatPaginatorModule],
    template: `
        <main class="container">
            <app-header [autor]="'Cacciatori Agustín'" (nombre)="setearNombre($event)"/>
            <app-mostrar-personajes [personajes]="data.results" />
            <mat-paginator
                class="mb-5 rounded"
                (page)="handlePageEvent($event)"
                [length]="data.info.count"
                [pageSize]="20"
                [hidePageSize]="true"
                aria-label="Select page">
            </mat-paginator>
        </main>
  `,
})
export default class HomePage implements OnInit {

    private readonly api = inject(RickAndMortyService);
    data: Personajes = {
        info: {
            count: 0,
            pages: 0,
            next: '',
            prev: null,
        },
        results: []
    };
    nombre?: string;
    pageIndex: number = 0;

    async ngOnInit(): Promise<void> {
        this.data = await this.api.getPersonajes();
    }

    async handlePageEvent(paginacion: any): Promise<void> {
        this.pageIndex = ++paginacion.pageIndex;
        this.data!.results = [];
        //TODO: catch
        this.data = await this.api.getPersonajes(this.pageIndex, this.nombre);
    }

    async setearNombre(nombre: string): Promise<void> {
        this.nombre = nombre;
        this.data!.results = [];
        // this.pageIndex = 0;
        this.data = await this.api.getPersonajes(this.pageIndex, this.nombre);
    }
}
