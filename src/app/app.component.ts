import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReservationComponent } from "./reservation-form/reservation-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReservationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotel-reservation';
}
