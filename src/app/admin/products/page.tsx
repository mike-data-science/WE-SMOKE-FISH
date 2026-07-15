import { getAdminProducts } from '../actions';
import { Search, Plus } from 'lucide-react';
import Link from 'next/link';

export default async function AdminProducts() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Products</h1>
          <p className="text-slate-400 mt-1">Manage your catalog across all regions.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="h-10 pl-10 pr-4 rounded-lg bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full md:w-64"
            />
          </div>
          <Link href="/admin/products/new" className="flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-2 backdrop-blur-sm">
        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No products found. Please seed the database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium rounded-tl-lg">Product</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Region</th>
                  <th className="px-6 py-4 font-medium">Price (USD)</th>
                  <th className="px-6 py-4 font-medium">Price (MDL)</th>
                  <th className="px-6 py-4 font-medium text-right rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0 border border-white/10">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full bg-slate-800" />
                          )}
                        </div>
                        <div>
                          <div className="text-white font-medium">{product.name}</div>
                          <div className="text-xs text-slate-500 font-mono mt-0.5">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {product.category?.name || 'Uncategorized'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        product.region === 'BOTH' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        product.region === 'US' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {product.region}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {product.priceUsd ? `$${product.priceUsd.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {product.priceMdl ? `${product.priceMdl} MDL` : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-400 hover:text-blue-300 font-medium text-xs uppercase tracking-wider transition-colors">
                        Edit
                      </button>
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
