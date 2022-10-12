import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';



@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {
  crearEmpleado: FormGroup;
  submitted = false;
  
  constructor(private fb: FormBuilder, private _empleadoService: EmpleadoService) {
    this.crearEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      salario: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  agregarEmpleado(){
    this.submitted = true;
    if (this.crearEmpleado.invalid){
      return;
    }
    const empleado: any = {
      nombre: this.crearEmpleado.value.nombre,
      apellido: this.crearEmpleado.value.apellido,
      dni: this.crearEmpleado.value.dni,
      salario: this.crearEmpleado.value.salario
    }
    console.log(empleado);

    this._empleadoService.agregarEmpleado(empleado.then(()=>{
      console.log("Cargado con éxito!!!")
    }))
  }


}
