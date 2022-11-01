import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }

  agregarEmpleado(empleado: any) : Promise<any>{
    return this.firestore.collection('items').add(empleado);
  }

  getEmpleados(): Observable<any>{
    return this.firestore.collection('items').snapshotChanges();
  }
  getEmpleado(id: string): Observable<any>{
    return this.firestore.collection('items').doc(id).snapshotChanges();
  }
  actualizar(id: string, data:any): Promise<any>{
    return this.firestore.collection('items').doc(id).update(data);
  }
  eliminar(id:string): Promise<any>{
    return this.firestore.collection('items').doc(id).delete();
  }
}

