'use client';

import { useState, useEffect } from 'react';
import { getAdminCategories, createCategory, createSubcategory } from '../actions';
import { Plus, FolderTree, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Subcategory = { id: number; name: string; slug: string; categoryId: number };
type Category = { id: number; name: string; slug: string; subcategories: Subcategory[] };

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [subName, setSubName] = useState('');
  const [subSlug, setSubSlug] = useState('');
  const [selectedParentId, setSelectedParentId] = useState<number>(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const data = await getAdminCategories();
    setCategories(data);
    if (data.length > 0 && selectedParentId === 0) {
      setSelectedParentId(data[0].id);
    }
    setLoading(false);
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!catName || !catSlug) return;
    const res = await createCategory({ name: catName, slug: catSlug });
    if (res.success) {
      setCatName('');
      setCatSlug('');
      fetchCategories();
      router.refresh();
    } else {
      alert("Failed to create category: " + res.error);
    }
  }

  async function handleAddSubcategory(e: React.FormEvent) {
    e.preventDefault();
    if (!subName || !subSlug || !selectedParentId) return;
    const res = await createSubcategory({ name: subName, slug: subSlug, categoryId: selectedParentId });
    if (res.success) {
      setSubName('');
      setSubSlug('');
      fetchCategories();
      router.refresh();
    } else {
      alert("Failed to create subcategory: " + res.error);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Categories</h1>
        <p className="text-slate-400 mt-1">Manage your catalog categories and subcategories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category List */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm h-fit">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FolderTree className="h-5 w-5 text-blue-400" />
            Category Tree
          </h2>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-white/5 rounded w-full"></div>
              <div className="h-8 bg-white/5 rounded w-full"></div>
            </div>
          ) : categories.length === 0 ? (
            <p className="text-slate-500">No categories found.</p>
          ) : (
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.id} className="border border-white/10 rounded-xl p-4 bg-white/5">
                  <div className="flex items-center justify-between font-bold text-white text-lg">
                    <span>{cat.name} <span className="text-xs text-slate-500 font-mono font-normal ml-2">/{cat.slug}</span></span>
                  </div>
                  {cat.subcategories.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-white/10 space-y-2">
                      {cat.subcategories.map(sub => (
                        <div key={sub.id} className="flex items-center text-sm text-slate-300">
                          <Tag className="h-3 w-3 mr-2 text-slate-500" />
                          {sub.name} <span className="text-xs text-slate-600 font-mono ml-2">/{sub.slug}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Forms */}
        <div className="space-y-8">
          {/* Add Category Form */}
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-4">Add Parent Category</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  value={catName} 
                  onChange={e => setCatName(e.target.value)} 
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Seafood"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Slug</label>
                <input 
                  type="text" 
                  required
                  value={catSlug} 
                  onChange={e => setCatSlug(e.target.value)} 
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-blue-500 outline-none font-mono" 
                  placeholder="e.g. seafood"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition-colors">
                <Plus className="h-4 w-4" /> Add Category
              </button>
            </form>
          </div>

          {/* Add Subcategory Form */}
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-4">Add Subcategory</h2>
            <form onSubmit={handleAddSubcategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Parent Category</label>
                <select 
                  value={selectedParentId} 
                  onChange={e => setSelectedParentId(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value={0} disabled>Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  value={subName} 
                  onChange={e => setSubName(e.target.value)} 
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-blue-500 outline-none" 
                  placeholder="e.g. Smoked Fish"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Slug</label>
                <input 
                  type="text" 
                  required
                  value={subSlug} 
                  onChange={e => setSubSlug(e.target.value)} 
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-blue-500 outline-none font-mono" 
                  placeholder="e.g. smoked-fish"
                />
              </div>
              <button type="submit" disabled={!selectedParentId} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                <Plus className="h-4 w-4" /> Add Subcategory
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
