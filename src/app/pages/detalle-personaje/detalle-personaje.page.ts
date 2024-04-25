import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { EspeciePipe } from '../../components/pipes/especie.pipe';
import { EstadoPipe } from '../../components/pipes/estado.pipe';
import { GeneroPipe } from '../../components/pipes/genero.pipe';
import { Personaje } from '../../interfaces/ricky-and-morty.interface';
import { RickyAndMortyService } from '../../services/ricky-and-morty.service';

@Component({
    selector: 'app-detalle-personaje',
    standalone: true,
    imports: [CommonModule, RouterModule, GeneroPipe, EspeciePipe, EstadoPipe],
    template: `
    <main class="container pt-5">
        @if(personaje) {
            <div class="container">
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
                                    routerLink="/"
                                >
                                    Volver al inicio
                                </button>
                                <h2 class="text-info">{{ personaje.name }}</h2>
                                <p class="card-text mb-2"><span class="text-muted">Estado:</span> {{ personaje.status | estado }}</p>
                                <p class="card-text mb-2"><span class="text-muted">Especie:</span> {{ personaje.species | especie }}</p>
                                <p class="card-text mb-2"><span class="text-muted">Genero:</span> {{ personaje.gender | genero }}</p>
                                <p class="card-text mb-2"><span class="text-muted">Origen:</span> {{ personaje.origin.name }}</p>
                                <p class="card-text mb-2"><span class="text-muted">Ubicación:</span> {{ personaje.location.name }}</p>
                                <p class="card-text mb-2"><span class="text-muted">Episodios:</span> </p>
                                @if(personaje.episode.length){
                                    <ul class="list-group">
                                        @for (episodio of personaje.episode; track $index) {
                                            <li class="list-group-item">
                                                <a [href]="episodio">{{ episodio }}</a>
                                            </li>
                                        }
                                    </ul>
                                }@else {
                                    <h4 class="text-danger">No tiene episodios</h4>
                                }
                                <p class="card-text mt-2"><span class="text-muted">Creado:</span> {{ personaje.created | date }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }@else {
            <div class="container main d-flex justify-content-center align-items-center flex-column">
                <h1 class="text-danger">El personaje no existe o no se pudo encontrar</h1>
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    routerLink="/"
                >
                    Volver al inicio
                </button>
            </div>
        }
    </main>
  `,
    styles: `
        main, .main{
            height:100%;
            min-height: 100vh;
        }
    `
})
export default class DetallePersonajePage implements OnInit {

    @Input() public id!: number;
    private readonly router = inject(Router);
    private readonly title = inject(Title);
    private readonly api = inject(RickyAndMortyService);

    public personaje?: Personaje;

    async ngOnInit(): Promise<void> {

        if (!this.id) { this.router.navigateByUrl('/'); }

        this.personaje = await this.api.getPersonaje(this.id)
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        console.log({ lolo: this.personaje });

        if (!this.personaje) { return; }

        const titulo = `${this.personaje.name} | ${this.personaje.species}`;
        this.title.setTitle(titulo);
    }
}
