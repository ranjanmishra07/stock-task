// eslint-disable-next-line no-console

import { ETransactionType } from "../enums/transaction.enum";
import { findStock } from "../useCase/stocks";
import { findTransaction } from "../useCase/transaction";

export async function calculateCurrentStockLevels(sku: string): Promise <{sku: string, qty: number}> {

    const promises = await Promise.all([findStock(sku),findTransaction(sku) ]);

    const stocks = promises[0];
    const transactions = promises[1];
    if(stocks.length === 0 && transactions.length === 0) {
        throw new Error('no sku present');
    }
    if(stocks.length === 0) {
        return {sku, qty : 0}
    }
    let totalStock = 0
    let totalQty = 0
    stocks.forEach(a=> {
        totalStock = totalStock + a.stock;
    })
    transactions.forEach(a=> {
        if(a.type === ETransactionType.ORDER) {
            totalQty = totalQty + a.qty;
        }
        if(a.type === ETransactionType.REFUND) {
            totalQty = totalQty - a.qty;
        }
    })
    console.log("totalStock", totalStock, "totalQty", totalQty, "current total stock level", totalStock * totalQty)
    //assuming total qty of current stock level is total qty * number of stock
    return {sku, qty: totalQty * totalQty}
}

// calculateCurrentStockLevels('KED089097/68/09').catch((e)=> console.log(e));