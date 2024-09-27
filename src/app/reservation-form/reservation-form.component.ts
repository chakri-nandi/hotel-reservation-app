import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterLink],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup=new FormGroup({});
  private formBuilder= inject(FormBuilder);
  private reservationService=inject(ReservationService);
  private router=inject(Router);
  private activatedRoute=inject(ActivatedRoute);
  reservationId:string = this.router.url.split('/')[2] || '';

  onSubmit() {
    if(this.reservationForm.valid) {
      // add new reservation to the service and navigate to the list page when form is submitted successfully.  
      if(this.reservationId) {
        
        this.reservationService.updateReservation(+this.reservationId, this.reservationForm.value);  
      } else {
      this.reservationService.addReservation(this.reservationForm.value); 
      }

      this.router.navigate(['/list']);  
      // This method will also reset the form after successful submission. 
      this.reservationForm.reset();
    }
  }
  
  ngOnInit(): void {
    this.formDetails();
  }

  private formDetails() {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', [Validators.required]],
      checkOutDate: ['', [Validators.required]],
      guestName: ['', [Validators.required, Validators.minLength(3)]],
      guestEmail: ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phoneNumber: ['', [Validators.required,Validators.minLength(6), Validators.pattern('^\\+?[0-9]\\d{1,14}$')]],
      roomNumber: ['', [Validators.required, Validators.min(1)]]
    });

    this.fillFormById();
  }

  private fillFormById() {
    //let id = this.activatedRoute.snapshot.paramMap.get('id'); --> use this when using ActivatedRoute module
    if (this.reservationId) {
      // if the id exists in the url, fetch the reservation details from the service and populate the form.
      let reservation = this.reservationService.getReservationById(+this.reservationId);
      if (reservation) {
        this.reservationForm.patchValue(reservation);
      } 
    }
  }
}
