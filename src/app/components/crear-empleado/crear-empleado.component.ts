import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  }
}
