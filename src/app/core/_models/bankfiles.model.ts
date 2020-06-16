
import { BaseModel } from './base.model';
import { bankFilesDetail } from './bankFileDetail.model';

export class bankFiles extends BaseModel{
currencyId:number
currencyName:string
bankId:number
bankName:string
totalAmount:number
quantity:number
status:string
commentary:string
detail:bankFilesDetail[]
}