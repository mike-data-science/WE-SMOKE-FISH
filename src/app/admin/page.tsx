import { getDashboardStats } from './actions';
import StatCard from '@/components/admin/StatCard';
import { DollarSign, ShoppingCart, Package, TrendingUp } from 'lucide-react';

export default async function AdminOverview() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-white tracking-[0.3em] uppercase">Dashboard Overview</h1>
        <p className="text-white/40 mt-1 uppercase tracking-[0.1em] text-xs font-medium">Welcome back. Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue (USD)"
          value={`$${stats.totalRevenueUsd.toFixed(2)}`}
          icon={DollarSign}
          trend="12.5%"
          trendUp={true}
          gradient="from-[#FF007F] to-[#7928CA]"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          trend="5.2%"
          trendUp={true}
          gradient="from-[#00F2FE] to-[#4FACFE]"
        />
        <StatCard
          title="Active Products"
          value={stats.totalProducts}
          icon={Package}
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          icon={TrendingUp}
          trend="1.1%"
          trendUp={true}
        />
      </div>

      <div className="bg-[#000] border border-white/10 rounded-[2rem] p-4 md:p-8 shadow-[0_0_20px_rgba(0,51,255,0.05)]">
        <h2 className="text-sm font-black text-white mb-6 uppercase tracking-[0.2em]">Recent Orders</h2>
        
        {stats.recentOrders.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No orders found yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-white/40 uppercase tracking-[0.2em] bg-white/5 border-b border-white/10 font-black">
                <tr>
                  <th className="px-6 py-4 font-medium rounded-tl-lg">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Region</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium text-right rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-mono">#{order.id.toString().padStart(5, '0')}</td>
                    <td className="px-6 py-4 text-white font-medium">{order.customerName}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${order.region === 'US' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                        {order.region === 'US' ? '🇺🇸 USA' : '🇲🇩 Moldova'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
