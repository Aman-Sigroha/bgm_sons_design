import React, { useState, useEffect } from 'react';
import { Package, Trash2, Edit, PlusCircle, Search, Filter, RefreshCw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  created: string;
  status: 'active' | 'draft' | 'archived';
}

const AdminDashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const navigate = useNavigate();
  
  // Mock data for admin dashboard
  useEffect(() => {
    const fetchProducts = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Automotive Warning Labels',
          category: 'automotive',
          subcategory: 'Warning Labels',
          image: 'https://images.pexels.com/photos/5980743/pexels-photo-5980743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          created: '2023-08-15',
          status: 'active'
        },
        {
          id: 2,
          name: 'Industrial Equipment Tags',
          category: 'industrial',
          subcategory: 'Equipment Tags',
          image: 'https://images.pexels.com/photos/8230075/pexels-photo-8230075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          created: '2023-09-22',
          status: 'active'
        },
        {
          id: 3,
          name: 'Product Branding Labels',
          category: 'branding',
          subcategory: 'Product Labels',
          image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          created: '2023-10-05',
          status: 'active'
        },
        {
          id: 4,
          name: 'Custom Shape Die-Cut Labels',
          category: 'custom',
          subcategory: 'Die-Cut',
          image: 'https://images.pexels.com/photos/1303092/pexels-photo-1303092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          created: '2023-11-18',
          status: 'draft'
        },
        {
          id: 5,
          name: 'Safety Instruction Labels',
          category: 'industrial',
          subcategory: 'Safety Labels',
          image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          created: '2024-01-30',
          status: 'active'
        },
        {
          id: 6,
          name: 'Vehicle Identification Labels',
          category: 'automotive',
          subcategory: 'Identification',
          image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          created: '2024-02-14',
          status: 'archived'
        },
        {
          id: 7,
          name: 'Eco-Friendly Labels',
          category: 'custom',
          subcategory: 'Sustainable',
          image: 'https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          created: '2024-03-22',
          status: 'draft'
        }
      ];
      
      setProducts(mockProducts);
      setIsLoading(false);
    };
    
    fetchProducts();
  }, []);
  
  // Filter products based on search, status, and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };
  
  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowEditProductModal(true);
  };
  
  // Handle delete product
  const handleDeleteProduct = (productId: number) => {
    // In a real app, this would be an API call
    setProducts(products.filter(product => product.id !== productId));
    // Show a success message
    alert(`Product ID ${productId} has been deleted.`);
  };
  
  // Placeholder for Add Product Modal
  const AddProductModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Add New Product</h2>
        <p className="text-gray-600 mb-4">
          This is a placeholder for the add product form. In a real application, this would be a form to add a new product.
        </p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={() => setShowAddProductModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            onClick={() => setShowAddProductModal(false)}
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
  
  // Placeholder for Edit Product Modal
  const EditProductModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Edit Product</h2>
        <p className="text-gray-600 mb-4">
          This is a placeholder for the edit product form. In a real application, this would be a form to edit product ID {editingProduct?.id}.
        </p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={() => setShowEditProductModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            onClick={() => setShowEditProductModal(false)}
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-blue-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Package size={24} />
              <h1 className="text-xl font-bold">BGM Sons Admin</h1>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-300"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
          <button 
            onClick={() => setShowAddProductModal(true)}
            className="flex items-center space-x-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            <PlusCircle size={18} />
            <span>Add New Product</span>
          </button>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-500" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="automotive">Automotive</option>
                    <option value="industrial">Industrial</option>
                    <option value="branding">Branding</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
              className="flex items-center space-x-1 text-blue-900 hover:text-blue-700"
            >
              <RefreshCw size={16} />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
        
        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 mb-2"></div>
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-md object-cover" 
                              src={product.image} 
                              alt={product.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{product.category}</div>
                        <div className="text-sm text-gray-500">{product.subcategory}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.created}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === 'active' ? 'bg-green-100 text-green-800' :
                          product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-900 hover:text-blue-700"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No products found matching your filters.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                className="mt-2 text-blue-900 hover:text-blue-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      {showAddProductModal && <AddProductModal />}
      {showEditProductModal && editingProduct && <EditProductModal />}
    </div>
  );
};

export default AdminDashboardPage;