import { Stock } from  '../../../schemas/stock.schema'

export interface IStockRepository {
  create(data: Partial<Stock>): Promise<Stock>;
  findAll(): Promise<Stock[]>;
  findById(id: string): Promise<Stock>;
  update(id: string, data: Partial<Stock>): Promise<Stock>;
  delete(id: string): Promise<void>;
}
