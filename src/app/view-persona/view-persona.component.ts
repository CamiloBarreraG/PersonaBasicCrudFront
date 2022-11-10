import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { personaServicio } from 'src/servicios/personaServicios';
import { persona } from '../modelos/persona';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { alertasModalesServicio } from 'src/servicios/alertasModalesServicio';
import { eBoton,eIconos,eTitulos } from 'src/app/modelos/mensajesAlerta';


@Component({
  selector: 'app-view-persona',
  templateUrl: './view-persona.component.html',
  styleUrls: ['./view-persona.component.scss'],

})
export class ViewPersonaComponent implements OnInit {
  dataSource: MatTableDataSource<persona[]> = new MatTableDataSource();
  newPersona = new persona();
  nombre = new FormControl('');
  cedula = new FormControl('');
  apellido = new FormControl('');
  onEdit=0;

  constructor(private personaServicio: personaServicio,private _alertaServicio: alertasModalesServicio) {
  }
  ngOnInit(): void {
    this.consultarPersonas();
  };
  consultarPersonas() {

    this.personaServicio.getPersonas();
    this.personaServicio.onPersonasChanged.subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
    });
  }

  guardarCambios() {
    var cambioPersona = new persona();
    cambioPersona.cedula = this.cedula.value ?? '';
    cambioPersona.nombre = this.nombre.value ?? '';
    cambioPersona.apellido = this.apellido.value ?? '';
    if(cambioPersona.apellido==''||cambioPersona.nombre==''||cambioPersona.cedula==''){
      this._alertaServicio.modalBasicaExitoError(
        eTitulos.error,
        'Todos los campos deben contener información',
        eIconos.iconoError,
        eBoton.aceptar
      );
    }
    else{
      if(this.onEdit==0){
        this.personaServicio.nuevaPersona(cambioPersona).subscribe((response) => {
          this._alertaServicio.modalBasicaExitoError(
            eTitulos.success,
            'Se ha guardado satisfactoriamente',
            eIconos.iconoExito,
            eBoton.aceptar
          )
          this.consultarPersonas()
        }),
        (err: any) => {
          console.log(err);
        };;;
        }
        else{
        this.personaServicio.editPersona(cambioPersona).subscribe((response) => {
          this._alertaServicio.modalBasicaExitoError(
            eTitulos.success,
            'Se ha guardado satisfactoriamente',
            eIconos.iconoExito,
            eBoton.aceptar
          )
          this.consultarPersonas()
        }),
        (err: any) => {
          console.log(err);
        };;;
        }
        this.onEdit=0;
        this.clearForm();
    }
  };

  clearForm(){
    this.apellido.setValue('');
    this.nombre.setValue('');
    this.cedula.setValue('');
  }
  editPersona(persona: persona) {
    this.apellido.setValue(persona.apellido);
    this.nombre.setValue(persona.nombre);
    this.cedula.setValue(persona.cedula);
    this.onEdit=1;
  };
  deletePersona(cedula: string) {
    this.personaServicio.deletePersona(cedula).subscribe((response) => {
            this._alertaServicio.modalBasicaExitoError(
              eTitulos.success,
              'Se ha eliminado satisfactoriamente',
              eIconos.iconoExito,
              eBoton.aceptar
            )
            this.consultarPersonas()
          }),
          (err: any) => {
            console.log(err);
          };;
  }
  displayedColumns = ['Cedula', 'Nombre', 'Apellido', 'Acciones'];
}

