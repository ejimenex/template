import {BaseModel } from './base.modeol';
import { DecimalPipe } from '@angular/common';
import { Currency } from './currency';


export class file extends BaseModel
{
   currencyId : number
   bankID : number
   bankName : string
   companyId : number
   companyName : string
   totalAmount : DecimalPipe
   quantity : number
   status: string
   commentary : string
   date:Date
   bank:string
   currency:string
   total:number
   lastUpdate:Date
   totalUpdate:number

}