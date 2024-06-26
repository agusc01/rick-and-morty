import { Pipe, PipeTransform } from '@angular/core';
import { Species } from '../interfaces/personajes.interface';

@Pipe({
    name: 'especie',
    standalone: true
})
export class EspeciePipe implements PipeTransform {

    private transformacion = {
        Alien: "Extraterrestre",
        Human: "Humano",
        Disease: "Enfermedad",
        Humanoid: "Humanoide",
    };

    transform(value: Species): string {
        return this.transformacion[value] || value;
    }

}
