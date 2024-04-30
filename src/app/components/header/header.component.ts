import { Component, Input } from '@angular/core';
import { InputBusquedaComponent } from '../input-busqueda/input-busqueda.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [InputBusquedaComponent],
    template: `
        <header class="pt-5">
            <div class="container">
                <h1 class="title text-info mb-3">
                    Ricky & Morty
                    <span class="text-white">
                        <em>
                            by {{autor}}
                        </em>
                    </span>
                </h1>
            </div>
            <!-- <app-input-busqueda/> -->
        </header>
    `,
    styles: ``
})
export class HeaderComponent {
    @Input() public autor!: string;
}
