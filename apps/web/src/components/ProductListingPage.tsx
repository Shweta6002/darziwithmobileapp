/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MOCK_FABRICS, Product } from "../types";
import { Filter, Star, Ruler, ArrowUpRight, Search, Heart } from "lucide-react";
import React, { useState } from "react";

interface ProductListingPageProps {
  products?: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductListingPage({ 
  products = [], 
  onSelectProduct 
}: ProductListingPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFabric, setSelectedFabric] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Unique lists for filtration options
  const categories = ["All", "Blazers", "Trousers", "Dresses", "Shirts", "Ethnic Wear"];
  const fabrics = ["All", ...MOCK_FABRICS.map((f) => f.name)];
  
  // Collect all colors across products
  const allColorNames = ["All", ...Array.from(new Set(
    products.flatMap((p) => p.colors.map((c) => c.name))
  ))];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter products based on selections
  const filteredProducts = products.filter((product) => {
    // 1. Category
    if (selectedCategory !== "All" && product.category !== selectedCategory) {
      return false;
    }
    // 2. Fabric
    if (selectedFabric !== "All") {
      const matchFabricObj = MOCK_FABRICS.find((f) => f.name === selectedFabric);
      if (!matchFabricObj || !product.fabrics.includes(matchFabricObj.id)) {
        return false;
      }
    }
    // 3. Color
    if (selectedColor !== "All" && !product.colors.some((c) => c.name === selectedColor)) {
      return false;
    }
    // 4. Max Price
    if (product.basePrice > maxPrice) {
      return false;
    }
    // 5. Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchesTitle = product.name.toLowerCase().includes(q);
      const matchesText = product.description.toLowerCase().includes(q) || product.designedFor.toLowerCase().includes(q);
      if (!matchesTitle && !matchesText) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="bg-white min-h-screen py-12" id="catalog-page-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Introduction Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-stone-100 pb-10 mb-10" id="catalog-header">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#c5a880] mb-2 block">Premium Custom Wardrobe</span>
            <h1 className="font-serif text-4xl sm:text-5xl text-neutral-900 leading-none">
              The Workspace Collection
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-3 max-w-lg font-sans">
              Designed for impact. Fully customizable proportions hand-crafted directly to your sizing metrics with premium local Indian textiles.
            </p>
          </div>

          {/* Search box overlay */}
          <div className="relative mt-6 md:mt-0 w-full md:w-80" id="search-filter-box">
            <Search className="absolute left-4.5 top-3.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search silhouette or dress..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-150 rounded-full pl-11 pr-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-[#c5a880] transition-colors font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10" id="catalog-grid-row">
          
          {/* Left Column Filters (Desktop) */}
          <aside className="lg:col-span-3 space-y-8" id="catalog-sidebar-filters">
            <div className="flex items-center space-x-2 text-neutral-950 font-semibold text-xs font-mono uppercase tracking-widest pb-3 border-b border-stone-150">
              <Filter className="w-4 h-4 text-stone-600" />
              <span>Tailoring Filters</span>
            </div>

            {/* Category selection */}
            <div className="space-y-3" id="filter-categories-block">
              <h4 className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">Garment Silhouette</h4>
              <div className="flex flex-wrap lg:flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    id={`filter-cat-${cat}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-sans transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-neutral-900 text-white font-semibold shadow-md"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric premium filters */}
            <div className="space-y-3" id="filter-fabrics-block">
              <h4 className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">Fabric Selection</h4>
              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                className="w-full bg-stone-50 border border-stone-150 rounded-xl px-3 py-2 text-xs text-stone-700 focus:outline-none focus:border-[#c5a880] transition-all font-sans cursor-pointer"
                id="fabric-selector-dropdown"
              >
                {fabrics.map((fab) => (
                  <option key={fab} value={fab}>
                    {fab}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Color options */}
            <div className="space-y-3" id="filter-colors-block">
              <h4 className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">Color Standard</h4>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full bg-stone-50 border border-stone-150 rounded-xl px-3 py-2 text-xs text-stone-700 focus:outline-none focus:border-[#c5a880] transition-all font-sans cursor-pointer"
                id="color-selector-dropdown"
              >
                {allColorNames.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Price slider */}
            <div className="space-y-3" id="filter-price-block">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">Price Ceiling</h4>
                <span className="text-xs font-mono font-medium text-neutral-900">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-neutral-900 cursor-pointer"
                id="price-range-slider"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>₹3,000</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Core Trust indicator */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100 text-stone-500 text-[11px] leading-relaxed space-y-2 font-mono">
              <div className="text-neutral-900 font-semibold text-[10px] uppercase">Tailored on Demand</div>
              <p className="text-stone-500 font-sans leading-relaxed">No warehouse storage slop. When you finalize, we cut fresh fabric rolls under your unique laser-measured profile.</p>
            </div>
          </aside>

          {/* Right Column Products Grid */}
          <main className="lg:col-span-9" id="catalog-products-main">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-stone-200 rounded-3xl" id="no-products-msg">
                <Star className="w-8 h-8 mx-auto text-stone-300 stroke-[1.5]" />
                <h3 className="font-serif text-lg text-stone-900 mt-4 font-semibold">No Custom Cut Matches</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto mt-2">
                  Try clearing your fabric sliders or category parameters to preview alternative combinations.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedFabric("All");
                    setSelectedColor("All");
                    setMaxPrice(10000);
                    setSearchQuery("");
                  }}
                  className="mt-6 inline-flex text-xs font-mono uppercase tracking-widest text-neutral-950 underline hover:text-[#c5a880] cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8" id="products-cards-grid">
                {filteredProducts.map((product) => {
                  const isFav = favorites.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      id={`product-card-${product.id}`}
                      onClick={() => onSelectProduct(product)}
                      className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-stone-150 transition-all hover:shadow-2xl hover:shadow-stone-150/50 flex flex-col justify-between"
                    >
                      {/* Product Media Column */}
                      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden" id={`product-img-panel-${product.id}`}>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-top ${product.outOfStock ? "grayscale opacity-70" : ""}`}
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Designed For purpose tag */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-100">
                          <span className="text-[9px] font-mono uppercase text-stone-800 tracking-wider">
                            {product.designedFor.split(" & ")[0]}
                          </span>
                        </div>

                        {/* Out of stock tag */}
                        {product.outOfStock && (
                          <div className="absolute bottom-4 left-4 bg-red-600 text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 px-3 py-1 rounded-full border border-red-500 font-bold shadow-md" id={`badge-oos-${product.id}`}>
                            Out of Stock
                          </div>
                        )}

                        {/* Favorite Heart Button */}
                        <button
                          onClick={(e) => toggleFavorite(product.id, e)}
                          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-stone-100 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-neutral-900 cursor-pointer"
                          aria-label="Save to Favourites"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? "fill-red-500 stroke-red-500" : "stroke-current"}`} />
                        </button>

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                          <span className="bg-white text-stone-900 text-[10px] font-mono uppercase tracking-widest px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-1.5 hover:bg-stone-50 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                            <span>Tailor Studio</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a880]" />
                          </span>
                        </div>
                      </div>

                      {/* Product Details Section */}
                      <div className="p-6" id={`product-details-${product.id}`}>
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">{product.category}</span>
                            <h3 className="font-sans text-sm font-semibold text-neutral-950 mt-1 lines-clamp-1 group-hover:text-[#c5a880] transition-colors">{product.name}</h3>
                          </div>
                          <span className="text-sm font-mono font-medium text-neutral-900">₹{product.basePrice.toLocaleString()}</span>
                        </div>

                        <p className="text-stone-500 text-xs mt-2 line-clamp-2 leading-relaxed font-sans">{product.description}</p>

                        {/* Core Details Indicators */}
                        <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-4 font-mono text-[10px]" id={`product-footer-${product.id}`}>
                          <div className="flex items-center space-x-1 text-amber-500 font-bold">
                            <Star className="w-3 h-3 fill-current text-amber-500" />
                            <span>{product.rating}</span>
                          </div>
                          <div className="flex items-center text-stone-500 space-x-1">
                            <Ruler className="w-3 h-3 text-[#c5a880]" />
                            <span>{product.colors.length} Atelier Colors</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
