import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';




@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit() {
    this.http.get<any[]>('http://localhost:5000/api/users')
      .subscribe({
        next: (res) => this.users = res,
        error: (err) => console.error('Error al obtener usuarios:', err)
      });
  }
  usuarioAEliminar: any = null;
  mostrarModal: boolean = false;

  eliminarUsuario(id: string) {
  if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    this.http.delete(`http://localhost:5000/api/users/${id}`)
      .subscribe({
        next: () => {
          // Eliminar de la lista local sin volver a consultar el backend
          this.users = this.users.filter(user => user._id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
          alert('❌ Error al eliminar el usuario');
        }
      });
  }
}
mostrarConfirmacion(usuario: any) {
  this.usuarioAEliminar = usuario;
  this.mostrarModal = true;
}

cerrarModal() {
  this.usuarioAEliminar = null;
  this.mostrarModal = false;
}

confirmarEliminacion(id: string): void {
  if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    this.http.delete(`http://localhost:5000/api/users/${id}`)
      .subscribe({
        next: () => {
          this.users = this.users.filter(u => u._id !== id);
        },
        error: (err) => console.error('Error al eliminar usuario:', err)
      });
  }
}

estaLogueado(): boolean {
  return !!localStorage.getItem('token');
}

cerrarSesion(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.router.navigate(['/']);
}

getNombreUsuario(): string | null {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).name : null;
}

}
