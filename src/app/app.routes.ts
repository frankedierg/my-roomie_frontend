import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { LoginComponent } from './pages/login.component';
import { AuthGuard } from './auth.guard';
import { RoomFormComponent } from './pages/room-form.component';
import { RoomListComponent } from './pages/room-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard] // 👈 Protección aquí
  },
   { path: 'rooms/new', component: RoomFormComponent },
   { path: 'rooms', component: RoomListComponent },
   { path: 'rooms/edit/:id', component: RoomFormComponent }

];