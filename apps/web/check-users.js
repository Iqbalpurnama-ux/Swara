const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true }});
  console.log("Users:", users);
}

main().catch(console.error).finally(() => prisma.$disconnect());
