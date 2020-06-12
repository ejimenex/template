import {BaseModel } from './base.modeol';
import { DecimalPipe } from '@angular/common';


export class file extends BaseModel
{
   currencyId : number
   bankID : number
   bankName : string
   companyId : number
   companyName : string
   totalAmount : DecimalPipe
   Quantity : number
   Status: string
   Commentary : string
}