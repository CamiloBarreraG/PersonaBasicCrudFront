import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";;

@Injectable({
    providedIn: 'root'
})
export class alertasModalesServicio {
    iconoError = 'error';
    iconoExito = 'success';
    iconoAdvertencia = 'warning';
    iconoInformacion = 'info';
    iconoPregunta = 'question';

    constructor() { }

    modalBasicaExitoError(titulo:string, mensaje:string, icono:SweetAlertIcon, nombreBoton:string, showConfirmButton?:boolean): Promise<SweetAlertResult> {
        if (showConfirmButton === undefined) {
            showConfirmButton = true;
        }
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon:icono,
            confirmButtonText: nombreBoton,
            showConfirmButton: showConfirmButton,
            allowOutsideClick: false
        });
    }

    deleteAlert(titulo:string, mensaje:string): Promise<SweetAlertResult> {
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            customClass: {
                title: 'swal-alert-title',
                htmlContainer: 'swal-alert-html-container',
            }
        });
    }

    saveAlert(titulo:string, mensaje:string): Promise<SweetAlertResult> {
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            customClass: {
                title: 'swal-alert-title',
                htmlContainer: 'swal-alert-html-container',
            }
        });
    }

    confirmAlert(titulo:string, mensaje:string): Promise<SweetAlertResult> {
        return Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            customClass: {
                title: 'swal-alert-title',
                htmlContainer: 'swal-alert-html-container',
            }
        });
    }


}
