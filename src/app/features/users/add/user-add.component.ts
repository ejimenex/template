import { Component, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { endpoint } from "../../../../environments/environment";
import { Helpers } from "../../../helpers";
import { HttpClient } from "@angular/common/http";
import { role } from "../../../core/_models/role.model";
import { AlertService } from "../../../core/_services/alert.service";
import { ThrowStmt } from "@angular/compiler";
import { RoleService } from '../../../core/_services/role.service';
import { UserService } from "../../../core/_services/user.service";
import { user } from "../../../core/_models/user.model";


declare var swal: any;

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
})
export class UserAddComponent {
  title: string
  user: user;
  roles: role[]

  email: string
  nombre: string
  apellido: string  
  item: any
  enableForm: boolean;
  codigo: string;
  departamento: string;
  posicion: string;
  oficina: string;
  password: string = 'Mardom2020';
  isPasswordGeneric: boolean = true;
  role: string = "#";
  status: Boolean;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    protected _http: HttpClient,
    private userService: UserService,    
    private alertService: AlertService
  ) {
   
 
  }
  async ngOnInit(){
    
    this.title = this.item != 0
      ? "Editar Usuario"
      : "Agregar nuevo Usuario";
    
    await this.getAllRole();

    if (this.item != 0) {
      this.user = this.item;
      
      this.nombre       =  this.user.firstName;
      this.apellido     =  this.user.lastName;  
      this.email        =  this.user.userName;        
      this.email        =  this.user.address;       
      this.oficina      =  this.user.office;        
      this.departamento =  this.user.departament;   
      this.posicion     =  this.user.position;                   
      this.codigo       =  this.user.phoneNumber;  
      this.status       =  this.user.status;
      
      if(this.user.role != 'Sin asignar'){
        this.role         =  this.user.role;
      }
      
    } else {
      this.user = new user();      
    }
    
  }
  save() {
    if(this.validate()) return   
    else this.add();
  }
  add() {    

    this.user.firstName = this.nombre;
    this.user.lastName = this.apellido;
    this.user.email = this.email;
    this.user.address = this.email;
    this.user.office = this.oficina;
    this.user.departament = this.departamento;
    this.user.position = this.posicion;
    this.user.role = this.role;
    this.user.phoneNumber = this.codigo;
    this.user.status = this.status;
    this.user.password = this.password;
    this.user.isPasswordGeneric = this.isPasswordGeneric;    

    if(this.user.id){
      this.userService.updateUser(this.user).subscribe(
        (response) => {
          this.alertService.success("Usuario actualizado exitosamente");
          this.notifyParent.emit();
          this.activeModal.close();
        },
        (error) => {
          
          let errorToShow = 'Ha ocurrido un error inesperado';
          
          if(typeof(error.error) == 'string'){
            errorToShow = error.error;
          }else if(typeof(error.error.detail) == 'string'){
            errorToShow = error.error.detail;
          } 

          errorToShow = errorToShow.length > 50 ? 'Ha ocurrido un error inesperado' : errorToShow;
          this.alertService.error(errorToShow);
        }
      );     
    }else {
    
      this.userService.createUser(this.user).subscribe(
        (response) => {
          this.alertService.success("Usuario creado exitosamente");
          this.notifyParent.emit();
          this.activeModal.close();
        },
        (error) => {          
          let errorToShow = 'Ha ocurrido un error inesperado';
          
          if(typeof(error.error) == 'string'){
            errorToShow = error.error;
          }else if(typeof(error.error.detail) == 'string'){
            errorToShow = error.error.detail;
          } 

          errorToShow = errorToShow.length > 50 ? 'Ha ocurrido un error inesperado' : errorToShow;
          this.alertService.error(errorToShow);
        }
      );
    }

  }
  validate(){
    if(!this.nombre){
      this.alertService.error('Por favor completar el campo de nombre')       
    }
    if(!this.apellido){
      this.alertService.error('Por favor completar el campo de apellido')       
    }
    if(!this.email){
      this.alertService.error('Por favor completar el campo de email')       
    }
    if(this.role == "#"){
      this.alertService.error('Por favor debe seleccionar un role de usuario')       
    }
    return !this.nombre || !this.apellido || !this.email || this.role == "#";
  }

  setPasswordGeneric(){
    if(this.isPasswordGeneric){
      this.password = 'Mardom2020';
    }else{
      this.password = '';
    }
  }
  
  async validateUser() {    
    await this.userService
          .validateUser(this.email)
          .subscribe((res) => {                             
            this.enableForm = true;
            this.codigo = res.data[0].codigo;
            this.departamento = res.data[0].departamento;
            this.posicion = res.data[0].cargoNombre;
            this.oficina = res.data[0].oficina;
            
            let nombres = res.data[0].nombre.split(' ');
            this.apellido = nombres.length > 3 ? nombres[2]+' '+nombres[3] : nombres[1]+' '+nombres[2];
            this.nombre = nombres.length > 3 ? nombres[0]+' '+nombres[1] : nombres[0];

            if(this.email.indexOf('@') == -1) {
              let apellidoToEmail = nombres.length > 3 ? nombres[2] : nombres[1];
              this.email = this.nombre.substr(0,1)+ apellidoToEmail +'@mardom.com';
              this.email = this.email.toLowerCase();
            }
          });        
  }

  getAllRole() {
    this.userService.getRoles().subscribe(result => {
      this.roles = result;      
    });       
  }
}
