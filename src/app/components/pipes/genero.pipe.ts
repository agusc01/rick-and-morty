import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from '../../interfaces/ricky-and-morty.interface';

@Pipe({
    name: 'genero',
    standalone: true
})
export class GeneroPipe implements PipeTransform {

    public transformacion = {
        Female: "Femenina",
        Male: "Masculino",
        unknown: "Desconocido",
    };

    transform(value: Gender): string {
        return this.transformacion[value];
    }

}
