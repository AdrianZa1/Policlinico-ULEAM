import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BusquedaServices } from 'src/services/busqueda.services';
import { RegistroPacientes } from 'src/interfaces/registropacientes.interfaces';

@Component({
  selector: 'app-buscarpaciente',
  templateUrl: './buscarpaciente.component.html',
  styleUrls: ['./buscarpaciente.component.css']
})
export class BuscarpacienteComponent {
  pacienteEncontrado: RegistroPacientes | null = null;

  constructor(private busquedaServices: BusquedaServices, private router: Router, private ngZone: NgZone) {}

  buscar(): void {
    const historial = (document.getElementById('historial') as HTMLInputElement)?.value;

    if (historial === '') {
      alert('Por favor ingrese el historial clínico para realizar la búsqueda del paciente');
      return;
    }

    this.buscarPacientePorHistorial(Number(historial));
  }

  buscarPacientePorHistorial(historial: number) {
    this.busquedaServices.buscarPorHistorial(historial.toString()).subscribe(
      (pacientesEncontrados: RegistroPacientes[]) => {
        this.ngZone.run(() => {
          this.pacienteEncontrado = pacientesEncontrados.length > 0 ? pacientesEncontrados[0] : null;
        });
      },
      (error) => {
        console.error('Error al buscar paciente:', error);
      }
    );
  }

  regreso(): void {
    this.router.navigate(['/inicio']);
  }
}
