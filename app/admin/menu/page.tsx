'use client';

import { useState, useMemo } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { allMenuItems } from '@/lib/data/menuData';
import Image from 'next/image';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { StatCard } from '@/components/admin/ui/StatCard';
import { ActionButton } from '@/components/admin/ui/ActionButton';

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
    <div className="ui-stack-lg">
      <PageHeader
        title="Menu Management"
        subtitle="Manage menu items, categories, availability, and pricing."
        actions={
          <ActionButton tone="primary" icon={<Plus className="w-4 h-4" />}>
            Add Menu Item
          </ActionButton>
        }
      />

      {/* Filters */}
      <div className="ui-panel">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ui-control pl-11"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="ui-control"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Items */}
      <div className="ui-panel overflow-hidden p-0">
        {filteredItems.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-4 transition-colors md:hover:bg-muted/20 active:bg-muted/20 md:p-5">
                <div className="flex items-start justify-between gap-4">
                  {/* Image */}
                  {item.image && (
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted md:h-24 md:w-24">
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
                          <h3 className="text-base font-semibold text-foreground md:text-lg">{item.name}</h3>
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
                        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-sm capitalize text-muted-foreground">{item.category}</span>
                          {item.portionSizes && item.portionSizes.length > 0 ? (
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-semibold text-amber-600">
                                {typeof item.price === 'string' ? `GH₵ ${item.price}` : `GH₵ ${item.price.toFixed(2)}`}
                              </span>
                              <div className="flex gap-2 flex-wrap">
                                {item.portionSizes.map((portion, idx) => (
                                  <span key={idx} className="text-xs text-muted-foreground">
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
                      className="rounded-md p-2 text-blue-600 transition-colors md:hover:bg-blue-50 active:bg-blue-50"
                      aria-label={`Edit ${item.name}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="rounded-md p-2 text-red-600 transition-colors md:hover:bg-red-50 active:bg-red-50"
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
            <p className="text-muted-foreground">No menu items found</p>
            {searchQuery && (
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter</p>
            )}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total Items" value={String(adminMenuItems.length)} icon={ImageIcon} />
        <StatCard label="Available" value={String(adminMenuItems.filter((item) => item.available).length)} icon={CheckCircle} trendTone="positive" />
        <StatCard label="Categories" value={String(categories.length)} icon={Filter} />
        <StatCard label="Filtered" value={String(filteredItems.length)} icon={Search} />
      </div>

      {/* Info Card */}
      <div className="ui-panel border-blue-200 bg-blue-50">
        <h3 className="mb-2 text-base font-semibold text-blue-900">Menu Management Tips</h3>
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

