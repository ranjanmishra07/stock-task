import fs from "fs";
import path from "path";
import { IStock } from "../interfaces/stock.interface";
// import {} from '../../jest.config'

const filePath = path.resolve(__dirname,'../../store/stock.json') ;

export async function findStock(sku: string): Promise <IStock[]> {

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if(error) {
                reject(error);
            }
            const parsedData = JSON.parse(data);
            let filtered: IStock[] = []
            for(let i=0;i<parsedData.length; i++) {
                if(parsedData[i].sku === sku) {
                    filtered.push({
                        sku: parsedData[i].sku,
                        stock: parsedData[i].stock
                    })
                }
            }

            //  console.log('obj', filtered);
             resolve(filtered);
        })
    })
}