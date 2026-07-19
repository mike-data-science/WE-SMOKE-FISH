'use client';

import { useState, useEffect } from 'react';
import { getAdminCategories, updateProduct, uploadImage, getProduct } from '../../actions';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Subcategory = { id: number; name: string; };
type Category = { id: number; name: string; subcategories: Subcategory[] };

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const [categories, setCategories] = useState<Category[]>([]);
  
  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [priceUsd, setPriceUsd] = useState('');
  const [priceMdl, setPriceMdl] = useState('');
  const [region, setRegion] = useState<'US' | 'MD' | 'BOTH'>('BOTH');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [subcategoryId, setSubcategoryId] = useState<number>(0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const cats = await getAdminCategories();
      setCategories(cats);

      if (!isNaN(productId)) {
        const product = await getProduct(productId);
        if (product) {
          setName(product.name);
          setSlug(product.slug);
          setDescription(product.description || '');
          setCurrentImageUrl(product.imageUrl || '');
          setPriceUsd(product.priceUsd ? product.priceUsd.toString() : '');
          setPriceMdl(product.priceMdl ? product.priceMdl.toString() : '');
          setRegion(product.region);
          setCategoryId(product.categoryId);
          setSubcategoryId(product.subcategoryId || 0);
        } else {
          alert("Product not found");
          router.push('/admin/products');
        }
      }
      setIsLoading(false);
    }
    loadData();
  }, [productId, router]);

  const activeCategory = categories.find(c => c.id === categoryId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !slug || !categoryId) return;
    
    setIsSubmitting(true);
    let uploadedImageUrl = currentImageUrl;
    
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

    const res = await updateProduct(productId, {
      name,
      slug,
      description,
      imageUrl: uploadedImageUrl,
      priceUsd: priceUsd ? parseFloat(priceUsd) : null,
      priceMdl: priceMdl ? parseFloat(priceMdl) : null,
      region,
      categoryId,
      subcategoryId: subcategoryId || undefined
    });
    
    setIsSubmitting(false);

    if (res.success) {
      window.location.href = '/admin/products';
    } else {
      alert("Failed to update product: " + res.error);
    }
  }

  if (isLoading) {
    return <div className="text-white">Loading product details...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Edit Product</h1>
          <p className="text-slate-400 mt-1">Update your catalog item.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Product Name *</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">URL Slug *</label>
            <input required type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white font-mono focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-blue-500 outline-none"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Product Image</label>
          {currentImageUrl && !imageFile && (
            <div className="mb-4 w-32 h-32 rounded-lg border border-white/10 overflow-hidden bg-black">
              <img src={currentImageUrl.split(',')[0]} alt="Current" className="w-full h-full object-cover" />
            </div>
          )}
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
              <option value={0} disabled>Select Category</option>
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
            {isSubmitting ? 'Saving...' : <><Save className="h-5 w-5" /> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
}
