export interface IReservation {
    id: number;
    checkInDate: Date;
    checkOutDate: Date;
    guestName: string;
    guestEmail: string;
    phoneNumber: string;
    roomNumber: number;
}
