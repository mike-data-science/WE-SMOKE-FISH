import { getShopData } from "./actions";
import ShopClient from "./ShopClient";

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const { categories, products } = await getShopData();

  return (
    <div className="flex-1 w-full bg-background transition-colors duration-500">
      <ShopClient categories={categories} products={products} />
    </div>
  );
}
