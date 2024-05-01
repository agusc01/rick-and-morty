import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, debounceTime, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Component({
    selector: 'app-input-busqueda',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <div class="form-floating mb-3">
            <input
                [value]="nombreInput"
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

    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly $nombre = new BehaviorSubject<string>('');
    private subscripcion?: Subscription;
    nombreInput: string = '';
    @Output() nombre = new EventEmitter<string>();

    ngOnInit(): void {
        setTimeout(() => {
            this.setearNombre(this.route.snapshot.queryParams[environment.nombre] ?? '');
        }, 1);
        this.subscripcion = this.$nombre.pipe(
            debounceTime(environment.tiempoDeEsperaAlCambiarNombre),
        )
            .subscribe(async (nombre) => {
                this.setearNombre(nombre);
            });
    }

    ngOnDestroy(): void {
        this.subscripcion?.unsubscribe();
    }

    buscar(evento: Event): void {
        const nombre: string = (event?.target as HTMLInputElement).value;
        this.$nombre.next(nombre);
    }

    setearNombre(nombre: string): void {
        this.nombre.emit(nombre);
        this.nombreInput = nombre;
        this.router.navigate([], { relativeTo: this.route, queryParams: { ...this.route.snapshot.queryParams, nombre } });
    }
}
