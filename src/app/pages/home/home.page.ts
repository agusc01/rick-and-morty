import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
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
            <app-mostrar-personajes [personajes]="data?.results" />
            <mat-paginator
                class="mb-5 rounded"
                (page)="handlePageEvent($event)"
                [pageIndex]="this.paginaPaginator"
                [length]="data?.info?.count"
                [pageSize]="20"
                [hidePageSize]="true"
                aria-label="Select page">
            </mat-paginator>

        </main>
  `,
})
export default class HomePage {

    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly api = inject(RickAndMortyService);
    reset: boolean = true;
    data?: Personajes = {
        info: {
            count: 0,
            pages: 0,
            next: '',
            prev: null,
        },
        results: []
    };
    nombre?: string;
    pagina: number = 0;
    paginaPaginator: number = 0;

    async handlePageEvent(paginacion: any): Promise<void> {
        this.pagina = ++paginacion.pageIndex;
        if (this.data?.results) { this.data.results = []; }
        await this.router.navigate([], {
            relativeTo: this.route, queryParams:
                { ...this.route.snapshot.queryParams, pagina: this.pagina }
        });
        this.data = await this.api.getPersonajes(this.pagina, this.nombre);
    }

    async setearNombre(nombre: string): Promise<void> {
        this.nombre = nombre;
        if (this.data?.results) { this.data.results = []; }
        //README: no asustarse si es NaN
        this.pagina = Number(this.route.snapshot.queryParams[environment.pagina]) ?? 0;
        this.paginaPaginator = this.pagina;
        this.paginaPaginator--;
        this.data = await this.api.getPersonajes(this.pagina, this.nombre);
    }

}
