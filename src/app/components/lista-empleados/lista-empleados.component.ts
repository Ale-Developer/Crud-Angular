import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados: any[] = [];

  constructor(private _empleadoService: EmpleadoService) {

   }
  public load: Boolean = false;
  ngOnInit(): void {
    this.getEmpleados();
    setTimeout(() => {
      this.load = true;
      }, 3000);

  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      //console.log(this.empleados);
    });
  }
  eliminar(id:string){
    this._empleadoService.eliminar(id).then(() => {
      console.log("Se eliminó correctamente!!!")
    }).catch(error =>{
      console.log(error);
    })
  }
}
