import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../../interfaces/personajes.interface';

@Pipe({
    name: 'estado',
    standalone: true
})
export class EstadoPipe implements PipeTransform {

    private transformacion = {
        Alive: "Viv@",
        Dead: "Muert@",
        unknown: "Desconocido",
    };

    transform(value: Status): unknown {
        return this.transformacion[value];
    }

}
