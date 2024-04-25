import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    template: `
        <header class="pt-5">
            <div class="container">
                <div class="content">
                    <h1 class="title text-info mb-3">
                        Ricky & Morty
                        <span class="text-white">
                            <em>
                                by {{autor}}
                            </em>
                        </span>
                    </h1>
                </div>
            </div>
        </header>
    `,
    styles: ``
})
export class HeaderComponent {
    @Input() public autor!: string;
}
