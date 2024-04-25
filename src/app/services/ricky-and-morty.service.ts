import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Personaje, RickyAndMorty } from '../interfaces/ricky-and-morty.interface';

@Injectable({ providedIn: 'root' })
export class RickyAndMortyService {

    private readonly http = inject(HttpClient);
    private readonly urlBase = 'https://rickandmortyapi.com/';

    async getPersonajes(): Promise<Personaje[]> {
        const response = this.http.get<RickyAndMorty>(`${this.urlBase}/api/character`);
        const data = await firstValueFrom(response);
        return data.results;
    }

    getPersonaje(id: number): Promise<Personaje> {
        const response = this.http.get<Personaje>(`${this.urlBase}/api/character/${id}`);
        return firstValueFrom(response);
    }
}
