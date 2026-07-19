'use server';

import { PrismaClient } from '@prisma/client';

let prismaInstance: PrismaClient;

function getPrisma() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
}
export async function getShopData() {
  try {
    const prisma = getPrisma();
    const categories = await prisma.category.findMany();
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    });
    return { categories, products };
  } catch (error) {
    console.error("Failed to fetch shop data (perhaps DB is not seeded):", error);
    return { categories: [], products: [] };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const prisma = getPrisma();
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true }
    });
    return product;
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    return null;
  }
}
