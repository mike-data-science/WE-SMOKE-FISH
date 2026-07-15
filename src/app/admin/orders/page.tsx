import { getAdminOrders } from '../actions';
import { Search, Filter } from 'lucide-react';

export default async function AdminOrders() {
  const orders = await getAdminOrders();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Orders Management</h1>
          <p className="text-slate-400 mt-1">View and manage all customer orders.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="h-10 pl-10 pr-4 rounded-lg bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-2 backdrop-blur-sm">
        {orders.length === 0 ? (
          <div className="text-center py-20 text-slate-500 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-lg font-medium text-slate-400">No orders yet</p>
            <p className="text-sm">When customers place orders, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium rounded-tl-lg">Order Details</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Items</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium text-right rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-mono text-white">#{order.id.toString().padStart(5, '0')}</div>
                      <div className="text-xs text-slate-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{order.customerName}</div>
                      <div className="text-xs text-slate-400 mt-1">{order.email}</div>
                      <div className="mt-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${order.region === 'US' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                          {order.region}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-300">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-[200px]">
                        {order.items.map(i => i.product.name).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {order.region === 'MD' ? `${order.totalAmount} MDL` : `$${order.totalAmount.toFixed(2)}`}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {order.status}
                      </span>
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
