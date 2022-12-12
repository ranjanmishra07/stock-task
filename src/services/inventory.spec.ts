import {calculateCurrentStockLevels} from './inventiry.service';

const testSku = 'KED089097/68/09';
const invalidStock = '1234';
describe('valid stock test', () => {
  test('calculate current stock level for sku', async() => {
    const data = await calculateCurrentStockLevels(testSku);
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("sku");
    expect(data).toHaveProperty("qty");
  });
});

describe('invalid stock test', () => {
  test('failing current stock level for sku', async() => {

    await expect(calculateCurrentStockLevels(invalidStock))
    .rejects
    .toThrow();
    })
});