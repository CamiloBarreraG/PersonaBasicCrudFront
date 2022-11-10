import { persona } from 'src/app/modelos/persona';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { alertasModalesServicio } from './alertasModalesServicio';
import { eBoton,eIconos,eTitulos } from 'src/app/modelos/mensajesAlerta';
@Injectable({
  providedIn: 'root'
})
export class personaServicio {
  Personas = [new persona()];
  onPersonasChanged: BehaviorSubject<any>;
  private api_url = `${environment.API_URL}Persona`;
  constructor(
    private _httpClient: HttpClient,private _alertaServicio: alertasModalesServicio
  ) {
    this.onPersonasChanged = new BehaviorSubject({});
  }

  getPersonas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get<persona[]>(
          `${this.api_url}`
        )
        .subscribe((response) => {
          this.Personas = response;
          this.onPersonasChanged.next(response);
          resolve();
        }),
        (err: any) => {
          console.log(err);
          reject();
        };
    });

  };
  nuevaPersona(persona: persona){
    return this._httpClient
        .post<void>(
          `${this.api_url}`, persona
        )
  };
  editPersona(persona: persona){
    return this._httpClient
        .put<void>(
          `${this.api_url}`, persona
        )
  };
  deletePersona(cedula: string) {
    return this._httpClient
        .delete<void>(
          `${this.api_url}/${cedula}`,
        )
  };
}
