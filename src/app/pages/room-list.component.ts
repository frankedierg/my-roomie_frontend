import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent,HttpClientModule],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  rooms: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:5000/api/rooms')
      .subscribe({
        next: (res) => this.rooms = res,
        error: (err) => console.error('Error al obtener habitaciones:', err)
      });
  }

  eliminarHabitacion(id: string) {
    if (!confirm('¿Seguro que deseas eliminar esta habitación?')) return;

    this.http.delete(`http://localhost:5000/api/rooms/${id}`)
      .subscribe({
        next: () => {
          this.rooms = this.rooms.filter(room => room._id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar habitación:', err);
        }
      });
  }
}
