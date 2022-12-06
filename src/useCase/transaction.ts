import fs from "fs";
import path from "path";
import { ITransaction } from "../interfaces/transaction.interface";
// import {} from '../../jest.config'

const filePath = path.resolve(__dirname,'../../store/transactions.json') ;

export async function findTransaction(sku: string): Promise <ITransaction[]> {

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if(error) {
                reject(error);
            }
            const parsedData = JSON.parse(data);
            let filtered: ITransaction[] = []
            for(let i=0;i<parsedData.length; i++) {
                if(parsedData[i].sku === sku) {
                    filtered.push({
                        sku: parsedData[i].sku,
                        type: parsedData[i].type,
                        qty: parsedData[i].qty
                    })
                }
            }

            //  console.log('obj', filtered);
             resolve(filtered);
        })
    })
}

// findTransaction('KED089097/68/09');