import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export const DEFAULT_PERMISSIONS = {
  [UserRole.USER]: [
    'can_view_inventory',
    'can_view_material',
    'can_view_stock',
    'can_view_orders',
    'can_create_orders',
    'can_delete_orders',
    'can_view_warehouse'
  ],
  [UserRole.ADMIN]: [
    'can_create_users',
    'can_edit_users',
    'can_view_users',
    'can_delete_users',
    'can_view_inventory',
    'can_create_inventory',
    'can_update_inventory',
    'can_delete_inventory',
    'can_create_material',
    'can_view_material',
    'can_update_material',
    'can_delete_material',
    'can_create_stock',
    'can_view_stock',
    'can_update_stock',
    'can_delete_stock',
    'can_view_orders',
    'can_create_orders',
    'can_update_orders',
    'can_delete_orders',
    'can_view_warehouse',
    'can_create_warehouse',
    'can_update_warehouse',
    'can_delete_warehouse'
  ],
};

export function getDefaultPermissions(role: UserRole): string[] {
  return DEFAULT_PERMISSIONS[role] || [];
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  username: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken?: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ type: [String], default: [] })
  permissions: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
