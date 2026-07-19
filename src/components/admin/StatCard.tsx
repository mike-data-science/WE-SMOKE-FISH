import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  gradient?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp, gradient }: StatCardProps) {
  const defaultGradient = "from-[#050505] to-[#000]";
  const bgClass = gradient ? `bg-gradient-to-br ${gradient}` : `bg-[#000]`;
  const isVibrant = !!gradient;

  return (
    <div className={`${bgClass} border border-white/10 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500`}>
      <div className={`absolute -top-6 -right-6 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${isVibrant ? 'text-white' : 'text-[#0033FF]'}`}>
        <Icon className="h-32 w-32" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border transition-colors duration-500 ${isVibrant ? 'bg-white/20 border-white/30 text-white' : 'bg-[#0033FF]/10 border-[#0033FF]/20 text-[#0033FF]'}`}>
            <Icon className="h-5 w-5" />
          </div>
          <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${isVibrant ? 'text-white/80' : 'text-white/40'}`}>{title}</h3>
        </div>
        <div className="flex items-baseline gap-4 mt-2">
          <h2 className={`text-4xl md:text-5xl font-black tracking-tighter ${isVibrant ? 'text-white' : 'text-white'}`}>{value}</h2>
          {trend && (
            <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${trendUp ? (isVibrant ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-400') : (isVibrant ? 'bg-white/20 text-white' : 'bg-rose-500/10 text-rose-400')}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
