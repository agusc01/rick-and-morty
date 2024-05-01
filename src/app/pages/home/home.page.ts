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
            <app-mostrar-personajes [personajes]="data.results" />
            @if(reset){
                <mat-paginator
                    class="mb-5 rounded"
                    (page)="handlePageEvent($event)"
                    [pageIndex]="this.paginaPaginator"
                    [length]="data.info.count"
                    [pageSize]="20"
                    [hidePageSize]="true"
                    aria-label="Select page">
                </mat-paginator>
            }
        </main>
  `,
})
export default class HomePage {

    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly api = inject(RickAndMortyService);
    reset: boolean = true;
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
    pagina: number = 0;
    paginaPaginator: number = 0;

    async handlePageEvent(paginacion: any): Promise<void> {
        this.checkPagina();
        this.pagina = ++paginacion.pageIndex;
        this.data!.results = [];
        //TODO: catch (por nombre y pagina)
        await this.router.navigate([], {
            relativeTo: this.route, queryParams:
                { ...this.route.snapshot.queryParams, pagina: this.pagina }
        });
        this.data = await this.api.getPersonajes(this.pagina, this.nombre);
    }

    async setearNombre(nombre: string): Promise<void> {
        this.nombre = nombre;
        this.data!.results = [];
        this.reset = false;
        this.pagina = Number(this.route.snapshot.queryParams[environment.pagina]) ?? 0;
        this.data = await this.api.getPersonajes(this.pagina, this.nombre);
        this.checkPagina();
        this.reset = true;
    }

    private checkPagina(): void {
        if (this.pagina != this.paginaPaginator) {
            this.paginaPaginator = --this.pagina;
        }
    }
}
