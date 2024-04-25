import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rutaEpisodio',
    standalone: true,
})
export class RutaEpisodioPipe implements PipeTransform {

    transform(value: string): number {
        return Number(value.split('/').at(-1)) ?? -1;
    }

}
