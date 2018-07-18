import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ruta-peticion',
  templateUrl: './ruta-peticion.component.html',
  styleUrls: ['./ruta-peticion.component.css']
})
export class RutaPeticionComponent implements OnInit {

  constructor(private _httpClient:HttpClient,
              private _activatedRoute:ActivatedRoute,
              private _roter:Router) { }

  identificador;
  usuario;
  botonAuto="Pedir Transferencia";
  botonCargar="Cargar más";
  autos=[];
  autosMostrados="autos - 8";

  pedirAuto(identificador){
    const url=['/home',1,'seleccion',identificador];
    this._roter.navigate(url);
  }

  ngOnInit() {
    const parametrosRuta$=this._activatedRoute.params;

    parametrosRuta$.subscribe((parametros)=>{
      this.identificador=parametros['identificadorB'];

      const consultarUsuario$= this._httpClient.post("http://localhost:3000/Usuario/obtener",
        {idUsuario:this.identificador});
      consultarUsuario$.subscribe((usuario:any)=>{
        this.usuario=usuario;

        const obtenerAutos$=this._httpClient.post("http://localhost:3000/Conductor/obtenerAutos",
          {identificador:this.usuario.conductores[0].id});

        obtenerAutos$.subscribe((conductorConAutos:any)=>{
          this.autos=conductorConAutos.autos;
        });
      });
    });
  }

}
