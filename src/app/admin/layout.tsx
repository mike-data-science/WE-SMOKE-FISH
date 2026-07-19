import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard | We Smoke Fish',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#050505] overflow-hidden text-white font-sans">
      {/* Presentation Style Dynamic Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[#0033FF]/20 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-[#0033FF]/10 blur-[120px]" />
      </div>
      
      {/* Sidebar */}
      <div className="relative z-10 h-full">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col h-full overflow-hidden w-full">
        <main className="flex-1 overflow-y-auto p-4 pt-20 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
