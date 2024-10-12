import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('tm_product').del();
    await knex('tm_category').del();
    await knex('tm_user').del();

    // Inserts seed entries
    await knex('tm_user').insert([
      { user_name: 'system', full_name: 'System', phone: '081910428876', password: '$2b$10$obCU9UxnJc5iTJ3XgPoHEOTMyTw5rfQI2WqKjv6uhC1H1R4glSKMi' },
      { user_name: 'user1', full_name: 'User Satu', phone: '081910428876', password: '$2b$10$obCU9UxnJc5iTJ3XgPoHEOTMyTw5rfQI2WqKjv6uhC1H1R4glSKMi' },
      { user_name: 'user2', full_name: 'User Dua', phone: '081910428876', password: '$2b$10$obCU9UxnJc5iTJ3XgPoHEOTMyTw5rfQI2WqKjv6uhC1H1R4glSKMi' },
      { user_name: 'user3', full_name: 'User Tiga', phone: '081910428876', password: '$2b$10$obCU9UxnJc5iTJ3XgPoHEOTMyTw5rfQI2WqKjv6uhC1H1R4glSKMi' },
      { user_name: 'user4', full_name: 'User Empat', phone: '081910428876', password: '$2b$10$obCU9UxnJc5iTJ3XgPoHEOTMyTw5rfQI2WqKjv6uhC1H1R4glSKMi' },
      { user_name: 'user5', full_name: 'User Lima', phone: '081910428876', password: '$2b$10$obCU9UxnJc5iTJ3XgPoHEOTMyTw5rfQI2WqKjv6uhC1H1R4glSKMi' },
      { user_name: 'user6', full_name: 'User Enam', phone: '081910428876', password: '$2b$10$obCU9UxnJc5iTJ3XgPoHEOTMyTw5rfQI2WqKjv6uhC1H1R4glSKMi' },
      { user_name: 'user7', full_name: 'User Tujuh', phone: '081910428876', password: '$2b$10$obCU9UxnJc5iTJ3XgPoHEOTMyTw5rfQI2WqKjv6uhC1H1R4glSKMi' },
      { user_name: 'user8', full_name: 'User Delapan', phone: '081910428876', password: '$2b$10$obCU9UxnJc5iTJ3XgPoHEOTMyTw5rfQI2WqKjv6uhC1H1R4glSKMi' },
      { user_name: 'user9', full_name: 'User Sembilan', phone: '081910428876', password: '$2b$10$obCU9UxnJc5iTJ3XgPoHEOTMyTw5rfQI2WqKjv6uhC1H1R4glSKMi' }
    ]);

    await knex('tm_category').insert([
      { category_name: 'Category Satu', created_id: 1, updated_id: 1 },
      { category_name: 'Category Dua', created_id: 1, updated_id: 1 },
      { category_name: 'Category Tiga', created_id: 1, updated_id: 1 },
    ]);

    await knex('tm_product').insert([
      { product_name: 'Product Satu', category_id: 1, qty: 100, price: 100000, created_id: 1, updated_id: 1 },
      { product_name: 'Product Dua', category_id: 1, qty: 100, price: 100000, created_id: 1, updated_id: 1 },
      { product_name: 'Product Tiga', category_id: 1, qty: 100, price: 100000, created_id: 1, updated_id: 1 },
      { product_name: 'Product Empat', category_id: 2, qty: 100, price: 200000, created_id: 1, updated_id: 1 },
      { product_name: 'Product Lima', category_id: 2, qty: 100, price: 200000, created_id: 1, updated_id: 1 },
      { product_name: 'Product Enam', category_id: 2, qty: 100, price: 200000, created_id: 1, updated_id: 1 },
      { product_name: 'Product Tujuh', category_id: 3, qty: 100, price: 300000, created_id: 1, updated_id: 1 },
      { product_name: 'Product Delapan', category_id: 3, qty: 100, price: 300000, created_id: 1, updated_id: 1 },
      { product_name: 'Product Sembilan', category_id: 3, qty: 100, price: 300000, created_id: 1, updated_id: 1 }
    ]);
};
