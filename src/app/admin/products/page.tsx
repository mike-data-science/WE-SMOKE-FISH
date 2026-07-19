import { getAdminProducts } from '../actions';
import { Search, Plus } from 'lucide-react';
import Link from 'next/link';
import ProductActions from '@/components/admin/ProductActions';

export default async function AdminProducts() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-[0.3em] uppercase">Products</h1>
          <p className="text-white/40 mt-1 uppercase tracking-[0.1em] text-xs font-medium">Manage your catalog across all regions.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0033FF]" />
            <input 
              type="text" 
              placeholder="SEARCH PRODUCTS..." 
              className="h-10 pl-10 pr-4 rounded-xl bg-[#050505] border border-white/10 text-xs font-medium tracking-wider text-white focus:outline-none focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF] transition-all w-full md:w-64 placeholder-white/30"
            />
          </div>
          <Link href="/admin/products/new" className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-[#0033FF] text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#0033FF]/80 transition-colors shadow-[0_0_15px_rgba(0,51,255,0.3)] w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      <div className="bg-[#000] border border-white/10 rounded-[2rem] p-4 md:p-8 shadow-[0_0_20px_rgba(0,51,255,0.05)]">
        {products.length === 0 ? (
          <div className="text-center py-20 text-white/50 uppercase tracking-[0.1em] text-xs font-black">
            No products found. Please seed the database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 rounded-tl-lg">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Region</th>
                  <th className="px-6 py-4">Price (USD)</th>
                  <th className="px-6 py-4">Price (MDL)</th>
                  <th className="px-6 py-4 text-right rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-[#050505] overflow-hidden flex-shrink-0 border border-white/10">
                          {product.imageUrl ? (
                            <img src={product.imageUrl.split(',')[0]} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full bg-[#050505]" />
                          )}
                        </div>
                        <div>
                          <div className="text-white font-black uppercase tracking-wider text-xs">{product.name}</div>
                          <div className="text-[10px] text-white/50 font-mono mt-1 uppercase tracking-wider">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/70 font-medium text-xs uppercase tracking-wider">
                      {product.category?.name || 'Uncategorized'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${
                        product.region === 'BOTH' ? 'bg-[#0033FF]/10 text-[#0033FF] border-[#0033FF]/30' :
                        product.region === 'US' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {product.region}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white font-black text-xs">
                      {product.priceUsd ? `$${product.priceUsd.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-white font-black text-xs">
                      {product.priceMdl ? `${product.priceMdl} MDL` : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ProductActions productId={product.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
