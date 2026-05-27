import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Sparkles, ArrowRight, TrendingUp, Cpu, Compass } from "lucide-react-native";
import { useFitStore } from "../../store/useFitStore";

export default function MobileHomeScreen() {
  const router = useRouter();
  const activeProfile = useFitStore((state) => state.activeProfile);
  const categories = ["All", "Suits", "Blazers", "Dresses", "Shirts"];
  const [selectedCat, setSelectedCat] = React.useState("All");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#faf9f6" }} showsVerticalScrollIndicator={false}>
      
      {/* Header Profile Info Bar */}
      <View className="px-6 pt-14 pb-4 flex-row justify-between items-center bg-[#faf9f6]">
        <View>
          <Image
            source={require("../../assets/darzi-name-logo.png")}
            resizeMode="contain"
            style={{ width: 118, height: 40 }}
          />
          <Text className="text-lg font-serif italic text-neutral-900 mt-0.5">Namaste, Sanjana</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push("/profile")}
          className="w-10 h-10 rounded-full overflow-hidden border border-stone-200"
        >
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" }} 
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
      </View>

      {/* Hero Banner card */}
      <View className="px-6 mb-8 mt-2">
        <Pressable 
          onPress={() => router.push("/discover")}
          className="relative rounded-3xl overflow-hidden bg-neutral-900 aspect-[16/10] shadow-xl shadow-neutral-950/10"
        >
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800" }} 
            className="w-full h-full opacity-85"
            style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          />
          <View className="absolute inset-0 bg-neutral-950/40 p-6 justify-end">
            <Text className="text-[9px] font-mono text-[#c5a880] tracking-widest uppercase mb-1">Seasonal Atelier '26</Text>
            <Text className="text-2xl font-serif text-white italic tracking-wide leading-none">Design Your</Text>
            <Text className="text-2xl font-serif text-white font-bold leading-normal mb-3">Perfect Contour</Text>
            
            <View className="flex-row items-center space-x-1.5 self-start bg-[#c5a880] px-4 py-2.5 rounded-full">
              <Text className="text-[10px] font-mono text-white uppercase tracking-wider font-bold">Inspect Collection</Text>
              <ArrowRight size={10} color="white" />
            </View>
          </View>
        </Pressable>
      </View>

      {/* Active AI Fit Profile Status Card */}
      <View className="px-6 mb-8">
        <View className="bg-[#f5f3ef] border border-[#eae6df] rounded-3xl p-5 flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <View className="flex-row items-center space-x-1.5 mb-1.5">
              <Sparkles size={11} color="#c5a880" fill="#c5a880" />
              <Text className="text-[9px] font-mono tracking-widest uppercase text-[#c5a880] font-bold">Calibration Active</Text>
            </View>
            <Text className="text-xs font-serif italic text-neutral-950">
              {activeProfile ? `Matching: "${activeProfile.title}"` : "Enter Measurements for AI Sizing"}
            </Text>
            <Text className="text-[10px] text-stone-500 mt-1">
              {activeProfile 
                ? `Slim Fit • Chest: ${activeProfile.measurements.chest}" • Height: ${activeProfile.measurements.height}cm`
                : "Unlock flawless drapes with an 8-point 3D digital measurement."}
            </Text>
          </View>

          <TouchableOpacity 
            onPress={() => router.push("/measure")}
            className="bg-neutral-950 px-4 py-2.5 rounded-full"
          >
            <Text className="text-[9px] font-mono text-white uppercase tracking-wider font-bold">
              {activeProfile ? "Re-Calibrate" : "Measure AI"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Horizontal Category Pill Scroll */}
      <View className="mb-6">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
        >
          {categories.map((cat, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedCat(cat)}
              className={`mr-2 px-5 py-2.5 rounded-full border ${
                selectedCat === cat 
                  ? "bg-neutral-950 border-neutral-950 text-white" 
                  : "bg-white border-stone-200"
              }`}
            >
              <Text className={`font-mono text-[9px] uppercase tracking-wider font-bold ${
                selectedCat === cat ? "text-white" : "text-stone-600"
              }`}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Trending Collections Horizontal Row */}
      <View className="mb-8">
        <View className="px-6 flex-row justify-between items-end mb-4">
          <View>
            <Text className="text-[10px] font-mono tracking-widest text-[#c5a880] uppercase">Curations</Text>
            <Text className="text-base font-serif italic text-neutral-950 mt-0.5">Atelier Best Sellers</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/discover")} className="flex-row items-center">
            <Text className="text-[10px] font-mono text-[#c5a880] uppercase tracking-wider mr-1">See All</Text>
            <ArrowRight size={10} color="#c5a880" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
        >
          {TRENDING_POSTS.map((item, idx) => (
            <Pressable
              key={idx}
              onPress={() => router.push(`/product/${item.id}`)}
              className="mr-4 w-44 bg-white rounded-3xl border border-stone-150/50 overflow-hidden"
            >
              <View className="aspect-[4/5] bg-stone-100 relative">
                <Image 
                  source={{ uri: item.img }} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <View className="absolute top-3 left-3 bg-white/90 px-2 py-0.5 rounded-full border border-stone-200">
                  <Text className="text-[8px] font-mono text-neutral-900 uppercase tracking-widest font-bold">{item.cat}</Text>
                </View>
              </View>
              <View className="p-4 space-y-1">
                <Text className="font-serif text-xs font-semibold text-neutral-950 truncate">{item.name}</Text>
                <Text className="font-mono text-[9px] text-[#c5a880]">{item.tagline}</Text>
                <Text className="font-mono text-xs text-neutral-900 font-bold mt-1">₹{item.price.toLocaleString()}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Atelier Craft Philosophy Panel */}
      <View className="px-6 pb-12">
        <View className="bg-stone-50 border border-stone-200 rounded-3xl p-6 text-center items-center">
          <Text className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-2">Techno-Sartorial Manifesto</Text>
          <Text className="font-serif text-sm italic text-neutral-900 max-w-xs text-center leading-relaxed">
            "Zero standard sizes, zero physical alterations. Darzi maps complex body micro-hills natively using digital precision algorithms to cut premium natural loom textiles."
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}

const TRENDING_POSTS = [
  {
    id: "p-pragati",
    name: "Pragati Blazer",
    tagline: "Corporate Contour",
    cat: "Blazers",
    price: 9400,
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "p-heritage",
    name: "Heritage Banarasi",
    tagline: "Imperial Handloom",
    cat: "Suits",
    price: 16800,
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400"
  }
];
