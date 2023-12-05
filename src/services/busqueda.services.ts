import { Injectable } from "@angular/core";
import { Firestore, collection, query, where, getDocs, DocumentData, QuerySnapshot } from "@angular/fire/firestore";
import { Observable, from, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { RegistroPacientes } from "src/interfaces/registropacientes.interfaces";

@Injectable({
  providedIn: 'root'
})
export class BusquedaServices {
  constructor(private firestore: Firestore) {}

  buscarPorHistorial(numeroHistorial: string): Observable<RegistroPacientes[]> {
    const busquedaRef = collection(this.firestore, 'RegistroPacientes');
    const q = query(busquedaRef, where('N° Historial clínicol', '==', numeroHistorial));

    return from(getDocs(q)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        return querySnapshot.docs.map((doc) => {
          const data = doc.data() as RegistroPacientes;
          return { id: doc.id, ...data };
        });
      }),
      catchError((error) => {
        console.error('Error en la búsqueda:', error);
        return throwError('Error al buscar pacientes');
      })
    );
  }
}
