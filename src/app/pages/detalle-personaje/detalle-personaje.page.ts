import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EspeciePipe } from '../../components/pipes/especie.pipe';
import { EstadoPipe } from '../../components/pipes/estado.pipe';
import { GeneroPipe } from '../../components/pipes/genero.pipe';
import { Personaje } from '../../interfaces/personajes.interface';
import { RutaEpisodioPipe } from '../../pipes/ruta-episodio.pipe';
import { RickyAndMortyService } from '../../services/ricky-and-morty.service';

@Component({
    selector: 'app-detalle-personaje',
    standalone: true,
    imports: [CommonModule, RouterModule, GeneroPipe, EspeciePipe, EstadoPipe, RutaEpisodioPipe],
    template: `
    <main class="container">
        @if(personaje) {
            <div class="container pt-5 mb-5">
                <div class="row">
                    <div class="col-md-6 text-end">
                        <section class="card">
                            <img [src]="personaje.image" alt="Imagen del personaje" class="img-fluid">
                        </section>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <button
                                    type="button"
                                    class="btn btn-outline-warning float-end"
                                    [routerLink]="'/'"
                                >
                                    Volver al inicio
                                </button>
                                <h2 class="text-info">{{ personaje.name }}</h2>
                                <p class="card-text mb-2"><span class="text-muted">Estado:</span> {{ personaje.status | estado }}</p>
                                <p class="card-text mb-2"><span class="text-muted">Especie:</span> {{ personaje.species | especie }}</p>
                                <p class="card-text mb-2"><span class="text-muted">Genero:</span> {{ personaje.gender | genero }}</p>
                                <p class="card-text mb-2"><span class="text-muted">Origen:</span> {{ personaje.origin.name }}</p>
                                <p class="card-text mb-2"><span class="text-muted">Ubicación:</span> {{ personaje.location.name }}</p>
                                <p class="card-text mt-2"><span class="text-muted">Creado:</span> {{ personaje.created | date }}</p>
                                <p class="card-text mb-2"><span class="text-muted">Episodios:</span> </p>
                                @if(personaje.episode.length){
                                    <ul class="list-group">
                                        @for (episodio of personaje.episode; track $index) {
                                            <li class="list-group-item">
                                                <a [routerLink]="['/episodio/',episodio | rutaEpisodio]">{{ episodio }}</a>
                                            </li>
                                        }
                                    </ul>
                                }@else {
                                    <h4 class="text-danger">No tiene episodios</h4>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }@else if(personaje === null) {
            <div class="container main d-flex justify-content-center align-items-center flex-column">
                <h1 class="text-danger">El personaje no existe o no se pudó encontrar</h1>
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    [routerLink]="'/'"
                >
                    Volver al inicio
                </button>
            </div>
        }@else if(personaje === undefined) {
            <div class="container main d-flex justify-content-center align-items-center">
                <h1 class="text-warning">Cargando ...</h1>
            </div>
        }
    </main>
  `,
})
export default class DetallePersonajePage implements OnInit {

    @Input() public id!: number;
    private readonly title = inject(Title);
    private readonly api = inject(RickyAndMortyService);

    public personaje: Personaje | undefined | null = undefined;

    async ngOnInit(): Promise<void> {

        if (!this.id) { return; }


        this.personaje = await this.api.getPersonaje(this.id)
            .catch((error) => {
                console.log(error);
                return null;
            });


        if (!this.personaje) { return; }

        const titulo = `${this.personaje.name} | ${this.personaje.species}`;
        this.title.setTitle(titulo);
    }
}
