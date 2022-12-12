import { findStock } from '../useCase/stocks';
import {calculateCurrentStockLevels} from './inventiry.service';

const testSku = 'KED089097/68/09';
const invalidStock = '1234';
describe('calculateCurrentStockLevels', () => {
  let qty: number;
  let data: {sku: string, qty:number};

  beforeAll(async () => {
    let stock = await findStock(testSku);
    qty = stock[0]?.stock || 0;
  
    data = await calculateCurrentStockLevels(testSku);
})


  test('It should calculate current stock level for sku', async() => {
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("sku");
    expect(data).toHaveProperty("qty");
  });

  test('It should decremet stock level  when transaction type is order', async() => {
    // const data = await calculateCurrentStockLevels(testSku);
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("sku");
    expect(data).toHaveProperty("qty");
    qty && expect(data.qty).toBeLessThan(qty);
  });

  test('It should increment stock level  when transaction type is refund', async() => {
    // const data = await calculateCurrentStockLevels(testSku);
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("sku");
    expect(data).toHaveProperty("qty");
    qty && expect(data.qty).toBeGreaterThan(qty);
  });

  test('It should return 0 qty when stock is not there', async() => {
    // const data = await calculateCurrentStockLevels(testSku);
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("sku");
    expect(data).toHaveProperty("qty");
    expect(data.qty).toBe(0);
  });
});

//decremt stock when order 

//increment stock when refund

// should return 0 qty when stock is not there 

describe('invalid stock test', () => {
  test('It should fail for current stock level for sku', async() => {

    await expect(calculateCurrentStockLevels(invalidStock))
    .rejects
    .toThrow();
    })
});