import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, X } from 'lucide-react';

const initialCategories = [
  { value: 'automotive', label: 'Automotive' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'branding', label: 'Branding' },
  { value: 'custom', label: 'Custom' },
];

const AddProductPage = () => {
  const [form, setForm] = useState({
    name: '',
    category: 'automotive',
    subcategory: '',
    images: [''],
    created: new Date().toISOString().slice(0, 10),
    description: '',
    specification: '',
    features: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '__add_new__') {
      setShowNewCategoryInput(true);
    } else {
      setForm({ ...form, category: e.target.value });
      setShowNewCategoryInput(false);
      setNewCategory('');
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.some(c => c.value === newCategory.trim().toLowerCase())) {
      const newCat = { value: newCategory.trim().toLowerCase(), label: newCategory.trim() };
      setCategories([...categories, newCat]);
      setForm({ ...form, category: newCat.value });
      setShowNewCategoryInput(false);
      setNewCategory('');
    }
  };

  // Image upload handler (placeholder)
  const handleImageFile = async (file: File, idx: number) => {
    // TODO: Replace with real upload logic (e.g., Cloudinary, S3, or backend endpoint)
    // For now, just use a local URL for preview
    const url = URL.createObjectURL(file);
    const newImages = [...form.images];
    newImages[idx] = url;
    setForm({ ...form, images: newImages });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('image-')) {
      const idx = parseInt(name.split('-')[1]);
      const newImages = [...form.images];
      newImages[idx] = value;
      setForm({ ...form, images: newImages });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddImage = () => {
    setForm({ ...form, images: [...form.images, ''] });
  };

  const handleRemoveImage = (idx: number) => {
    const newImages = form.images.filter((_, i) => i !== idx);
    setForm({ ...form, images: newImages.length ? newImages : [''] });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.subcategory || !form.images.filter(Boolean).length || !form.created || !form.description || !form.specification || !form.features) {
      setError('All fields are required, and at least one image.');
      return;
    }
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          images: form.images.filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error('Failed to add product');
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center py-8">
      <div className="w-full max-w-2xl">
        {/* Page Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center text-blue-900 hover:text-blue-700 font-medium mr-2"
          >
            <ArrowLeft className="mr-1" size={20} /> Back to Dashboard
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-blue-100">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Images Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center"><PlusCircle className="mr-2" size={20} /> Product Images</h3>
              <div className="space-y-3">
                {form.images.map((img, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-lg p-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) handleImageFile(e.target.files[0], idx);
                      }}
                      className="block text-sm text-gray-500"
                      title="Choose image file"
                    />
                    {img && (
                      <img src={img} alt={`Preview ${idx + 1}`} className="h-14 w-14 object-cover rounded border border-gray-200 bg-white" onError={e => { const t = e.target as HTMLImageElement; t.style.display = 'none'; }} />
                    )}
                    {form.images.length > 1 && (
                      <button type="button" onClick={() => handleRemoveImage(idx)} className="text-red-600 hover:text-red-800 p-1 rounded-full" title="Remove image"><X size={18} /></button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={handleAddImage} className="flex items-center mt-2 text-blue-900 hover:text-blue-700 font-medium"><PlusCircle size={18} className="mr-1" /> Add Image</button>
              </div>
            </div>
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleCategoryChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                  {categories.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                  <option value="__add_new__">+ Add new category...</option>
                </select>
                {showNewCategoryInput && (
                  <div className="flex mt-2 gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={e => setNewCategory(e.target.value)}
                      placeholder="New category name"
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button type="button" onClick={handleAddCategory} className="px-3 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">Add</button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
                <input type="date" name="created" value={form.created} onChange={handleChange} placeholder="YYYY-MM-DD" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              </div>
            </div>
            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter product description" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specification</label>
                <textarea name="specification" value={form.specification} onChange={handleChange} placeholder="Enter product specification" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" rows={2} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                <textarea name="features" value={form.features} onChange={handleChange} placeholder="Enter product features" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" rows={2} />
              </div>
            </div>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            <div className="flex justify-end space-x-4 mt-4">
              <button type="button" onClick={() => navigate('/admin/dashboard')} className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 font-medium transition">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-900 text-white rounded-md font-bold text-lg shadow hover:bg-blue-800 transition">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage; 
