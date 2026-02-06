import { Types } from 'mongoose';

export interface IWarehouse {
  name: string;
  location: string;
  inventories: Types.ObjectId[];
}