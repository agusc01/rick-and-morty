import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, firstValueFrom } from 'rxjs';
import { Episodio } from '../interfaces/episodio.interface';
import { Personaje, Personajes } from '../interfaces/personajes.interface';

@Injectable({ providedIn: 'root' })
export class RickAndMortyService {

    private readonly delay = 1000;
    private readonly http = inject(HttpClient);
    private readonly urlBase = 'https://rickandmortyapi.com/api';

    async getPersonajes(): Promise<Personaje[]> {
        const url = `${this.urlBase}/character`;
        const response = this.http.get<Personajes>(url)
            .pipe(delay(this.delay));
        const data = await firstValueFrom(response);

        return data.results;
    }

    getPersonaje(id: number): Promise<Personaje> {
        const url = `${this.urlBase}/character/${id}`;
        const response = this.http.get<Personaje>(url)
            .pipe(delay(this.delay));
        return firstValueFrom(response);
    }

    getMuchosPersonajes(ids: number[]): Promise<Personaje[]> {
        const _ids = ids.join(",");
        const url = `${this.urlBase}/character/${_ids}`;
        const response = this.http.get<Personaje[]>(url)
            .pipe(delay(this.delay));
        return firstValueFrom(response);
    }

    getEpisodio(id: number): Promise<Episodio> {
        const url = `${this.urlBase}/episode/${id}`;
        const response = this.http.get<Episodio>(url)
            .pipe(delay(this.delay));
        return firstValueFrom(response);
    }
}
