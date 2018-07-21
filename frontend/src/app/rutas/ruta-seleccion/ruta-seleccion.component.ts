import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ruta-seleccion',
  templateUrl: './ruta-seleccion.component.html',
  styleUrls: ['./ruta-seleccion.component.css']
})
export class RutaSeleccionComponent implements OnInit {

  constructor(private _activatedRouter:ActivatedRoute,
              private _httpClient:HttpClient) { }

  identificador=0;
  idAutoPedido=0;
  usuario;
  rangoAutos=4;
  botonAuto="Seleccionar Transferencia";
  botonCargar="Cargar más";
  autos=[];
  autosMostrados="autos - 8";

  cargarAutos(){
    if(this.rangoAutos<this.autos.length)
      this.rangoAutos+=4;

    this.autosMostrados="autos - "+this.rangoAutos;
  }

  realizarTransferencia(idAutoOfrecido){
    const crearTransferencia = this._httpClient.post("http://localhost:3000/Peticion/crear",
      {idAutoOfrecido:idAutoOfrecido,
        idAutoSolicidado:this.idAutoPedido,
        idPoseedor:this.usuario.conductores[0].id,
        idOfrece:this.identificador});
    crearTransferencia.subscribe((resultadoOk)=>console.log(resultadoOk));
    console.log("transferencia creada");
  }

  ngOnInit() {
    const recuperarAutoPedido= this._activatedRouter.params;
    recuperarAutoPedido.subscribe((parametros)=>{
      this.idAutoPedido=parametros['identificadorC'];});

    const recuperarIdUsuario= this._activatedRouter.parent.params;
    recuperarIdUsuario.subscribe((parametros)=>{
      this.identificador=parametros['idUsuario'];

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

