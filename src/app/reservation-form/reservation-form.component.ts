import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});
  reservationId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initializeForm();
    this.fillFormIfEditing();
  }

  private initializeForm(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', [Validators.required, Validators.minLength(3)]],
      guestEmail: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^\\+?[0-9]\\d{1,14}$')]],
      roomNumber: ['', [Validators.required, Validators.min(1)]]
    });
  }

  private fillFormIfEditing(): void {
    if (this.reservationId) {
      const reservation = this.reservationService.getReservationById(+this.reservationId);
      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }
    }
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      if (this.reservationId) {
        this.reservationService.updateReservation(+this.reservationId, this.reservationForm.value);
      } else {
        this.reservationService.addReservation(this.reservationForm.value);
      }
      this.router.navigate(['/list']);
      this.reservationForm.reset();
    }
  }
}
