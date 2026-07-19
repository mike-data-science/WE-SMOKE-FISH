import { getAdminOrders } from '../actions';
import { Search, Filter } from 'lucide-react';

export default async function AdminOrders() {
  const orders = await getAdminOrders();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-[0.3em] uppercase">Orders Management</h1>
          <p className="text-white/40 mt-1 uppercase tracking-[0.1em] text-xs font-medium">View and manage all customer orders.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0033FF]" />
            <input 
              type="text" 
              placeholder="SEARCH ORDERS..." 
              className="h-10 pl-10 pr-4 rounded-xl bg-[#050505] border border-white/10 text-xs font-medium tracking-wider text-white focus:outline-none focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF] transition-all w-full md:w-64 placeholder-white/30"
            />
          </div>
          <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-[#050505] border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:bg-[#0033FF]/10 hover:border-[#0033FF]/30 hover:text-[#0033FF] transition-colors w-full sm:w-auto">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-[#000] border border-white/10 rounded-[2rem] p-4 md:p-8 shadow-[0_0_20px_rgba(0,51,255,0.05)]">
        {orders.length === 0 ? (
          <div className="text-center py-20 text-white/50 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-[#050505] border border-[#0033FF]/20 flex items-center justify-center mb-4">
              <span className="text-2xl opacity-50">📦</span>
            </div>
            <p className="text-xs uppercase tracking-[0.1em] font-black">No orders yet</p>
            <p className="text-[10px] uppercase tracking-wider mt-1 opacity-50">When customers place orders, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black border-b border-white/10 bg-white/5">
                <tr>
                  <th className="px-6 py-4 rounded-tl-lg">Order Details</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4 text-right rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-mono text-white text-xs uppercase tracking-wider">#{order.id.toString().padStart(5, '0')}</div>
                      <div className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-black text-xs uppercase tracking-wider">{order.customerName}</div>
                      <div className="text-[10px] text-white/40 mt-1">{order.email}</div>
                      <div className="mt-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${order.region === 'US' ? 'bg-[#0033FF]/10 text-[#0033FF] border-[#0033FF]/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                          {order.region}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white/70 text-xs font-black uppercase tracking-wider">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </div>
                      <div className="text-[10px] text-white/40 mt-1 line-clamp-1 max-w-[200px] uppercase tracking-wider">
                        {order.items.map(i => i.product.name).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-white text-xs">
                      {order.region === 'MD' ? `${order.totalAmount} MDL` : `$${order.totalAmount.toFixed(2)}`}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
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
