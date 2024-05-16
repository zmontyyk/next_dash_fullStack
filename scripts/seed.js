const {
  invoices,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');
const  clientPromise  = require('../clientPromise.js')

async function seedUsers(db) {
  try {
    const usersCollection = db.collection('users');
    const hashedUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return { ...user, password: hashedPassword };
    }));
    const result = await usersCollection.insertMany(hashedUsers);
    console.log(`Seeded ${result.insertedCount} users`);
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

async function seedInvoices(db) {
  try {
    const invoicesCollection = db.collection('invoices');
    const result = await invoicesCollection.insertMany(invoices, { ordered: false });
    console.log(`Seeded ${result.insertedCount} invoices`);
  } catch (error) {
    console.error('Error seeding invoices:', error);
  }
}

async function seedCustomers(db) {
  try {
    const customersCollection = db.collection('customers');
    const result = await customersCollection.insertMany(customers, { ordered: false });
    console.log(`Seeded ${result.insertedCount} customers`);
  } catch (error) {
    console.error('Error seeding customers:', error);
  }
}

async function seedRevenue(db) {
  try {
    const revenueCollection = db.collection('revenue');
    const result = await revenueCollection.insertMany(revenue, { ordered: false });
    console.log(`Seeded ${result.insertedCount} revenue`);
  } catch (error) {
    console.error('Error seeding revenue:', error);
  }
}

async function main() {

  try {

   const client = await clientPromise()
   const db = client.db("next_full_stack");
    await seedUsers(db);
    await seedCustomers(db);
    await seedInvoices(db);
    await seedRevenue(db);
  } catch (err) {
   console.log(err);
  }
}

main();
