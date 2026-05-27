import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ShieldCheck, Truck, CreditCard, Sparkles, AlertCircle } from "lucide-react-native";
import { useFitStore } from "../../store/useFitStore";

export default function MobileCheckout() {
  const router = useRouter();
  const { cart, activeProfile, placeOrder, clearCart } = useFitStore();

  const [paying, setPaying] = React.useState(false);

  const handleProcessSecurePayment = () => {
    if (!cart) return;
    if (!activeProfile) {
      Alert.alert("Bespoke Alignment Needed", "Please configure a TrueFit sizing profile before payment.");
      return;
    }

    setPaying(true);

    // Simulator for Razorpay overlay logic
    setTimeout(() => {
      setPaying(false);

      const generatedOrder = {
        id: "ord-" + Math.floor(100 + Math.random() * 900),
        product: cart.product,
        selectedFabric: cart.fabric,
        selectedColor: cart.color,
        fitProfile: activeProfile,
        customizations: cart.customizations,
        totalPrice: cart.finalPrice + 250, // includes luxury lining levies
        status: "Order Received" as const,
        date: new Date().toISOString().split("T")[0],
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      };

      placeOrder(generatedOrder);
      clearCart();

      Alert.alert(
        "Bespoke Order Secured",
        "Your payment was validated successfully. Your drafting pattern queued on master tailor bench #4.",
        [{ text: "Track Progress", onPress: () => router.push("/orders") }]
      );
    }, 2000);
  };

  if (!cart) {
    return (
      <View style={{ flex: 1, backgroundColor: "#faf9f6", padding: 24, justifyContent: "center", alignItems: "center" }}>
        <Text className="font-serif italic text-stone-500">Checkout Cart is Empty</Text>
        <TouchableOpacity onPress={() => router.replace("/discover")} className="mt-4 px-4 py-2 bg-[#c5a880] rounded-full">
          <Text className="font-mono text-xs text-white">Browse Collections</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#faf9f6" }}>
      
      {/* Header info */}
      <View className="px-6 pt-14 pb-4 border-b border-stone-100 flex-row justify-between items-center bg-[#faf9f6]">
        <View>
          <Text className="text-[8px] font-mono tracking-widest text-[#c5a880] uppercase">Secure payment</Text>
          <Text className="text-sm font-serif italic text-neutral-900 font-bold">Atelier Checkout</Text>
        </View>

        <TouchableOpacity onPress={() => router.back()} className="px-3 py-1 rounded-full bg-stone-100 border border-stone-200">
          <Text className="text-[9px] font-mono text-stone-600">✕ CANCEL</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        
        {/* Secure Razorpay Header badge */}
        <View className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-4 flex-row items-center space-x-3 mb-6">
          <ShieldCheck size={18} color="#10b981" />
          <Text className="text-[10px] text-emerald-800 leading-normal flex-1">
            Protected by <Text className="font-bold">Razorpay 256-Bit Encrypted Gateway</Text>. Dynamic tailoring tokens locked down against alteration hazards.
          </Text>
        </View>

        {/* 1. SEAM PROFILE SUMMARY */}
        <View className="space-y-3 mb-6">
          <Text className="text-[9px] font-mono uppercase text-[#c5a880] tracking-widest font-bold">1. Selected Sizing Blueprint</Text>
          
          {activeProfile ? (
            <View className="bg-white rounded-2xl border border-stone-200 p-4 space-y-1">
              <Text className="font-serif text-xs font-bold text-neutral-950 font-bold">{activeProfile.title}</Text>
              <Text className="text-[9.5px] text-stone-500 font-mono">
                {activeProfile.fitPreference} • Height: {activeProfile.measurements.height}cm • Weight: {activeProfile.measurements.weight}kg
              </Text>
            </View>
          ) : (
            <TouchableOpacity 
              onPress={() => router.push("/measure")}
              className="bg-[#f5f3ef] border border-dashed border-[#c5a880]/60 p-4 rounded-2xl flex-row justify-between items-center"
            >
              <Text className="text-xs text-stone-500 font-serif italic">Enter Body measurements</Text>
              <Text className="text-[9px] font-mono text-[#c5a880] font-bold">CALIBRATE &rarr;</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 2. ITEM BLUEPRINTS CARDS */}
        <View className="space-y-3 mb-6">
          <Text className="text-[9px] font-mono uppercase text-[#c5a880] tracking-widest font-bold">2. Tailoring Queue Item</Text>
          
          <View className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3">
            <View className="flex-row justify-between">
              <View className="flex-1 pr-2">
                <Text className="font-serif text-sm font-bold text-neutral-950">{cart.product.name}</Text>
                <Text className="text-[9.5px] text-[#c5a880] font-mono mt-0.5">{cart.product.tagline}</Text>
              </View>
              <Text className="font-mono text-xs font-bold text-neutral-950">₹{cart.product.basePrice.toLocaleString()}</Text>
            </View>

            {/* Fabric Specifications */}
            <View className="bg-stone-50 p-2.5 rounded-xl border border-stone-150 space-y-1 flex-row justify-between items-center">
              <View>
                <Text className="text-[8px] font-mono text-stone-400 uppercase">Textile Allocation</Text>
                <Text className="text-[10px] text-neutral-900 leading-none mt-0.5">{cart.fabric.name}</Text>
              </View>
              <Text className="text-[9px] font-mono text-[#c5a880]">
                {cart.fabric.priceDelta > 0 ? `+ ₹${cart.fabric.priceDelta.toLocaleString()}` : "Included"}
              </Text>
            </View>
          </View>
        </View>

        {/* 3. RECEIPT TOTALS */}
        <View className="space-y-3">
          <Text className="text-[9px] font-mono uppercase text-[#c5a880] tracking-widest font-bold">3. Total Bespoke Receipt</Text>
          
          <View className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2">
            <View className="flex-row justify-between text-xs font-mono">
              <Text className="text-stone-500">Base Costume Rate</Text>
              <Text className="text-neutral-900">₹{cart.product.basePrice.toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between text-xs font-mono">
              <Text className="text-stone-500">Textile Roll Delta</Text>
              <Text className="text-neutral-900">₹{(cart.fabric.priceDelta || 0).toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between text-xs font-mono">
              <Text className="text-stone-500">Premium Basting Lining</Text>
              <Text className="text-neutral-900">₹250</Text>
            </View>
            <View className="flex-row justify-between text-xs font-mono">
              <Text className="text-stone-500">Climate Secure Box Packing</Text>
              <Text className="text-emerald-600">FREE</Text>
            </View>

            <View className="border-t border-stone-100 pt-3 flex-row justify-between items-center mt-1">
              <Text className="font-serif text-sm font-bold text-neutral-950 italic">Total Charges</Text>
              <Text className="font-mono text-sm font-bold text-neutral-950">
                ₹{(cart.finalPrice + 250).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Secure buy button footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#faf9f6]/95 border-t border-stone-200/60 p-6 backdrop-blur-md">
        <TouchableOpacity
          onPress={handleProcessSecurePayment}
          disabled={paying}
          className="w-full bg-neutral-950 py-4.5 rounded-full items-center justify-center flex-row space-x-2 shadow-xl shadow-neutral-950/10 cursor-pointer"
        >
          {paying ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <>
              <CreditCard size={14} color="white" />
              <Text className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                Deploy Razorpay Secure • ₹{(cart.finalPrice + 250).toLocaleString()}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
}
