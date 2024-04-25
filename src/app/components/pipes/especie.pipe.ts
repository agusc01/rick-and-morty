import { Pipe, PipeTransform } from '@angular/core';
import { Species } from '../../interfaces/ricky-and-morty.interface';

@Pipe({
    name: 'especie',
    standalone: true
})
export class EspeciePipe implements PipeTransform {

    private transformacion = {
        Alien: "Extraterrestre",
        Human: "Humano",
    };

    transform(value: Species): string {
        return this.transformacion[value];
    }

}
