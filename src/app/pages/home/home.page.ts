import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from '../../components/header/header.component';
import { MostrarPersonajesComponent } from '../../components/mostrar-personajes/mostrar-personajes.component';
import { Personaje, Personajes } from '../../interfaces/personajes.interface';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, MostrarPersonajesComponent, HeaderComponent, MatPaginatorModule],
    template: `
        <main class="container">
            <app-header [autor]="'Cacciatori Agustín'"/>
            <app-mostrar-personajes [personajes]="personajes" />
            @if(data){
                <mat-paginator
                    class="mb-5 rounded"
                    (page)="handlePageEvent($event)"
                    [length]="data.info.count"
                    [pageSize]="20"
                    [hidePageSize]="true"
                    aria-label="Select page">
                </mat-paginator>
            }
        </main>
  `,
})
export default class HomePage implements OnInit {

    public readonly api = inject(RickAndMortyService);
    public personajes?: Personaje[] = [];
    public data?: Personajes;

    async ngOnInit(): Promise<void> {
        this.data = await this.api.getPersonajes();
        this.personajes = this.data.results;
    }

    async handlePageEvent(data: any): Promise<void> {
        this.personajes = [];
        this.data = await this.api.getPersonajes(++data.pageIndex);
        this.personajes = this.data.results;
    }
}
