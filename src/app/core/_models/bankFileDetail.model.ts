import { BaseModel } from './base.model';

export class bankFilesDetail extends BaseModel{
bankFileId:number
description:string
amount:number
status:string
referenceNumber:string
serialNumber:string
transactionType:number
postDate:Date
commentary:string
companyName:string
bankName:string
currency:string
statusName:string
}