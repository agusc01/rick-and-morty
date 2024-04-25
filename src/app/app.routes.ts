import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
    {
        title: 'Ricky & Morty API',
        path: 'inicio',
        loadComponent: () => import('./pages/home/home.page'),
    },
    {
        title: 'Detalle del personaje',
        path: 'personaje/:id',
        loadComponent: () => import('./pages/detalle-personaje/detalle-personaje.page'),
    },
    {
        title: 'Detalle del episodio',
        path: 'episodio/:id',
        loadComponent: () => import('./pages/detalle-episodio/detalle-episodio.page'),
    },
    {
        title: 'Página no encontrada',
        path: '404',
        loadComponent: () => import('./pages/error/error.page'),
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    }
];
