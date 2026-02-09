import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      message: 'Welcome to InventoryHub API!',
      version: '1.0.0',
      description: 'A comprehensive Inventory Management System API',
      baseUrl: 'http://inventoryhub.onthewifi.com',
      documentation: {
        auth: {
          description: 'Authentication & Authorization endpoints',
          endpoints: [
            { method: 'POST', path: '/auth/register', description: 'Register a new user', auth: 'None' },
            { method: 'POST', path: '/auth/login', description: 'Login with email and password', auth: 'None' },
            { method: 'POST', path: '/auth/refresh', description: 'Refresh access token using refresh token', auth: 'None' },
            { method: 'POST', path: '/auth/logout', description: 'Logout user and invalidate tokens', auth: 'JWT Required' },
            { method: 'GET', path: '/auth/me', description: 'Get current user profile', auth: 'JWT Required' },
            { method: 'GET', path: '/auth/google', description: 'Initiate Google OAuth login', auth: 'None' },
            { method: 'GET', path: '/auth/google/callback', description: 'Google OAuth callback handler', auth: 'OAuth' },
          ],
        },
        users: {
          description: 'User management endpoints (All require JWT authentication)',
          endpoints: [
            { method: 'POST', path: '/users', description: 'Create a new user', auth: 'JWT + Create Users Permission' },
            { method: 'GET', path: '/users', description: 'Get all users', auth: 'JWT + View Users Permission' },
            { method: 'GET', path: '/users/:id', description: 'Get user by ID', auth: 'JWT + View Users Permission' },
            { method: 'PUT', path: '/users/:id', description: 'Update user details (own profile or admin)', auth: 'JWT + Edit Users Permission or Own Profile' },
            { method: 'PATCH', path: '/users/:id/role', description: 'Update user role', auth: 'JWT + Admin Role' },
            { method: 'PATCH', path: '/users/:id/permissions', description: 'Update user permissions', auth: 'JWT + Edit Users Permission' },
            { method: 'DELETE', path: '/users/:id', description: 'Delete user', auth: 'JWT + Delete Users Permission' },
          ],
        },
        inventory: {
          description: 'Inventory management endpoints (All require JWT authentication)',
          endpoints: [
            { method: 'POST', path: '/inventory', description: 'Create new inventory item (supports image upload)', auth: 'JWT + Create Inventory Permission' },
            { method: 'GET', path: '/inventory', description: 'Get all inventory items', auth: 'JWT + View Inventory Permission' },
            { method: 'GET', path: '/inventory/:id', description: 'Get inventory item by ID', auth: 'JWT + View Inventory Permission' },
            { method: 'PATCH', path: '/inventory/:id', description: 'Update inventory item (supports image upload)', auth: 'JWT + Update Inventory Permission' },
            { method: 'DELETE', path: '/inventory/:id', description: 'Delete inventory item', auth: 'JWT + Delete Inventory Permission' },
          ],
        },
        materials: {
          description: 'Material management endpoints (All require JWT authentication)',
          endpoints: [
            { method: 'POST', path: '/materials', description: 'Create new material', auth: 'JWT + Create Material Permission' },
            { method: 'GET', path: '/materials', description: 'Get all materials', auth: 'JWT + View Material Permission' },
            { method: 'GET', path: '/materials/:id', description: 'Get material by ID', auth: 'JWT + View Material Permission' },
            { method: 'PATCH', path: '/materials/:id', description: 'Update material', auth: 'JWT + Update Material Permission' },
            { method: 'DELETE', path: '/materials/:id', description: 'Delete material', auth: 'JWT + Delete Material Permission' },
          ],
        },
        stocks: {
          description: 'Stock management endpoints (All require JWT authentication)',
          endpoints: [
            { method: 'POST', path: '/stocks', description: 'Create new stock entry', auth: 'JWT + Create Stock Permission' },
            { method: 'GET', path: '/stocks', description: 'Get all stock items', auth: 'JWT + View Stock Permission' },
            { method: 'GET', path: '/stocks/:id', description: 'Get stock item by ID', auth: 'JWT + View Stock Permission' },
            { method: 'PATCH', path: '/stocks/:id', description: 'Update stock item', auth: 'JWT + Update Stock Permission' },
            { method: 'DELETE', path: '/stocks/:id', description: 'Delete stock item', auth: 'JWT + Delete Stock Permission' },
          ],
        },
        orders: {
          description: 'Order management endpoints (All require JWT authentication)',
          endpoints: [
            { method: 'POST', path: '/orders', description: 'Create new order', auth: 'JWT + Create Orders Permission' },
            { method: 'GET', path: '/orders', description: 'Get all orders', auth: 'JWT + View Orders Permission' },
            { method: 'GET', path: '/orders/my-orders', description: 'Get current user\'s orders', auth: 'JWT + View Orders Permission' },
            { method: 'GET', path: '/orders/:id', description: 'Get order by ID', auth: 'JWT + View Orders Permission' },
            { method: 'PATCH', path: '/orders/:id', description: 'Update order', auth: 'JWT + Update Orders Permission' },
            { method: 'DELETE', path: '/orders/:id/cancel', description: 'Cancel order', auth: 'JWT + Delete Orders Permission' },
          ],
        },
        warehouses: {
          description: 'Warehouse management endpoints (All require JWT authentication)',
          endpoints: [
            { method: 'POST', path: '/warehouses', description: 'Create new warehouse', auth: 'JWT + Create Warehouse Permission' },
            { method: 'GET', path: '/warehouses', description: 'Get all warehouses', auth: 'JWT + View Warehouse Permission' },
            { method: 'GET', path: '/warehouses/:id', description: 'Get warehouse by ID', auth: 'JWT + View Warehouse Permission' },
            { method: 'PUT', path: '/warehouses/:id', description: 'Update warehouse', auth: 'JWT + Update Warehouse Permission' },
            { method: 'DELETE', path: '/warehouses/:id', description: 'Delete warehouse', auth: 'JWT + Delete Warehouse Permission' },
          ],
        },
        query: {
          description: 'Query/Contact management endpoints',
          endpoints: [
            { method: 'POST', path: '/query', description: 'Create new query (public endpoint)', auth: 'None' },
            { method: 'GET', path: '/query', description: 'Get all queries', auth: 'JWT + View Users Permission' },
            { method: 'GET', path: '/query/:id', description: 'Get query by ID', auth: 'JWT + View Users Permission' },
            { method: 'PATCH', path: '/query/:id/status', description: 'Update query status', auth: 'JWT + Edit Users Permission' },
            { method: 'DELETE', path: '/query/:id', description: 'Delete query', auth: 'JWT + Delete Users Permission' },
          ],
        },
      },
      notes: [
        'Most endpoints require JWT authentication via Bearer token in Authorization header',
        'Permission-based access control is implemented using CASL',
        'Inventory endpoints support multipart/form-data for image uploads (max 5MB)',
        'OAuth authentication redirects to frontend with tokens in query parameters',
      ],
      status: 'Server is running successfully! ',
      timestamp: new Date().toISOString(),
    };
  }
}
