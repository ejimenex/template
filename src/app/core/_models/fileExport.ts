import { DecimalPipe } from '@angular/common';


export interface fileExport {

    id           : number;
    company      : string; 
    id_BankFile   : number;
    name_BankFile : string;
    id_Bank       : number;
    bank         : string; 
    id_Currency   : number;
    currency     : string;
    createdDate  : Date;
    dateExport   : Date;
    quantity     : number;
    totalAmount  : DecimalPipe;
    createdBy    : string; 
    userExport   : string; 

}