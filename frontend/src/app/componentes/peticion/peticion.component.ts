import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.component.html',
  styleUrls: ['./peticion.component.css']
})
export class PeticionComponent implements OnInit {

  @Input()
  identificador;

  peticion;
  autoSolicitado;
  autoOfrecido;
  usuarioSolicita;
  usuarioOfrece;
  @Input()
  nick:string;

  @Input()
  nombreModeloSolicitado:string;

  @Input()
  nombreMarcaSolicitado:string;

  @Input()
  anioSolicitado:string;

  @Input()
  colorUnoSolicitado:string;

  @Input()
  colorDosSolicitado:string;

  @Input()
  chasisSolicitado:string;

  @Input()
  nombreModeloOfrecido:string;

  @Input()
  nombreMarcaOfrecido:string;

  @Input()
  anioOfrecido:string;

  @Input()
  colorUnoOfrecido:string;

  @Input()
  colorDosOfrecido:string;

  @Input()
  chasisOfrecido:string;

  constructor(private _httpClient:HttpClient) { }

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

}
