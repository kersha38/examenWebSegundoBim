import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ruta-buscador',
  templateUrl: './ruta-buscador.component.html',
  styleUrls: ['./ruta-buscador.component.css']
})
export class RutaBuscadorComponent implements OnInit,DoCheck {

  constructor(private _httpClient: HttpClient,
              private _router:Router,) {}

  palabraBusqueda;
  buscarResultados(formulario){
    this.indiceAutos=0;
    this.indiceConductores=0;
    this.indiceUsuarios=0;
    const controles = formulario.controls;
    const  palabraBusqueda=controles.palabraBusqueda.value;

    const buscarUsuario$= this._httpClient.post('http://localhost:3000/Usuario/buscar',
      {palabraBusqueda:palabraBusqueda});

    buscarUsuario$.subscribe(
      (usuariosBuscados:any)=>{
        this.todosUsuarios=usuariosBuscados;
        this.cargarUsuarios();
        console.log(this.todosUsuarios);
      });

    const buscarConductores$= this._httpClient.post('http://localhost:3000/Conductor/buscar',
      {palabraBusqueda:palabraBusqueda});

    buscarConductores$.subscribe(
      (conductoresBuscados:any)=>{
        this.todosConductores=conductoresBuscados;
        this.cargarCondcutores();
        console.log(this.todosConductores);
      });

    const buscarAutos$= this._httpClient.post('http://localhost:3000/Auto/buscar',
      {palabraBusqueda:palabraBusqueda});

    buscarAutos$.subscribe(
      (autosBuscados:any)=>{
        this.todosAutos=autosBuscados;
        this.cargarAutos()
        console.log(this.autos);
      });
  }

  todosUsuarios;
  usuarios=[];
  botonUsuario="Visitar";
  actualUsuarios;
  indiceUsuarios=0;
  cargarUsuarios(){
    if(this.indiceUsuarios<this.todosUsuarios.length){
      this.actualUsuarios=this.todosUsuarios.map((usuario,i)=>{
        if(i>=this.indiceUsuarios&&i<this.indiceUsuarios+4) {
          return usuario;
        }
      });
      this.indiceUsuarios+=4;
    }else {
      this.actualUsuarios=[];
    }
  }
  menosUsuarios(){
    if(this.indiceUsuarios>0){
      this.actualUsuarios=this.todosUsuarios.map((usuario,i)=>{
        if(i>this.indiceUsuarios-4&&i<this.indiceUsuarios){
          return usuario;
        }
      });
      this.indiceUsuarios-=4;
    }

  }
  visitarPerfil(idUsuario,idVisitante){
    const url=['/home',idUsuario,'peticion',idVisitante];
    this._router.navigate(url);
  }

  solicitarAuto(idUsuario,idAuto){
    const url=['/home',idUsuario,'seleccion',idAuto];
    this._router.navigate(url);

  }

  conductores=[];
  todosConductores=[];
  actualConductores;
  indiceConductores=0;
  cargarCondcutores(){
    if(this.indiceConductores<this.todosConductores.length){
      this.actualConductores=this.todosConductores.map((conductor,i)=>{
        if(i>=this.indiceConductores&&i<this.indiceConductores+4) {
          return conductor;
        }
      });
      this.indiceConductores+=4;
    }else {
      this.actualConductores=[];
    }
  }

  autos=[];
  botonAuto="Pedir transferencia";
  todosAutos;
  actualAutos;
  indiceAutos=0;
  cargarAutos(){
    if(this.indiceAutos<this.todosAutos.length){
      this.actualAutos=this.todosAutos.map((auto,i)=>{
        if(i>=this.indiceAutos&&i<this.indiceAutos+4) {
          return auto;
        }
      });
      this.indiceAutos+=4;
    }else {
      this.actualAutos=[];
    }
  }

  ngOnInit() {
  }

  ngDoCheck(){
    if(this.usuarios!== this.actualUsuarios) {
      this.usuarios = this.actualUsuarios;
    }

    if(this.conductores!==this.actualConductores){
      this.conductores = this.actualConductores;
    }

    if(this.autos!==this.actualAutos){
      this.autos = this.actualAutos;
    }
  }

}
