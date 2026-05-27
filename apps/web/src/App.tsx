/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Product, 
  Fabric, 
  BodyMeasurements, 
  AIRecommendation, 
  Order, 
  INITIAL_MEASUREMENTS, 
  INITIAL_AI_RECOMMENDATION, 
  MOCK_PRODUCTS, 
  MOCK_FABRICS,
  UserProfile,
  RelativeSizeCard,
  INITIAL_RELATIVE_CARDS
} from "./types";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ProductListingPage from "./components/ProductListingPage";
import ProductDetailPage from "./components/ProductDetailPage";
import MeasurementFlow from "./components/MeasurementFlow";
import CheckoutPage from "./components/CheckoutPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import TechBlueprint from "./components/TechBlueprint";
import AIConsultantChat from "./components/AIConsultantChat";
import LoginScreen from "./components/LoginScreen";
import { ShoppingBag, X, Sparkles, Check, ChevronRight } from "lucide-react";

export default function App() {
  // Navigation tabs Router: "landing" | "products" | "measurements" | "dashboard" | "admin" | "blueprint" | "detail" | "checkout" | "login"
  const [currentTab, setCurrentTab] = useState<string>("landing");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const cachedUser = localStorage.getItem("drz_user");
    if (cachedUser) {
      try {
        return JSON.parse(cachedUser);
      } catch (e) {
        return null;
      }
    }
    // Default active profile to keep app fully populated on load
    return {
      name: "Sanjana Sen",
      email: "sanjana.sen@corp.in",
      role: "user",
      company: "ConsultPro",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    };
  });

  // Relatives' Sizing profiles cards
  const [relativeSizeCards, setRelativeSizeCards] = useState<RelativeSizeCard[]>(() => {
    const cached = localStorage.getItem("drz_relative_cards");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return INITIAL_RELATIVE_CARDS;
      }
    }
    return INITIAL_RELATIVE_CARDS;
  });

  // Sizing Profile State
  const [userMeasurements, setUserMeasurements] = useState<BodyMeasurements>(INITIAL_MEASUREMENTS);
  const [aiRecommendation, setAiRecommendation] = useState<AIRecommendation>(INITIAL_AI_RECOMMENDATION);


  // Cart Workspace
  const [cartItem, setCartItem] = useState<{
    product: Product;
    selectedFabric: Fabric;
    selectedColor: { name: string; hex: string };
    customizations: any;
    finalPrice: number;
  } | null>(null);
  
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Saved Fabrics & Favourites state
  const [savedFabrics, setSavedFabrics] = useState<string[]>(["f-crepe", "f-silk"]);

  // Stateful collections custom product list
  const [productsList, setProductsList] = useState<Product[]>(() => {
    const cached = localStorage.getItem("drz_products");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return MOCK_PRODUCTS;
      }
    }
    return MOCK_PRODUCTS;
  });

  const handleAddProduct = (newProduct: Product) => {
    const updated = [newProduct, ...productsList];
    setProductsList(updated);
    localStorage.setItem("drz_products", JSON.stringify(updated));
  };

  const handleRemoveProduct = (productId: string) => {
    const updated = productsList.filter(p => p.id !== productId);
    setProductsList(updated);
    localStorage.setItem("drz_products", JSON.stringify(updated));
  };

  const handleToggleStockProduct = (productId: string) => {
    const updated = productsList.map(p => {
      if (p.id === productId) {
        return { ...p, outOfStock: !p.outOfStock };
      }
      return p;
    });
    setProductsList(updated);
    localStorage.setItem("drz_products", JSON.stringify(updated));
  };

  // Orders Archive state cache
  const [ordersList, setOrdersList] = useState<Order[]>([]);

  // Load cache states on initial run
  useEffect(() => {
    const cachedMeasurements = localStorage.getItem("drz_measurements");
    const cachedRecommendation = localStorage.getItem("drz_recommendation");
    const cachedOrders = localStorage.getItem("drz_orders");

    if (cachedMeasurements) setUserMeasurements(JSON.parse(cachedMeasurements));
    if (cachedRecommendation) setAiRecommendation(JSON.parse(cachedRecommendation));
    
    if (cachedOrders) {
      setOrdersList(JSON.parse(cachedOrders));
    } else {
      // Default initial mock historical order to ensure immediate dashboard contents
      const defaultOrder: Order = {
        id: "DRZ-92415",
        date: "May 10th, 2026",
        status: "Tailoring",
        items: [{
          product: MOCK_PRODUCTS[0], // Pragati Blazer
          selectedFabric: MOCK_FABRICS[1], // Merino Tweed
          selectedColor: { name: "Executive Charcoal", hex: "#2f3136" },
          customizations: {
            sleeveLength: "Full Sleeve",
            lapelStyle: "Peak Lapel",
            buttonStyle: "Single Breasted",
            liningMaterial: "Premium Bemberg",
            pocketStyle: "Classic Flap",
            monogramText: "DRZ"
          },
          measurements: INITIAL_MEASUREMENTS,
          aiRecommendation: INITIAL_AI_RECOMMENDATION,
          price: 8500
        }],
        customerName: "Sanjana Sen",
        customerEmail: "sanjana.sen@corp.in",
        shippingAddress: {
          fullName: "Sanjana Sen",
          phone: "+91 98450 12345",
          addressLine: "B-402, Embassy Heights, Koramangala",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560034"
        },
        payoutStatus: "Paid",
        tailorAssigned: "Master Ramesh (Embroidery Veteran)",
        alterationHistory: [
          {
            date: "May 12th, 2026",
            notes: "Waistline drapes perfectly but blazer shoulder pads pull slightly when reaching. Left +0.25 in extra seam tolerance.",
            status: "Resolved"
          }
        ]
      };
      setOrdersList([defaultOrder]);
      localStorage.setItem("drz_orders", JSON.stringify([defaultOrder]));
    }
  }, []);

  // Role-based route guard: redirect non-admin users away from admin dashboard & tech blueprint
  useEffect(() => {
    if ((currentTab === "admin" || currentTab === "blueprint") && currentUser?.role !== "admin") {
      setCurrentTab("landing");
    }
  }, [currentTab, currentUser]);

  // Update order list helper and save to storage
  const saveOrdersToCache = (updatedOrders: Order[]) => {
    setOrdersList(updatedOrders);
    localStorage.setItem("drz_orders", JSON.stringify(updatedOrders));
  };

  // Callback triggers
  const handleSelectProductFromCatalog = (prod: Product) => {
    setSelectedProduct(prod);
    setCurrentTab("detail");
  };

  const handleSaveMeasurementsFromAtelier = (meas: BodyMeasurements, rec: AIRecommendation) => {
    setUserMeasurements(meas);
    setAiRecommendation(rec);
    localStorage.setItem("drz_measurements", JSON.stringify(meas));
    localStorage.setItem("drz_recommendation", JSON.stringify(rec));
    
    if (!currentUser) {
      alert("It is mandatory to log in to save your sizes and order bespoke items. Redirecting to login page...");
      setCurrentTab("login");
      return;
    }
    
    // Redirect context-aware
    if (selectedProduct) {
      setCurrentTab("detail");
    } else {
      setCurrentTab("dashboard");
    }
  };

  const handleAddGarmentToCart = (fabric: Fabric, color: { name: string; hex: string }, customizations: any, price: number) => {
    if (!selectedProduct) return;

    setCartItem({
      product: selectedProduct,
      selectedFabric: fabric,
      selectedColor: color,
      customizations,
      finalPrice: price
    });
    setIsCartOpen(true);
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem("drz_user", JSON.stringify(user));
    if (user.role === "admin") {
      setCurrentTab("admin");
    } else {
      setCurrentTab("dashboard");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("drz_user");
    setCurrentTab("landing");
  };

  const handleSaveRelativeCards = (updated: RelativeSizeCard[]) => {
    setRelativeSizeCards(updated);
    localStorage.setItem("drz_relative_cards", JSON.stringify(updated));
  };

  const handlePlaceOrderSecurely = (newOrder: Order) => {
    const updatedOrders = [newOrder, ...ordersList];
    saveOrdersToCache(updatedOrders);
    setCartItem(null); // empty bag
    
    // Redirect to Dashboard Wardrobe Orders tab
    setCurrentTab("dashboard");
  };

  const handleReorderBespokeItem = (order: Order) => {
    // Generate fresh cart duplicate
    if (order.items[0]) {
      setCartItem({
        product: order.items[0].product,
        selectedFabric: order.items[0].selectedFabric,
        selectedColor: order.items[0].selectedColor,
        customizations: order.items[0].customizations,
        finalPrice: order.items[0].price
      });
      setIsCartOpen(true);
    }
  };

  const handleTriggerAlterationRequest = (orderId: string, notes: string) => {
    const updatedOrders = ordersList.map((order) => {
      if (order.id === orderId) {
        const history = order.alterationHistory || [];
        return {
          ...order,
          alterationHistory: [
            ...history,
            {
              date: "Today",
              notes: notes,
              status: "Assessing" as const
            }
          ]
        };
      }
      return order;
    });

    saveOrdersToCache(updatedOrders);
  };

  // Admin Actions callbacks
  const handleUpdateOrderStatusOnAdmin = (orderId: string, status: Order["status"]) => {
    const updated = ordersList.map((order) => {
      if (order.id === orderId) {
        return { ...order, status };
      }
      return order;
    });
    saveOrdersToCache(updated);
  };

  const handleAssignTailorOnAdmin = (orderId: string, tailor: string) => {
    const updated = ordersList.map((order) => {
      if (order.id === orderId) {
        return { ...order, tailorAssigned: tailor };
      }
      return order;
    });
    saveOrdersToCache(updated);
  };

  const handleResolveAlterationOnAdmin = (orderId: string) => {
    const updated = ordersList.map((order) => {
      if (order.id === orderId) {
        const updatedAlt = (order.alterationHistory || []).map((alt) => ({
          ...alt,
          status: "Resolved" as const
        }));
        return { ...order, alterationHistory: updatedAlt };
      }
      return order;
    });
    saveOrdersToCache(updated);
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen text-neutral-900 font-sans selection:bg-[#c5a880]/20 flex flex-col justify-between" id="applet-viewport-frame">
      
      {/* Dynamic slide-over Cart/Bag Drawer overlays */}
      {isCartOpen && cartItem && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-workspace-overlay">
          <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md animate-fade-in bg-white shadow-2xl border-l border-stone-200 flex flex-col h-full" id="cart-slideover-panel">
              
              {/* Cart Head */}
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-neutral-950" />
                  <h3 className="font-serif text-lg font-medium text-neutral-950">Atelier Shopping Bag</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-stone-400 hover:text-neutral-950 p-1 rounded-full hover:bg-stone-50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Body Scroll */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6" id="cart-item-scroll">
                <div className="flex gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-150">
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0">
                    <img
                      src={cartItem.product.imageUrl}
                      alt={cartItem.product.name}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#c5a880] uppercase tracking-widest block">{cartItem.product.category}</span>
                    <h4 className="text-xs font-semibold text-neutral-950 mt-1">{cartItem.product.name}</h4>
                    <span className="text-[10px] font-mono text-stone-500 block">Weave: {cartItem.selectedFabric.name}</span>
                    <strong className="text-xs font-mono font-bold text-neutral-950 mt-1 block">₹{cartItem.finalPrice.toLocaleString()}</strong>
                  </div>
                </div>

                {/* Sizing Blueprint Alert */}
                <div className="bg-neutral-900 text-white p-4.5 rounded-2xl font-sans space-y-2">
                  <div className="flex items-center space-x-1.5 text-[#c5a880]">
                    <Sparkles className="w-4 h-4 text-[#c5a880]" />
                    <span className="text-[9px] font-mono uppercase tracking-widest font-semibold">Active TrueFit™ Alignment</span>
                  </div>
                  <p className="text-[10px] text-stone-300 leading-normal">
                    This order adapts to: <strong>Height {userMeasurements.height}cm, Shoulder {userMeasurements.shoulder}”, Bust {userMeasurements.bust}”</strong>. Digital patterns are drafted custom and verified by Master রমেশ Ramesh prior to roll cutting.
                  </p>
                </div>

                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest space-y-2 border-t border-stone-100 pt-4">
                  <span className="block font-semibold text-stone-500">Bespoke Monogram Specs:</span>
                  <div className="flex justify-between items-center bg-stone-50/50 p-2.5 rounded-lg text-neutral-950 border border-stone-150 border-dotted">
                    <span>Lapel Monogram Text:</span>
                    <span className="font-bold text-[#c5a880]">"{cartItem.customizations.monogramText || 'None'}"</span>
                  </div>
                </div>
              </div>

              {/* Cart Foot actions */}
              <div className="p-6 border-t border-stone-250 bg-stone-50" id="cart-footer-actions">
                <div className="flex justify-between items-center text-xs font-mono text-neutral-950 mb-4">
                  <span className="text-stone-500 uppercase">Subtotal cost:</span>
                  <span className="text-sm font-extrabold text-[#c5a880]">₹{cartItem.finalPrice.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentTab("checkout");
                  }}
                  className="w-full bg-neutral-950 text-white font-mono text-xs uppercase tracking-widest py-4 rounded-full hover:bg-neutral-800 transition-colors flex items-center justify-center space-x-1 font-bold cursor-pointer"
                >
                  <span>Proceed to bespoke checkout</span>
                  <ChevronRight className="w-4 h-4 text-[#c5a880]" />
                </button>
                <div className="text-center mt-3">
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-[10px] font-mono text-stone-400 uppercase tracking-widest underline hover:text-neutral-950"
                  >
                    Continue shopping
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Primary Navigation Header */}
      <Navigation
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setSelectedProduct(null);
          setCurrentTab(tab);
        }}
        cartCount={cartItem ? 1 : 0}
        openCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginClick={() => setCurrentTab("login")}
      />

      {/* Main viewport router content sections */}
      <main className="flex-grow z-10" id="applet-main-viewports">
        {currentTab === "landing" && (
          <LandingPage
            onDesignPerfectFit={() => setCurrentTab("measurements")}
            onBrowseCollections={() => setCurrentTab("products")}
            onStartMeasurements={() => setCurrentTab("measurements")}
          />
        )}

        {currentTab === "products" && (
          <ProductListingPage
            products={productsList}
            onSelectProduct={handleSelectProductFromCatalog}
          />
        )}

        {currentTab === "detail" && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setCurrentTab("products")}
            onConfigureMeasurements={() => setCurrentTab("measurements")}
            onAddToCart={handleAddGarmentToCart}
            userMeasurements={userMeasurements}
            aiRecommendation={aiRecommendation}
            relativeSizeCards={relativeSizeCards}
          />
        )}

        {currentTab === "measurements" && (
          <MeasurementFlow
            initialMeasurements={userMeasurements}
            onCancel={() => {
              if (selectedProduct) {
                setCurrentTab("detail");
              } else {
                setCurrentTab("landing");
              }
            }}
            onSaveMeasurements={handleSaveMeasurementsFromAtelier}
          />
        )}

        {currentTab === "checkout" && (
          <CheckoutPage
            cartItem={cartItem}
            onBack={() => {
              if (selectedProduct) {
                setCurrentTab("detail");
              } else {
                setCurrentTab("products");
              }
            }}
            onPlaceOrder={handlePlaceOrderSecurely}
            userMeasurements={userMeasurements}
          />
        )}

        {currentTab === "dashboard" && (
          <UserDashboard
            currentUser={currentUser}
            onLogout={handleLogout}
            userMeasurements={userMeasurements}
            onEditMeasurements={() => setCurrentTab("measurements")}
            previousOrders={ordersList}
            onReorder={handleReorderBespokeItem}
            savedFabrics={savedFabrics}
            onTriggerAlteration={handleTriggerAlterationRequest}
            relativeSizeCards={relativeSizeCards}
            onSaveRelativeCards={handleSaveRelativeCards}
          />
        )}

        {currentTab === "admin" && currentUser?.role === "admin" && (
          <AdminDashboard
            ordersList={ordersList}
            products={productsList}
            onAddProduct={handleAddProduct}
            onRemoveProduct={handleRemoveProduct}
            onToggleStock={handleToggleStockProduct}
            onUpdateOrderStatus={handleUpdateOrderStatusOnAdmin}
            onAssignTailor={handleAssignTailorOnAdmin}
            onResolveAlteration={handleResolveAlterationOnAdmin}
          />
        )}

        {currentTab === "blueprint" && currentUser?.role === "admin" && (
          <TechBlueprint />
        )}

        {currentTab === "login" && (
          <LoginScreen onLogin={handleLogin} />
        )}
      </main>

      {/* Floating real-time AI consultant chat slide-out advisor */}
      <AIConsultantChat userMeasurements={userMeasurements} />

      {/* Luxury minimal footer */}
      <footer className="bg-stone-50 border-t border-stone-150 py-12 text-center text-xs font-mono text-stone-400 tracking-wider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <img
            src="/darzi-name-logo.png"
            alt="Darzi"
            className="h-12 w-auto object-contain mx-auto"
          />
          <p className="text-stone-400 scale-90">© 2026. ALL RIGHTS RESERVED.</p>
          <div className="flex justify-center gap-6 text-[10px] uppercase text-stone-500 font-mono">
            <span>Mumbai Atelier</span>
            <span>•</span>
            <span>Delhi Loom</span>
            <span>•</span>
            <span>Bangalore HQ</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
