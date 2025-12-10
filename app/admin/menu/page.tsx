'use client';

import { useState, useMemo } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Image as ImageIcon } from 'lucide-react';
import { allMenuItems, menuCategories, type MenuItem as MenuItemType } from '@/lib/data/menuData';
import Image from 'next/image';

interface AdminMenuItem {
  id: string;
  name: string;
  category: string;
  price: number | string;
  description: string;
  available: boolean;
  image?: string;
  tags?: string[];
  portionSizes?: { size: string; price: number }[];
}

export default function MenuManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Convert menu items to admin format
  const adminMenuItems: AdminMenuItem[] = useMemo(() => {
    return allMenuItems.map((item) => {
      // Handle price - use first portion size price if no direct price, or show price range
      let displayPrice: number | string = item.price || 0;
      if (!item.price && item.portionSizes && item.portionSizes.length > 0) {
        const prices = item.portionSizes.map(p => p.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        displayPrice = minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`;
      }

      return {
        id: item.id,
        name: item.name,
        category: item.category,
        price: displayPrice,
        description: item.description,
        available: item.available !== false, // Default to true if not specified
        image: item.image,
        tags: item.tags,
        portionSizes: item.portionSizes,
      };
    });
  }, []);

  // Extract unique categories from menu items
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(adminMenuItems.map(item => item.category)));
    return uniqueCategories.sort();
  }, [adminMenuItems]);

  const filteredItems = adminMenuItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Menu Management</h1>
          <p className="text-gray-600 mt-1">Manage your restaurant menu items</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Menu Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredItems.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  {/* Image */}
                  {item.image && (
                    <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                            item.available 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {item.available ? 'Available' : 'Unavailable'}
                          </span>
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex gap-1 flex-wrap">
                              {item.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 capitalize"
                                >
                                  {tag.replace('-', ' ')}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-sm text-gray-500 capitalize">{item.category}</span>
                          {item.portionSizes && item.portionSizes.length > 0 ? (
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-semibold text-amber-600">
                                {typeof item.price === 'string' ? `GH₵ ${item.price}` : `GH₵ ${item.price.toFixed(2)}`}
                              </span>
                              <div className="flex gap-2 flex-wrap">
                                {item.portionSizes.map((portion, idx) => (
                                  <span key={idx} className="text-xs text-gray-500">
                                    {portion.size}: GH₵ {portion.price.toFixed(2)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <span className="text-lg font-semibold text-amber-600">
                              {typeof item.price === 'string' ? `GH₵ ${item.price}` : `GH₵ ${item.price.toFixed(2)}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      aria-label={`Edit ${item.name}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No menu items found</p>
            {searchQuery && (
              <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filter</p>
            )}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Items</p>
            <p className="text-2xl font-semibold text-gray-900">{adminMenuItems.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Available</p>
            <p className="text-2xl font-semibold text-green-600">
              {adminMenuItems.filter(item => item.available).length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Categories</p>
            <p className="text-2xl font-semibold text-gray-900">{categories.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Filtered</p>
            <p className="text-2xl font-semibold text-amber-600">{filteredItems.length}</p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Menu Management Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Keep menu items updated with current prices and availability</li>
          <li>• Mark items as unavailable when out of stock</li>
          <li>• Use clear descriptions to help customers make choices</li>
          <li>• Organize items by categories for easy navigation</li>
        </ul>
      </div>
    </div>
  );
}

