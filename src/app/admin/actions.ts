'use server';

import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { revalidatePath } from 'next/cache';

function revalidateAll() {
  revalidatePath('/admin', 'layout');
  revalidatePath('/shop', 'layout');
  revalidatePath('/', 'layout');
}

let prismaInstance: PrismaClient;

function getPrisma() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
}

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file uploaded');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const filepath = join(process.cwd(), 'public/images', filename);
    
    await writeFile(filepath, buffer);
    
    return { success: true, url: `/images/${filename}` };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getDashboardStats() {
  try {
    const prisma = getPrisma();
    const totalOrders = await prisma.order.count();
    const totalProducts = await prisma.product.count();
    
    const orders = await prisma.order.findMany({
      select: { totalAmount: true }
    });
    const totalRevenueUsd = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return {
      totalOrders,
      totalProducts,
      totalRevenueUsd,
      recentOrders,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      totalOrders: 0,
      totalProducts: 0,
      totalRevenueUsd: 0,
      recentOrders: [],
    };
  }
}

export async function getAdminOrders() {
  try {
    const prisma = getPrisma();
    return await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
  } catch (error) {
    console.error("Failed to fetch admin orders:", error);
    return [];
  }
}

export async function getAdminProducts() {
  try {
    const prisma = getPrisma();
    return await prisma.product.findMany({
      include: {
        category: true,
        subcategory: true
      },
      orderBy: { id: 'asc' }
    });
  } catch (error) {
    console.error("Failed to fetch admin products:", error);
    return [];
  }
}

export async function getAdminCategories() {
  try {
    const prisma = getPrisma();
    return await prisma.category.findMany({
      include: {
        subcategories: true
      },
      orderBy: { id: 'asc' }
    });
  } catch (error) {
    console.error("Failed to fetch admin categories:", error);
    return [];
  }
}

export async function createCategory(data: { name: string; slug: string }) {
  try {
    const prisma = getPrisma();
    const category = await prisma.category.create({ data });
    revalidateAll();
    return { success: true, category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createSubcategory(data: { name: string; slug: string; categoryId: number }) {
  try {
    const prisma = getPrisma();
    const subcategory = await prisma.subcategory.create({ data });
    revalidateAll();
    return { success: true, subcategory };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategory(id: number, data: { name: string; slug: string }) {
  try {
    const prisma = getPrisma();
    const category = await prisma.category.update({ where: { id }, data });
    revalidateAll();
    return { success: true, category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: number) {
  try {
    const prisma = getPrisma();
    // Check if category has products
    const productCount = await prisma.product.count({ where: { categoryId: id } });
    if (productCount > 0) {
      return { success: false, error: `Cannot delete category because it contains ${productCount} products.` };
    }
    await prisma.category.delete({ where: { id } });
    revalidateAll();
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2025') {
      revalidateAll();
      return { success: true };
    }
    return { success: false, error: error.message };
  }
}

export async function updateSubcategory(id: number, data: { name: string; slug: string }) {
  try {
    const prisma = getPrisma();
    const subcategory = await prisma.subcategory.update({ where: { id }, data });
    revalidateAll();
    return { success: true, subcategory };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSubcategory(id: number) {
  try {
    const prisma = getPrisma();
    const productCount = await prisma.product.count({ where: { subcategoryId: id } });
    if (productCount > 0) {
      return { success: false, error: `Cannot delete subcategory because it contains ${productCount} products.` };
    }
    await prisma.subcategory.delete({ where: { id } });
    revalidateAll();
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2025') {
      revalidateAll();
      return { success: true };
    }
    return { success: false, error: error.message };
  }
}

export async function createProduct(data: {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  priceUsd?: number;
  priceMdl?: number;
  region: 'US' | 'MD' | 'BOTH';
  categoryId: number;
  subcategoryId?: number;
}) {
  try {
    const prisma = getPrisma();
    // If subcategoryId is -1 or null, we shouldn't pass it.
    const productData: any = { ...data };
    if (!productData.subcategoryId || productData.subcategoryId < 0) {
      delete productData.subcategoryId;
    }
    const product = await prisma.product.create({ data: productData });
    revalidateAll();
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: number, data: any) {
  try {
    const prisma = getPrisma();
    const productData = { ...data };
    if (!productData.subcategoryId || productData.subcategoryId <= 0) {
      productData.subcategoryId = null; // Disconnect subcategory if null
    }
    const product = await prisma.product.update({
      where: { id },
      data: productData
    });
    revalidateAll();
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: number) {
  try {
    const prisma = getPrisma();
    // Check if product is referenced in any orders
    const orderCount = await prisma.orderItem.count({
      where: { productId: id }
    });
    
    if (orderCount > 0) {
      return { success: false, error: `Cannot delete product because it has been ordered ${orderCount} times. Delete the orders first.` };
    }

    await prisma.product.delete({
      where: { id }
    });
    revalidateAll();
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2025') {
      revalidateAll();
      return { success: true };
    }
    return { success: false, error: error.message };
  }
}

export async function getProduct(id: number) {
  try {
    const prisma = getPrisma();
    return await prisma.product.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}
