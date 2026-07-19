'use client';

import { useState, useEffect } from 'react';
import { getAdminCategories, createCategory, createSubcategory, updateCategory, deleteCategory, updateSubcategory, deleteSubcategory } from '../actions';
import { Plus, FolderTree, Tag, Edit2, Trash2, Check, X } from 'lucide-react';
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

  // Edit states
  const [editingCatId, setEditingCatId] = useState<number | null>(null);
  const [editCatName, setEditCatName] = useState('');
  const [editCatSlug, setEditCatSlug] = useState('');

  const [editingSubId, setEditingSubId] = useState<number | null>(null);
  const [editSubName, setEditSubName] = useState('');
  const [editSubSlug, setEditSubSlug] = useState('');

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

  async function handleEditCatSave(id: number) {
    if (!editCatName || !editCatSlug) return;
    const res = await updateCategory(id, { name: editCatName, slug: editCatSlug });
    if (res.success) {
      setEditingCatId(null);
      fetchCategories();
      router.refresh();
    } else alert("Failed to update category: " + res.error);
  }

  async function handleDeleteCat(id: number) {
    if (!confirm("Are you sure you want to delete this category?")) return;
    const res = await deleteCategory(id);
    if (res.success) {
      fetchCategories();
      router.refresh();
    } else alert("Failed to delete category:\n" + res.error);
  }

  async function handleEditSubSave(id: number) {
    if (!editSubName || !editSubSlug) return;
    const res = await updateSubcategory(id, { name: editSubName, slug: editSubSlug });
    if (res.success) {
      setEditingSubId(null);
      fetchCategories();
      router.refresh();
    } else alert("Failed to update subcategory: " + res.error);
  }

  async function handleDeleteSub(id: number) {
    if (!confirm("Are you sure you want to delete this subcategory?")) return;
    const res = await deleteSubcategory(id);
    if (res.success) {
      fetchCategories();
      router.refresh();
    } else alert("Failed to delete subcategory:\n" + res.error);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-white tracking-[0.3em] uppercase">Categories</h1>
        <p className="text-white/40 mt-1 uppercase tracking-[0.1em] text-xs font-medium">Manage your catalog categories and subcategories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category List */}
        <div className="bg-[#000] border border-white/10 rounded-[2rem] p-4 md:p-8 shadow-[0_0_20px_rgba(0,51,255,0.05)] h-fit">
          <h2 className="text-sm font-black text-white mb-6 flex items-center gap-2 uppercase tracking-[0.2em]">
            <FolderTree className="h-4 w-4 text-[#0033FF]" />
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
                <div key={cat.id} className="border border-white/10 rounded-2xl p-4 bg-white/5 transition-colors duration-500 hover:border-[#0033FF]/30">
                  <div className="flex items-center justify-between font-black text-white text-sm uppercase tracking-[0.1em]">
                    {editingCatId === cat.id ? (
                      <div className="flex items-center gap-2 flex-1 mr-4">
                        <input value={editCatName} onChange={e => setEditCatName(e.target.value)} className="bg-[#050505] border border-white/20 rounded px-3 py-1 text-xs w-1/2 focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF] outline-none transition-colors" placeholder="Name" />
                        <input value={editCatSlug} onChange={e => setEditCatSlug(e.target.value)} className="bg-[#050505] border border-white/20 rounded px-3 py-1 text-xs w-1/2 font-mono focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF] outline-none transition-colors" placeholder="Slug" />
                      </div>
                    ) : (
                      <span>{cat.name} <span className="text-xs text-slate-500 font-mono font-normal ml-2">/{cat.slug}</span></span>
                    )}
                    
                    <div className="flex gap-2">
                      {editingCatId === cat.id ? (
                        <>
                          <button onClick={() => handleEditCatSave(cat.id)} className="p-1.5 text-green-400 hover:bg-white/10 rounded transition-colors"><Check className="h-4 w-4" /></button>
                          <button onClick={() => setEditingCatId(null)} className="p-1.5 text-white/40 hover:bg-white/10 rounded transition-colors"><X className="h-4 w-4" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setEditingCatId(cat.id); setEditCatName(cat.name); setEditCatSlug(cat.slug); }} className="p-1.5 text-[#0033FF] hover:bg-white/10 rounded transition-colors"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => handleDeleteCat(cat.id)} className="p-1.5 text-red-500 hover:bg-white/10 rounded transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </>
                      )}
                    </div>
                  </div>
                  {cat.subcategories.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-white/10 space-y-2">
                      {cat.subcategories.map(sub => (
                        <div key={sub.id} className="flex items-center justify-between text-xs text-white/60 hover:bg-white/5 p-2 rounded-lg group transition-colors duration-300">
                          {editingSubId === sub.id ? (
                            <div className="flex items-center gap-2 flex-1 mr-2">
                              <input value={editSubName} onChange={e => setEditSubName(e.target.value)} className="bg-[#050505] border border-white/20 rounded px-2 py-1 text-xs w-1/2 focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF] outline-none" placeholder="Name" />
                              <input value={editSubSlug} onChange={e => setEditSubSlug(e.target.value)} className="bg-[#050505] border border-white/20 rounded px-2 py-1 text-xs w-1/2 font-mono focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF] outline-none" placeholder="Slug" />
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Tag className="h-3 w-3 mr-2 text-slate-500" />
                              {sub.name} <span className="text-xs text-slate-600 font-mono ml-2">/{sub.slug}</span>
                            </div>
                          )}
                          
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {editingSubId === sub.id ? (
                              <>
                                <button onClick={() => handleEditSubSave(sub.id)} className="p-1 text-green-400 hover:bg-white/10 rounded"><Check className="h-3 w-3" /></button>
                                <button onClick={() => setEditingSubId(null)} className="p-1 text-slate-400 hover:bg-white/10 rounded"><X className="h-3 w-3" /></button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => { setEditingSubId(sub.id); setEditSubName(sub.name); setEditSubSlug(sub.slug); }} className="p-1 text-blue-400 hover:bg-white/10 rounded"><Edit2 className="h-3 w-3" /></button>
                                <button onClick={() => handleDeleteSub(sub.id)} className="p-1 text-red-400 hover:bg-white/10 rounded"><Trash2 className="h-3 w-3" /></button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Add Category Form */}
          <div className="bg-[#000] border border-white/10 rounded-[2rem] p-4 md:p-8 shadow-[0_0_20px_rgba(0,51,255,0.05)]">
            <h2 className="text-sm font-black text-white mb-6 uppercase tracking-[0.2em]">Add Parent Category</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-[0.1em]">Name</label>
                <input 
                  type="text" 
                  required
                  value={catName} 
                  onChange={e => setCatName(e.target.value)} 
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF] outline-none transition-colors" 
                  placeholder="e.g. Seafood"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-[0.1em]">Slug</label>
                <input 
                  type="text" 
                  required
                  value={catSlug} 
                  onChange={e => setCatSlug(e.target.value)} 
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF] outline-none font-mono transition-colors" 
                  placeholder="e.g. seafood"
                />
              </div>
              <button type="submit" className="w-full bg-[#0033FF] hover:bg-[#0033FF]/80 text-white font-black uppercase tracking-[0.2em] rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(0,51,255,0.4)]">
                <Plus className="h-4 w-4" /> Add Category
              </button>
            </form>
          </div>

          {/* Add Subcategory Form */}
          <div className="bg-[#000] border border-white/10 rounded-[2rem] p-4 md:p-8 shadow-[0_0_20px_rgba(0,51,255,0.05)]">
            <h2 className="text-sm font-black text-white mb-6 uppercase tracking-[0.2em]">Add Subcategory</h2>
            <form onSubmit={handleAddSubcategory} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-[0.1em]">Parent Category</label>
                <select 
                  value={selectedParentId} 
                  onChange={e => setSelectedParentId(Number(e.target.value))}
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF] outline-none transition-colors"
                >
                  <option value={0} disabled>Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-[0.1em]">Name</label>
                <input 
                  type="text" 
                  required
                  value={subName} 
                  onChange={e => setSubName(e.target.value)} 
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF] outline-none transition-colors" 
                  placeholder="e.g. Smoked Fish"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-white/40 mb-2 uppercase tracking-[0.1em]">Slug</label>
                <input 
                  type="text" 
                  required
                  value={subSlug} 
                  onChange={e => setSubSlug(e.target.value)} 
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0033FF] focus:ring-1 focus:ring-[#0033FF] outline-none font-mono transition-colors" 
                  placeholder="e.g. smoked-fish"
                />
              </div>
              <button type="submit" disabled={!selectedParentId} className="w-full bg-[#0033FF] hover:bg-[#0033FF]/80 text-white font-black uppercase tracking-[0.2em] rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(0,51,255,0.4)] disabled:opacity-50 disabled:shadow-none">
                <Plus className="h-4 w-4" /> Add Subcategory
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
