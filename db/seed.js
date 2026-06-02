import db from "#db/client";
import { createEmployee } from "./queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO

  const employees = [
    { name: "Paula Nielson", birthday: "1985-03-12", salary: 84000 },
    { name: "Robert Smith", birthday: "1990-07-22", salary: 920000 },
    { name: "Stacy Uy", birthday: "1988-11-05", salary: 85000 },
    { name: "Gregory Umukoro", birthday: "1992-01-17", salary: 90000 },
    { name: "Kim Young", birthday: "1983-09-30", salary: 89000 },
    { name: "Jose Acosta", birthday: "1995-04-14", salary: 75000 },
    { name: "David Sun", birthday: "1987-06-09", salary: 79000 },
    { name: "Curtis Jones", birthday: "1991-12-02", salary: 69000 },
    { name: "Prince Khalifa", birthday: "1984-08-19", salary: 82000 },
    { name: "Judith Day", birthday: "1993-10-27", salary: 76000 },
  ];

  for (const emp of employees) {
    await createEmployee(emp);
  }
}
