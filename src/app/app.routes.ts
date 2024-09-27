import { Routes } from '@angular/router';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { HomeComponent } from './home/home.component';
import {  ReservationFormComponent } from './reservation-form/reservation-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '', title: 'Home', component:HomeComponent,
        //loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path:'list', title:'Reservation List', component:ReservationListComponent,
    },
    {
        path:'new', title:'New Reservation',component:ReservationFormComponent,
    },
    {
        path: 'edit/:id', title: 'Edit Reservation', component: ReservationFormComponent,
    },
    { 
        path: '**', title: 'Page Not Found', component: PageNotFoundComponent,  
    }
];
