import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ruler, Sparkles, FolderOpen, MapPin, ChevronRight, LogOut, Trash2 } from "lucide-react-native";
import { useFitStore } from "../../store/useFitStore";

export default function MobileProfileScreen() {
  const router = useRouter();
  const { savedProfiles, activeProfile, setActiveProfile, deleteProfile } = useFitStore();

  const handleApplyActiveProfile = (profile: any) => {
    setActiveProfile(profile);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#faf9f6" }} showsVerticalScrollIndicator={false}>
      
      {/* User Card Frame */}
      <View className="pt-16 pb-8 px-6 bg-[#faf9f6] border-b border-stone-100 flex-column items-center">
        <View className="w-20 h-20 rounded-full overflow-hidden border border-stone-200 bg-white mb-3">
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text className="font-serif text-lg text-neutral-950 font-bold leading-normal">Sanjana Sen</Text>
        <Text className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-1">sanjana.sen@corp.in</Text>
        <View className="bg-[#c5a880]/10 border border-[#c5a880]/30 px-3 py-0.5 rounded-full mt-2">
          <Text className="text-[8px] font-mono uppercase text-[#c5a880] font-bold">Atelier Advocate</Text>
        </View>
      </View>

      {/* Sizing Profile Catalog List */}
      <View className="p-6 space-y-4">
        
        <View className="flex-row justify-between items-center mb-1">
          <View>
            <Text className="text-[9px] font-mono uppercase tracking-widest text-[#c5a880] font-bold">Size Database</Text>
            <Text className="text-sm font-serif italic text-neutral-900 mt-0.5">Digital Sizing Profiles</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/measure")}
            className="border border-[#c5a880]/50 px-3.5 py-1.5 rounded-full"
          >
            <Text className="text-[9px] font-mono text-[#c5a880] uppercase tracking-wider font-bold">+ New Size</Text>
          </TouchableOpacity>
        </View>

        {/* Saved Profiles Items */}
        {savedProfiles.map((item) => {
          const isActive = activeProfile?.id === item.id;
          return (
            <View 
              key={item.id} 
              className={`rounded-3xl border p-4 flex-col justify-between ${
                isActive 
                  ? "bg-neutral-950 border-neutral-950 shadow-md shadow-neutral-950/10 text-white" 
                  : "bg-white border-stone-150"
              }`}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-2">
                  <View className="flex-row items-center space-x-1.5">
                    {isActive ? (
                      <Sparkles size={11} color="#c5a880" fill="#c5a880" />
                    ) : (
                      <Ruler size={11} color="#8e8a82" />
                    )}
                    <Text className={`font-serif text-sm font-bold truncate ${
                      isActive ? "text-white" : "text-neutral-900"
                    }`}>
                      {item.title}
                    </Text>
                  </View>
                  
                  <Text className={`text-[10px] font-mono uppercase tracking-wider mt-1 ${
                    isActive ? "text-stone-300" : "text-stone-400"
                  }`}>
                    {item.fitPreference} • H:{item.measurements.height}cm • W:{item.measurements.weight}kg
                  </Text>
                </View>

                {/* Sizing indicators check list */}
                {isActive && (
                  <View className="bg-[#c5a880]/20 border border-[#c5a880]/40 px-2 py-0.5 rounded-full flex-shrink-0">
                    <Text className="text-[8px] font-mono text-[#c5a885] font-bold uppercase">ACTIVE ENGINE</Text>
                  </View>
                )}
              </View>

              {/* Multi data grids */}
              <View className="grid grid-cols-4 gap-2 py-3.5 border-t border-stone-200/20 mt-3.5 flex-row">
                <View className="flex-1">
                  <Text className={`text-[8px] font-mono ${isActive ? "text-stone-400" : "text-stone-400"}`}>CHEST</Text>
                  <Text className={`text-xs font-mono font-bold mt-0.5 ${isActive ? "text-white" : "text-neutral-950"}`}>
                    {item.measurements.chest || "-"}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className={`text-[8px] font-mono ${isActive ? "text-stone-400" : "text-stone-400"}`}>WAIST</Text>
                  <Text className={`text-xs font-mono font-bold mt-0.5 ${isActive ? "text-white" : "text-neutral-950"}`}>
                    {item.measurements.waist || "-"}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className={`text-[8px] font-mono ${isActive ? "text-stone-400" : "text-stone-400"}`}>SEAT</Text>
                  <Text className={`text-xs font-mono font-bold mt-0.5 ${isActive ? "text-white" : "text-neutral-950"}`}>
                    {item.measurements.seat || "-"}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className={`text-[8px] font-mono ${isActive ? "text-stone-400" : "text-stone-400"}`}>SLEEVE</Text>
                  <Text className={`text-xs font-mono font-bold mt-0.5 ${isActive ? "text-white" : "text-neutral-950"}`}>
                    {item.measurements.sleeveLength || "Full"}
                  </Text>
                </View>
              </View>

              {/* Use or Delete triggers */}
              <View className={`border-t flex-row justify-between pt-3 items-center ${
                isActive ? "border-stone-800" : "border-stone-100"
              }`}>
                {!isActive ? (
                  <TouchableOpacity 
                    onPress={() => handleApplyActiveProfile(item)}
                    className="flex-row items-center space-x-1"
                  >
                    <Text className="text-[10px] font-mono text-[#c5a880] uppercase font-bold tracking-wider">Use Profile</Text>
                    <ChevronRight size={10} color="#c5a880" />
                  </TouchableOpacity>
                ) : (
                  <Text className="text-[9px] font-mono text-[#c5a880] tracking-wider uppercase font-bold">Applied for Next Order</Text>
                )}

                {savedProfiles.length > 1 && (
                  <TouchableOpacity 
                    onPress={() => {
                      Alert.alert(
                        "Delete Profile",
                        `Are you sure you want to permanently delete size profile "${item.title}"?`,
                        [
                          { text: "Cancel", style: "cancel" },
                          { text: "Delete Permanently", style: "destructive", onPress: () => deleteProfile(item.id) }
                        ]
                      );
                    }}
                    className="p-1"
                  >
                    <Trash2 size={13} color={isActive ? "#ef4444" : "#8e8a82"} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}

        {/* Regular Settings list items mimicking luxury specs */}
        <View className="pt-6 space-y-3">
          <Text className="text-[9px] font-mono uppercase tracking-widest text-[#c5a880] font-bold">Account and Settings</Text>

          <Pressable className="bg-white px-5 py-4 rounded-2xl border border-stone-150 flex-row justify-between items-center">
            <View className="flex-row items-center space-x-3">
              <MapPin size={15} color="#8e8a82" />
              <Text className="text-xs text-neutral-900 font-bold">Shipping Address Vault</Text>
            </View>
            <ChevronRight size={14} color="#eae6df" />
          </Pressable>

          <Pressable className="bg-white px-5 py-4 rounded-2xl border border-stone-150 flex-row justify-between items-center">
            <View className="flex-row items-center space-x-3">
              <FolderOpen size={15} color="#8e8a82" />
              <Text className="text-xs text-neutral-900 font-bold">Wishlist Blueprints</Text>
            </View>
            <ChevronRight size={14} color="#eae6df" />
          </Pressable>

          <TouchableOpacity className="bg-stone-50 border border-red-100 flex-row justify-center py-4 rounded-2xl items-center mt-4">
            <LogOut size={14} color="#ef4444" />
            <Text className="text-xs text-red-600 font-mono uppercase tracking-widest font-bold ml-2">Sign Out Applet</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}
