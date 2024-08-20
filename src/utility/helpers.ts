import { validationResult } from "express-validator";
import { UnprocessableContent } from "./service-error";
import { Response, Request } from "express"
import axios from "axios";
import { FilterQuery } from "mongoose";

export function randNum(len = 4){
  const numbers = '0123456789'
  let randomCode = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    randomCode += numbers.charAt(randomIndex);
  }

  return randomCode;
}

export const randAlphaNum = (len = 6) => {
  const char = 'ABCDEFGHIJKLMNOPQRSUVWXYZ0123456789'
  let randomCode = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * char.length);
    randomCode += char.charAt(randomIndex);
  }

  return randomCode;
}

export const compareStrings = (str1: string, str2: string) => {
  return str1?.toLowerCase().trim() === str2?.toLowerCase().trim();
}

export const isEmpty = (mixedVar: any) => {
  let undef;
  let key;
  let i;
  let len;
  const emptyValues = [undef, null, false, 0, '', '0', 'null', 'undefined'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i] || typeof mixedVar == 'undefined') {
      return true;
    }
  }

  if (typeof mixedVar === 'object' && !(mixedVar instanceof Date)) {
      for (key in mixedVar) {
        if (mixedVar.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
  }
  return false;
};

export const maskEmail = (email: string) => {
  const [username, domain] = email.split('@');
  const mask = username.slice(0, 4) + '*'.repeat(Math.floor(username.length / 2)) + username.charAt(username.length - 1);
  return mask + '@' +  domain
}

export const validateRequest = (req: Request) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let message = errors.array()[0].msg
    throw new UnprocessableContent(message, errors.array())
  }
}

export const responsHandler = (res: Response, message: string, status: number = 200, data: any = null) => {
  res.status(status).json({
    status: /^4/.test(status.toString()) ? "failed" : "success",
    message,
    data
  })
}

export const pagingParams = (req: Request) => {
  const limit = req.query?.limit ? parseInt(`${req.query?.limit}`) : 25
  const page = req.query?.page ? parseInt(`${req.query?.page}`) < 1 ? 1 : parseInt(`${req.query?.page}`) : 1

  return {limit, page, ...req.query}
}

export const extractFilters = (payload: any, fields: string[], searchable_fields: string[] =[]) => {
  const proccessed: FilterQuery<any>[] = []
  const filter = Object.entries(payload)

  for(let i = 0; i < filter.length; i ++){
    if(!fields.includes(filter[i][0])) continue;
    else if(filter[i][0] === "search") {
      proccessed.push({ 
        $or: searchable_fields.map(field => ({
          [field]: { $regex: new RegExp(`${filter[i][1]}`), $options: "i"}
        }))
      })
      
    }
    else proccessed.push( { [filter[i][0]]: filter[i][1] } )
  }

  return proccessed;
}

export const getPrice = async (base :string[], quote: string[]) => {
  try {
    const param = new URLSearchParams()
    param.append("ids", base.join(","))
    param.append("vs_currencies", quote.join(","))
    param.append("precision", "full")

    const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?${param.toString()}`)
    return data
  } catch (error) {
    return error?.response
  }
}

export const maskAddress = (address: string) => {
  return isEmpty(address) ? address : address?.slice(0, 5) + '*'.repeat(4) + address.slice(-5);
}