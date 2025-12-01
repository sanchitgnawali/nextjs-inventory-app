import {PrismaClient} from './../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});

const prisma = new PrismaClient({adapter});

async function main() {
    const demoUserId = 'e1304d43-f16b-4fe4-bbfc-5d4dd66867ed';

    //create sample pruduct
    await prisma.product.createMany({
        data: Array.from({length: 25}).map((_, index) => ({
            userId: demoUserId,
            name: `Product ${index + 1}`,
            price: (Math.random() * 90 + 10).toFixed(2),
            quantity: Math.floor(Math.random() * 20),
            lowStockAt: 5,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 *24 * (index*5))
    }))});

    console.log('Seeding completed.');
    console
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });