import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ShieldCheck, Truck, Clock, Palette, Ruler, RefreshCw } from "lucide-react-native";
import { useFitStore } from "../../store/useFitStore";

export default function MobileOrdersScreen() {
  const orders = useFitStore((state) => state.orders);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#faf9f6" }} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View className="px-6 pt-14 pb-4 border-b border-stone-100 bg-[#faf9f6]">
        <Text className="text-[10px] font-mono tracking-widest text-[#c5a880] uppercase">Progress Tracking</Text>
        <Text className="text-xl font-serif text-neutral-900 italic font-semibold mt-0.5">My Custom Orders</Text>
      </View>

      <View className="p-6 space-y-6">
        {orders.length === 0 ? (
          <View className="bg-white rounded-3xl p-8 border border-stone-150 text-center items-center py-20 justify-center">
            <Clock size={32} color="#c5a880" strokeWidth={1.5} />
            <Text className="font-serif text-sm italic text-neutral-950 mt-4 text-center">Bespoke Rack is Currently Empty</Text>
            <Text className="text-xs text-stone-500 text-center mt-1">Configure sizing silhouettes in Atelier mode to queue drapes.</Text>
          </View>
        ) : (
          orders.map((order, idx) => {
            // Milestone indexing
            const milestones = [
              { stage: "Order Received", desc: "Digital pattern drafted and registered.", active: true },
              { stage: "Atelier Drafted", desc: "Digital seam boundaries sliced.", active: order.status !== "Order Received" },
              { stage: "Stitching Process", desc: "Aesthetic sewing by master tailors.", active: ["Stitching Process", "Quality Check", "Bespoke Dispatched", "Delivered"].includes(order.status) },
              { stage: "Quality Check", desc: "Friction checks against size targets.", active: ["Quality Check", "Bespoke Dispatched", "Delivered"].includes(order.status) },
              { stage: "Shipped", desc: "Packed in climate control premium casing.", active: ["Bespoke Dispatched", "Delivered"].includes(order.status) }
            ];

            return (
              <View key={idx} className="bg-white rounded-3xl border border-stone-200/95 overflow-hidden shadow-lg shadow-stone-100/50">
                
                {/* Lower meta row */}
                <View className="bg-[#f5f3ef]/50 px-5 py-4 border-b border-stone-200/55 flex-row justify-between items-center">
                  <View>
                    <Text className="text-[11px] font-mono text-neutral-950 font-bold uppercase">{order.product.name}</Text>
                    <Text className="text-[8px] font-mono text-stone-400 uppercase mt-0.5">Drape ID: {order.id}</Text>
                  </View>
                  <View className="items-end bg-[#c5a880]/10 px-3 py-1.5 rounded-full border border-[#c5a880]/30">
                    <Text className="text-[9px] font-mono text-[#c5a880] font-bold uppercase">{order.status}</Text>
                  </View>
                </View>

                {/* Info pane */}
                <View className="p-5 space-y-4">
                  
                  {/* Textile and design details summary */}
                  <View className="bg-stone-50/70 p-3 rounded-2xl border border-stone-150 flex-row justify-between">
                    <View className="space-y-1.5 flex-1 pr-1.5">
                      <View className="flex-row items-center space-x-1">
                        <Palette size={10} color="#c5a880" />
                        <Text className="text-[8px] font-mono text-stone-400 uppercase">Textile Accent</Text>
                      </View>
                      <Text className="text-[10px] text-neutral-900 font-bold truncate leading-none">{order.selectedFabric.name}</Text>
                      <Text className="text-[9px] text-[#c5a885] font-mono leading-none">Color: {order.selectedColor.name}</Text>
                    </View>

                    <View className="space-y-1.5 flex-1 pl-1.5 border-l border-stone-200">
                      <View className="flex-row items-center space-x-1">
                        <Ruler size={10} color="#c5a880" />
                        <Text className="text-[8px] font-mono text-stone-400 uppercase">Sizing Profile</Text>
                      </View>
                      <Text className="text-[10px] text-neutral-900 font-bold truncate leading-none">{order.fitProfile.title}</Text>
                      <Text className="text-[9px] text-stone-500 font-mono leading-none">Preference: {order.fitProfile.fitPreference}</Text>
                    </View>
                  </View>

                  {/* Tailoring Pipeline Status Track */}
                  <View className="space-y-3.5 pt-2">
                    <Text className="text-[9px] font-mono text-stone-400 uppercase tracking-widest font-bold">Atelier Seam Pipeline</Text>
                    
                    <View className="space-y-4 relative pl-5">
                      {/* Left timeline axis */}
                      <View className="absolute left-[7px] top-[4px] bottom-[4px] w-[1.5px] bg-[#eae6df]" />

                      {milestones.map((ms, msIdx) => (
                        <View key={msIdx} className="relative">
                          {/* Circle Dot */}
                          <View className={`absolute -left-5 top-1.5 w-[14.5px] h-[14.5px] rounded-full border-2 justify-center items-center ${
                            ms.active 
                              ? "bg-neutral-950 border-neutral-950 shadow-md" 
                              : "bg-white border-stone-200"
                          }`}>
                            {ms.active && <View className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </View>

                          <View className="space-y-0.5">
                            <Text className={`text-xs ml-0.5 ${ms.active ? "font-bold text-neutral-900" : "text-stone-400"}`}>
                              {ms.stage}
                            </Text>
                            <Text className="text-[9.5px] text-stone-500 leading-relaxed max-w-sm pl-0.5">
                              {ms.desc}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Security Delivery and ETA tag */}
                  <View className="border-t border-stone-100/80 pt-4 flex-row justify-between items-center">
                    <View className="flex-row items-center space-x-1.5">
                      <Clock size={12} color="#8e8a82" />
                      <Text className="text-[9px] font-mono text-stone-500 uppercase">Delivery Target ETA</Text>
                    </View>
                    <Text className="text-xs font-mono font-bold text-neutral-950">{order.estimatedDelivery}</Text>
                  </View>

                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
