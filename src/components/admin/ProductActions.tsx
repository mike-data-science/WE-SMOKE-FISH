'use client';

import { deleteProduct } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductActions({ productId }: { productId: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setIsDeleting(true);
    const res = await deleteProduct(productId);
    setIsDeleting(false);

    if (res.success) {
      router.refresh();
    } else {
      alert(res.error);
    }
  }

  return (
    <div className="flex items-center justify-end gap-3">
      <Link 
        href={`/admin/products/${productId}`} 
        className="text-[#0033FF] hover:text-[#0033FF]/70 font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
      >
        Edit
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-500 hover:text-red-400 font-black text-[10px] uppercase tracking-[0.2em] transition-colors disabled:opacity-50"
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
