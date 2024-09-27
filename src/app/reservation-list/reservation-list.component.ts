import { Component, inject, Inject, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { IReservation } from '../models/ireservation';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  
  private reservationService = inject(ReservationService);

  reservations: IReservation[]=[];

  ngOnInit(): void {
    this.showReservations();
  }

  showReservations(): IReservation[] {
   return this.reservations = this.reservationService.getReservations ();
  }

  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id);
  }
  
  editReservation(reservation: IReservation) {
    throw new Error('Method not implemented.');
   }
}
