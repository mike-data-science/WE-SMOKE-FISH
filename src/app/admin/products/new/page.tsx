'use client';

import { useState, useEffect } from 'react';
import { getAdminCategories, createProduct, uploadImage } from '../../actions';
import { useRouter } from 'next/navigation';
import { PackagePlus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Subcategory = { id: number; name: string; };
type Category = { id: number; name: string; subcategories: Subcategory[] };

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [priceUsd, setPriceUsd] = useState('');
  const [priceMdl, setPriceMdl] = useState('');
  const [region, setRegion] = useState<'US' | 'MD' | 'BOTH'>('BOTH');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [subcategoryId, setSubcategoryId] = useState<number>(0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAdminCategories().then(data => {
      setCategories(data);
      if (data.length > 0) setCategoryId(data[0].id);
    });
  }, []);

  const activeCategory = categories.find(c => c.id === categoryId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !slug || !categoryId) return;
    
    setIsSubmitting(true);
    let uploadedImageUrl = '';
    
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      const uploadRes = await uploadImage(formData);
      if (uploadRes.success && uploadRes.url) {
        uploadedImageUrl = uploadRes.url;
      } else {
        alert("Image upload failed: " + uploadRes.error);
        setIsSubmitting(false);
        return;
      }
    }

    const res = await createProduct({
      name,
      slug,
      description,
      imageUrl: uploadedImageUrl,
      priceUsd: priceUsd ? parseFloat(priceUsd) : undefined,
      priceMdl: priceMdl ? parseFloat(priceMdl) : undefined,
      region,
      categoryId,
      subcategoryId: subcategoryId || undefined
    });
    
    setIsSubmitting(false);

    if (res.success) {
      router.push('/admin/products');
      router.refresh();
    } else {
      alert("Failed to create product: " + res.error);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Add New Product</h1>
          <p className="text-slate-400 mt-1">Create a new item in your catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Product Name *</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none" placeholder="e.g. Cold-Smoked Mackerel" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">URL Slug *</label>
            <input required type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white font-mono focus:ring-1 focus:ring-blue-500 outline-none" placeholder="e.g. cold-smoked-mackerel" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Product description..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Product Image</label>
          <input type="file" accept="image/*" onChange={e => e.target.files && setImageFile(e.target.files[0])} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-white/10 py-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Region Availability *</label>
            <select value={region} onChange={e => setRegion(e.target.value as any)} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none">
              <option value="BOTH">Both (US & MD)</option>
              <option value="US">United States Only</option>
              <option value="MD">Moldova Only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Price in USD</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input type="number" step="0.01" value={priceUsd} onChange={e => setPriceUsd(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg pl-8 pr-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none" placeholder="0.00" disabled={region === 'MD'} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Price in MDL</label>
            <div className="relative">
              <input type="number" step="0.01" value={priceMdl} onChange={e => setPriceMdl(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none" placeholder="0.00" disabled={region === 'US'} />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs">MDL</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Category *</label>
            <select value={categoryId} onChange={e => { setCategoryId(Number(e.target.value)); setSubcategoryId(0); }} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none">
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Subcategory</label>
            <select value={subcategoryId} onChange={e => setSubcategoryId(Number(e.target.value))} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none" disabled={!activeCategory || activeCategory.subcategories.length === 0}>
              <option value={0}>None</option>
              {activeCategory?.subcategories.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg px-8 py-3 flex items-center justify-center gap-2 transition-all disabled:opacity-50">
            {isSubmitting ? 'Creating...' : <><PackagePlus className="h-5 w-5" /> Create Product</>}
          </button>
        </div>
      </form>
    </div>
  );
}
