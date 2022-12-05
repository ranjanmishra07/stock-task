import {calculateCurrentStockLevels} from './index';

const testSku = 'KED089097/68/09';
const totalQty = {sku: testSku, qty: 5184};
const invalidStock = '1234';
describe('valid stock test', () => {
  test('calculate current stock level for sku', async() => {

    expect(await calculateCurrentStockLevels(testSku)).toEqual(totalQty);
  });
});

describe('invalid stock test', () => {
  test('failing current stock level for sku', async() => {

    await expect(calculateCurrentStockLevels(invalidStock))
    .rejects
    .toThrow();
    })
});