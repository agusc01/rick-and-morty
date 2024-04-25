import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-error',
    standalone: true,
    imports: [RouterModule],
    template: `
        <main class="d-flex justify-content center align-items-center">
            <section class="container">
                <h1 class="text-danger text-center">Página no encontrada</h1>
                <article class="d-flex justify-content-center align-items-center flex-column">
                    <button class="btn btn-outline-danger mb-4" routerLink="/">
                        Volver al inicio
                    </button>
                    <img
                        class="img rotate-scale-down"
                        src="./../../../assets/404.png"
                        alt="404"
                    >
                    <h1 class="text-danger">Error 404</h1>

                </article>
            </section>
        </main>
    `,
    styles: `
        main{
            min-height: 100vh;
        }
        img {
            max-width: 90%;
        }
    `
})
export default class ErrorPage { }
