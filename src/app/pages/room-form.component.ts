import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../app/components/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { departamentos } from '../data/colombia-locations';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, HttpClientModule],
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
  minDate = new Date().toISOString().split('T')[0];

  propertyTypes = ['Apartamento', 'Casa', 'Estudio', 'Habitación', 'Apartaestudio'];
  departamentos = departamentos;
  ciudades: string[] = [];

  room = {
    title: '',
    description: '',
    location: '',
    price: null,
    billsIncluded: false,
    propertyType: '',
    availableFrom: '',
    imageUrl: '',
    departamento: '',
    ciudad: ''
  };

  roomId: string | null = null;
  message = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id');

    if (this.roomId) {
      this.http.get<any>(`http://localhost:5000/api/rooms/${this.roomId}`)
        .subscribe({
          next: (data) => {
            this.room = data;
            this.actualizarCiudades(data.departamento);
          },
          error: () => this.message = '❌ Error al cargar la habitación'
        });
    }
  }

  actualizarCiudades(depto: string) {
    const encontrado = this.departamentos.find(d => d.nombre === depto);
    this.ciudades = encontrado ? encontrado.ciudades : [];
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    this.http.post<{ imageUrl: string }>('http://localhost:5000/api/upload', formData)
      .subscribe({
        next: (res) => {
          this.room.imageUrl = res.imageUrl;
        },
        error: (err) => {
          console.error('❌ Error al subir imagen', err);
        }
      });
  }

  guardarHabitacion(form: NgForm) {
    if (form.invalid) return;

    const request = this.roomId
      ? this.http.put(`http://localhost:5000/api/rooms/${this.roomId}`, this.room)
      : this.http.post('http://localhost:5000/api/rooms', this.room);

    request.subscribe({
      next: () => {
        this.message = 'Habitación publicada exitosamente 🎉';
        setTimeout(() => {
          this.router.navigate(['/rooms']);
        }, 1000);
      },
      error: (err) => {
        this.message = '❌ Error al guardar: ' + (err.error?.error || 'Error desconocido');
      }
    });
  }
}
