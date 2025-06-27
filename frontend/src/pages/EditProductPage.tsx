import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, PlusCircle, X, Plus } from 'lucide-react';

const initialCategories = [
  { value: 'automotive', label: 'Automotive' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'branding', label: 'Branding' },
  { value: 'custom', label: 'Custom' },
];

const initialSubCategories = [
  { value: 'warning & safety labels', label: 'Warning & Safety Labels' },
  { value: 'product branding labels', label: 'Product Branding Labels' },
  { value: 'equipment tags', label: 'Equipment Tags' },
  { value: 'custom die-cut labels', label: 'Custom Die-Cut Labels' },
];

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(initialCategories);
  const [subcategories, setSubcategories] = useState(initialSubCategories);
  const [newCategory, setNewCategory] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showNewSubCategoryInput, setShowNewSubCategoryInput] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Not found');
        const product = await res.json();
        setForm({ ...product, images: product.images && product.images.length ? product.images : [''] });
        setNotFound(false);
      } catch {
        setNotFound(true);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);


  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.some(c => c.value === newCategory.trim().toLowerCase())) {
      const newCat = { value: newCategory.trim().toLowerCase(), label: newCategory.trim() };
      setCategories([...categories, newCat]);
      setForm({ ...form, category: newCat.value });
      setShowNewCategoryInput(false);
      setNewCategory('');
    }
  };

  const handleAddSubCategory = () => {
    if (newSubCategory.trim() && !subcategories.some(c => c.value === newSubCategory.trim().toLowerCase())) {
      const newSubCat = { value: newSubCategory.trim().toLowerCase(), label: newSubCategory.trim() };
      setSubcategories([...subcategories, newSubCat]);
      setForm({ ...form, subcategory: newSubCat.value });
      setShowNewSubCategoryInput(false);
      setNewSubCategory('');
    }
  };
  
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '__add_new__') {
      setShowNewCategoryInput(true);
    } else {
      setForm({ ...form, category: e.target.value });
      setShowNewCategoryInput(false);
      setNewCategory('');
    }
  };

  const handleSubCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '__add_new__') {
      setShowNewSubCategoryInput(true);
    } else {
      setForm({ ...form, subcategory: e.target.value });
      setShowNewSubCategoryInput(false);
      setNewCategory('');
    }
  };
  
  const handleAddButtonClick = () => {
    imgInputRef.current?.click();
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
  
  const convertImagetoBase64 = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleAddImage = async (files: Array<File>) => {
    try{
      const fileStrings: Array<string> = new Array(files.length);
      for (let i=0; i < files.length; ++i){
        fileStrings[i] = await convertImagetoBase64(files[i]);
      }
      const newImages = [...form.images, ...fileStrings];
      setForm({ ...form, images: newImages });
    }
    catch (error){
      setError('Error processing images:', error);
    }
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
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...form, images: form.images.filter(Boolean) }),
      });
      if (!res.ok) throw new Error('Failed to update product');
      navigate('/admin/dashboard');
    } catch {
      setError('Failed to update product. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-blue-900 font-bold">Loading product...</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/admin/dashboard')} className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 font-medium transition">Back to Dashboard</button>
        </div>
      </div>
    );
  }

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
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Edit Product</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-7">
                {form.images.map((img, idx) => 
                  img && (
                    <div key={idx} className="flex justify-center items-center h-24 w-24 relative group" onClick={() => handleRemoveImage(idx)}>
                      <img src={img} alt={`Preview ${idx + 1}`} className="rounded-lg w-full h-full object-cover" onError={(e) => { if (e.target instanceof HTMLImageElement) e.target.style.display = 'none'; }} />
                      <div className="flex items-center justify-center absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-80 text-red-500 transition-opacity duration-300 rounded-lg">
                        <X size={26} strokeWidth={2}/>
                      </div>
                    </div>
                  )
                )}
                <button onClick={handleAddButtonClick} type="button" className="flex w-24 h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-white text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 z-10 relative">
                  <Plus size={26}/>
                  <input
                    ref={imgInputRef}
                    onChange={e => {
                      if(e.target.files){
                        handleAddImage(Array.from(e.target.files));
                      }
                    }}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </button>
              </div>
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleCategoryChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                  {categories.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                  <option value="__add_new__">+ Add New Category...</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                <select name="subcategory" value={form.subcategory} onChange={handleSubCategoryChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                  {subcategories.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                  <option value="__add_new__">+ Add New Sub Category...</option>
                </select>
                {showNewSubCategoryInput && (
                  <div className="flex mt-2 gap-2">
                    <input
                      type="text"
                      value={newSubCategory}
                      onChange={e => setNewSubCategory(e.target.value)}
                      placeholder="New category name"
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button type="button" onClick={handleAddSubCategory} className="px-3 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">Add</button>
                  </div>
                )}
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
              <button type="submit" className="px-6 py-2 bg-blue-900 text-white rounded-md font-bold text-lg shadow hover:bg-blue-800 transition">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage; 
