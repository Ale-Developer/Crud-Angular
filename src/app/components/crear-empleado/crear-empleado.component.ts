import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';



@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {
  crearEmpleado: FormGroup;
  submitted = false;
  id: string | null;
  titulo = 'CREAR EMPLEADO';

  constructor(private fb: FormBuilder, private _empleadoService: EmpleadoService, private router:Router, private aRoute: ActivatedRoute) {
    this.crearEmpleado = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: ['', Validators.required],
    salario: ['', Validators.required],

  })
  this.id = this.aRoute.snapshot.paramMap.get('id');
 }



  ngOnInit(): void {
    this.edit();
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

    this._empleadoService.agregarEmpleado(empleado).then(()=>{
      console.log("Cargado con éxito!!!");
      this.router.navigate(['/lista']);
    })
  }
  edit(){
    if (this.id !==null){
      this.titulo = 'EDITAR EMPLEADO';
      this._empleadoService.getEmpleado(this.id).subscribe( data=> {
        this.crearEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          dni: data.payload.data()['dni'],
          salario: data.payload.data()['salario'],
        })
      })
    }
  }
  botonEmpleado(){
    this.submitted = true;
    if (this.crearEmpleado.invalid){
      return;
    }
    if (this.id == null){
      this.agregarEmpleado();
    }
    else{
      this.actualizar(this.id);
    }
  }
  actualizar(id:string){
    const empleado: any = {
      nombre: this.crearEmpleado.value.nombre,
      apellido: this.crearEmpleado.value.apellido,
      dni: this.crearEmpleado.value.dni,
      salario: this.crearEmpleado.value.salario
    }
    this._empleadoService.actualizar(id, empleado).then(() =>{
      console.log("TODO MARCHA BIEN!");
      this.router.navigate(['/lista']);
    })
  }
}
