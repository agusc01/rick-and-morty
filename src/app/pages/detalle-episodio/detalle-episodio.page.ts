import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MostrarPersonajesComponent } from '../../components/mostrar-personajes/mostrar-personajes.component';
import { Personaje } from '../../interfaces/personajes.interface';
import { RutaEpisodioPipe } from '../../pipes/ruta-episodio.pipe';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Episodio } from './../../interfaces/episodio.interface';

@Component({
    selector: 'app-detalle-episodio',
    standalone: true,
    imports: [CommonModule, MostrarPersonajesComponent, RutaEpisodioPipe, RouterModule],
    providers: [RutaEpisodioPipe],
    template: `
    <main class="container pt-5">
        @if(episodio) {
            <div class="container">
                <div class="card">
                    <div class="card-body">
                        <button
                            type="button"
                            class="btn btn-outline-warning float-end"
                            [routerLink]="'/'"
                        >
                            Volver al inicio
                        </button>
                        <h2 class="text-info">{{ episodio.name }}</h2>
                        <p class="card-text mb-2"><span class="text-muted">Episodio:</span> {{ episodio.episode }}</p>
                        <p class="card-text mb-2"><span class="text-muted">Fecha de extreno:</span> {{ episodio.air_date }}</p>
                    </div>
                </div>
                <div class="container-fluid mb-3">
                    <h2 class="text-info mt-3">Personajes</h2>
                    <app-mostrar-personajes [personajes]="personajes"/>
                </div>
            </div>
        }@else if(episodio === null) {
            <div class="container main d-flex justify-content-center align-items-center flex-column">
                <h1 class="text-danger">El episodio no existe o no se pudó encontrar</h1>
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    [routerLink]="'/'"
                >
                    Volver al inicio
                </button>
            </div>
        }@else if(episodio === undefined) {
            <div class="container main d-flex justify-content-center align-items-center">
                <h1 class="text-warning">Cargando ...</h1>
            </div>
        }
    </main>
  `,
    styles: ``
})
export default class DetalleEpisodioPage implements OnInit {

    @Input() public id!: number;
    private readonly title = inject(Title);
    private readonly api = inject(RickAndMortyService);
    private readonly pipe = inject(RutaEpisodioPipe);
    public episodio?: Episodio | null | undefined;
    public personajes?: Personaje[] = [];

    async ngOnInit(): Promise<void> {

        if (!this.id) { return; }

        this.episodio = await this.api.getEpisodio(this.id)
            .catch((error) => {
                console.log(error);
                return null;
            });

        if (!this.episodio) { return; }

        const titulo = `${this.episodio.episode} | ${this.episodio.name}`;
        this.title.setTitle(titulo);

        const personajesIds = this.episodio.characters
            .map((personaje) => this.pipe.transform(personaje));

        this.personajes = await this.api.getMuchosPersonajes(personajesIds);
    }
}
