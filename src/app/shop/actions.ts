'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getShopData() {
  try {
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
