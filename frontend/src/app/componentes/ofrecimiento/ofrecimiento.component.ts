import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {E} from "@angular/core/src/render3";

@Component({
  selector: 'app-ofrecimiento',
  templateUrl: './ofrecimiento.component.html',
  styleUrls: ['./ofrecimiento.component.css']
})
export class OfrecimientoComponent implements OnInit,DoCheck {

  constructor(private _httpClient:HttpClient) { }

  @Input()
  identificador;

  peticion;
  autoSolicitado;
  autoOfrecido;
  usuarioSolicita;
  usuarioOfrece;


  ngOnInit() {
    const cargarPeticion$=this._httpClient.post(
      'http://localhost:3000/Peticion/obtener',
      {identificador:this.identificador}
    );

    cargarPeticion$.subscribe(
      (peticion:any)=>{
        this.peticion=peticion;
        this.autoSolicitado=peticion.autoSolicitado;
        this.autoOfrecido=peticion.autoOfrecido;
        this.usuarioSolicita=peticion.usuarioSolicita;
        this.usuarioOfrece=peticion.usuarioOfrece;
      });
  }

  ngDoCheck(){
    console.log("refrescopeticion");
  }

  aceptarPeticion(id){
    const aceptarPeticion$= this._httpClient.post("http://localhost:3000/Peticion/aceptar",
      {identificador:id});

    aceptarPeticion$.subscribe(()=>{
      console.log("peticion aceptada");
    });
  }

  rechazarPeticion(id){
    const rechazarPeticion$= this._httpClient.post("http://localhost:3000/Peticion/rechazar",
      {identificador:id});

    rechazarPeticion$.subscribe(()=>{
      console.log("peticion rechazada");
    });

  }
}
