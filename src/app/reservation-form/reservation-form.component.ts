import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup=new FormGroup({});
  private formBuilder= inject(FormBuilder);
  
  onSubmit() {
    if(this.reservationForm.valid) {
      console.log('invalid form');      
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
      guestEmail: ['', [Validators.required, Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phoneNumber: ['', [Validators.required,Validators.minLength(6), 
        Validators.pattern('^\\+?[0-9]\\d{1,14}$')]],
      noOfRooms: ['', [Validators.required, Validators.min(1)]]
    });
  }
}
