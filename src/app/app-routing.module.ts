import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadoComponent } from './components/crear-empleado/crear-empleado.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';

const routes: Routes = [
  {path: '',redirectTo:'lista', pathMatch:'full'},
  {path: 'lista', component:ListaEmpleadosComponent},
  {path: 'crear',component:CrearEmpleadoComponent},
  {path: 'editar/:id', component:CrearEmpleadoComponent},
  {path: '**', redirectTo:'lista',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
