import { Injectable } from '@angular/core';
import { IReservation } from '../models/ireservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private reservations: IReservation[] = [];

  constructor() {
    this.getReservations();
   }  

  getReservations():IReservation[] {
    this.reservations=JSON.parse(localStorage.getItem('reservations') || '[]');
    return this.reservations;
  }

  getReservationById(id: number): IReservation | undefined {
    return this.reservations.find(r => r.id === id);
  }

  addReservation(reservation: IReservation): void {
    reservation.id = Date.now();
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  updateReservation(id:number, reservation: IReservation): void {
    const index = this.reservations.findIndex(r => r.id === id);
    if (index !== -1) {
      reservation.id = id;
      this.reservations[index] = reservation;     
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }
  
  deleteReservation(id: number): void {
   const index = this.reservations.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }
}
