import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, PlusCircle, X } from 'lucide-react';

const categoryOptions = [
  { value: 'automotive', label: 'Automotive' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'branding', label: 'Branding' },
  { value: 'custom', label: 'Custom' },
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

  // Redirect to login if no token
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

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

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
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
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
            {/* Images Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center"><PlusCircle className="mr-2" size={20} /> Product Images</h3>
              <div className="space-y-3">
                {form.images.map((img, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-lg p-2">
                    <input
                      type="text"
                      name={`image-${idx}`}
                      value={img}
                      onChange={handleChange}
                      placeholder={`Image URL #${idx + 1}`}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {img && (
                      <img src={img} alt={`Preview ${idx + 1}`} className="h-14 w-14 object-cover rounded border border-gray-200 bg-white" onError={(e) => { if (e.target instanceof HTMLImageElement) e.target.style.display = 'none'; }} />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                  {categoryOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                <input type="text" name="subcategory" value={form.subcategory} onChange={handleChange} placeholder="Enter subcategory" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
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