import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, skip, Subscription } from 'rxjs';

@Component({
    selector: 'app-input-busqueda',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <div class="form-floating mb-3">
            <input
                type="text"
                class="form-control"
                id="nombre"
                placeholder="Buscar por nombre"
                (input)=buscar($event)
            >
            <label for="nombre">Buscar por nombre</label>
        </div>
    `,

})
export class InputBusquedaComponent implements OnInit, OnDestroy {

    private readonly $nombre = new BehaviorSubject<string>('');
    private subscripcion?: Subscription;
    @Output() nombre = new EventEmitter<string>();

    ngOnInit(): void {
        this.subscripcion = this.$nombre.pipe(
            skip(1),
            debounceTime(2000),
        )
            .subscribe(async (nombre) => {
                this.nombre.emit(nombre);
            });
    }

    ngOnDestroy(): void {
        this.subscripcion?.unsubscribe();
    }

    buscar(evento: Event) {
        const nombre: string = (event?.target as HTMLInputElement).value;
        this.$nombre.next(nombre);
    }
}
