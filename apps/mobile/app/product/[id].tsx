import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Sparkles, ArrowLeft, Ruler, ShoppingBag, Palette, Flame, ShieldAlert } from "lucide-react-native";
import { useFitStore } from "../../store/useFitStore";
import { apiService } from "../../services/api";

export default function MobileProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { activeProfile, addToCart } = useFitStore();

  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState<any>(null);
  const [selectedFabric, setSelectedFabric] = React.useState<any>(null);
  const [selectedColor, setSelectedColor] = React.useState<any>(null);

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const data = await apiService.getProductById(id as string);
        setProduct(data);
        if (data) {
          // Initialize select states
          setSelectedFabric(MOCK_PREMIUM_FABRICS[0]);
          setSelectedColor(data.colors[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleCreateDraft = () => {
    if (!product || product.outOfStock) return;
    
    addToCart({
      product,
      fabric: selectedFabric,
      color: selectedColor,
      customizations: product.defaultCustomization || {},
      finalPrice: product.basePrice + (selectedFabric?.priceDelta || 0),
    });

    router.push("/checkout");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#faf9f6", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" color="#c5a880" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, backgroundColor: "#faf9f6", padding: 24, justifyContent: "center", alignItems: "center" }}>
        <Text className="font-serif italic text-stone-500">Silhouette mapping failed.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 px-4 py-2 bg-[#c5a880] rounded-full">
          <Text className="font-mono text-xs text-white">Back to Catalog</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#faf9f6" }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        
        {/* Banner with header controls */}
        <View className="relative aspect-square w-full bg-stone-100">
          <Image
            source={{ uri: product.imageUrl }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Header elements overlay */}
          <View className="absolute top-12 left-6 right-6 flex-row justify-between items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md justify-center items-center shadow-lg shadow-neutral-950/10 border border-stone-200"
            >
              <ArrowLeft size={16} color="#17181c" />
            </TouchableOpacity>
            
            <View className="bg-white/95 px-3 py-1.5 rounded-full border border-stone-200 backdrop-blur-md">
              <Text className="text-[8px] font-mono uppercase tracking-widest text-[#c5a880] font-bold">{product.category}</Text>
            </View>
          </View>
        </View>

        {/* Info panel section */}
        <View className="px-6 pt-6 space-y-6">
          <View>
            <View className="flex-row justify-between items-start flex-wrap gap-2">
              <Image
                source={require("../../assets/darzi-name-logo.png")}
                resizeMode="contain"
                style={{ width: 104, height: 28 }}
              />
              {product.outOfStock && (
                <View className="bg-red-50 border border-red-250 px-2.5 py-0.5 rounded-full">
                  <Text className="text-[8.5px] font-mono text-red-600 font-bold uppercase">OUT OF STOCK</Text>
                </View>
              )}
            </View>
            <Text className="font-serif text-2xl text-neutral-950 font-bold leading-tight mt-1">{product.name}</Text>
            <Text className="text-xs text-[#c5a881] font-mono italic mt-1">{product.tagline}</Text>
          </View>

          {/* Core Specs and descriptions */}
          <Text className="text-xs text-stone-600 leading-relaxed font-sans mt-2">
            {product.description}
          </Text>

          {/* AI TrueFit Advisor Container */}
          <View className="bg-[#f5f3ef] border border-[#eae6df] rounded-3xl p-4 space-y-2">
            <View className="flex-row items-center space-x-1.5">
              <Sparkles size={11} color="#c5a880" fill="#c5a880" />
              <Text className="text-[9px] font-mono tracking-widest uppercase text-[#c5a880] font-bold">Neural TrueFit Consult</Text>
            </View>
            
            {activeProfile ? (
              <View className="space-y-1">
                <Text className="text-[11px] text-neutral-900 leading-normal">
                  Matching silhouette against <Text className="font-bold">"{activeProfile.title}"</Text>
                </Text>
                <Text className="text-[9.5px] text-stone-500 leading-relaxed">
                  Based on height: {activeProfile.measurements.height}cm & weight: {activeProfile.measurements.weight}kg, we recommend standard bust dart tweaks of 0.5" in <Text className="text-[#c5a880] font-mono leading-none">Regular fit</Text> spacing mapping.
                </Text>
              </View>
            ) : (
              <View className="space-y-2">
                <Text className="text-[10px] text-stone-600">Please calibrate measurements to lock comfortable drapes.</Text>
                <TouchableOpacity 
                  onPress={() => router.push("/measure")}
                  className="self-start bg-neutral-950 px-3.5 py-1.5 rounded-full"
                >
                  <Text className="text-[8.5px] font-mono text-white uppercase tracking-wider font-bold">Launch Calibrator</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Fiber Selector */}
          <View className="space-y-3 pb-1">
            <View className="flex-row items-center space-x-1.5">
              <Palette size={11} color="#c5a880" />
              <Text className="text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold">1. Select Loom Textile Roll</Text>
            </View>
            <View className="flex-row flex-wrap">
              {MOCK_PREMIUM_FABRICS.map((fab) => {
                const isSel = selectedFabric?.id === fab.id;
                return (
                  <TouchableOpacity
                    key={fab.id}
                    onPress={() => setSelectedFabric(fab)}
                    className={`mr-2.5 mb-2 px-4 py-2 bg-white rounded-2xl border ${
                      isSel ? "border-neutral-950 bg-stone-50" : "border-stone-200"
                    }`}
                  >
                    <View className="flex-row items-center space-x-1.5">
                      <View className="w-2.5 h-2.5 rounded-full border border-stone-300" style={{ backgroundColor: fab.colorHex }} />
                      <Text className="text-[10px] font-mono text-neutral-900">{fab.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Color Tokens Selection */}
          <View className="space-y-3 pb-1">
            <View className="flex-row items-center space-x-1.5">
              <Palette size={11} color="#c5a880" />
              <Text className="text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold">2. Choose Fabric Shade Tone</Text>
            </View>
            <View className="flex-row flex-wrap">
              {product.colors.map((color: any, idx: number) => {
                const isSel = selectedColor?.name === color.name;
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedColor(color)}
                    className={`mr-2.5 mb-2 px-3 py-2 bg-white rounded-2xl border flex-row items-center space-x-1.5 ${
                      isSel ? "border-neutral-950 bg-stone-50" : "border-stone-200"
                    }`}
                  >
                    <View className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: color.hex }} />
                    <Text className="text-[10px] text-stone-700 font-mono">{color.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Footer floating bottom CTA */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#faf9f6]/95 border-t border-stone-200/60 p-6 flex-row items-center justify-between backdrop-blur-md">
        <View className="flex-column">
          <Text className="text-[8px] font-mono text-stone-400 uppercase">Estimated Bespoke Rate</Text>
          <Text className="text-xl font-mono text-neutral-900 font-bold">
            ₹{(product.basePrice + (selectedFabric?.priceDelta || 0)).toLocaleString()}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleCreateDraft}
          disabled={!!product.outOfStock}
          className={`px-8 py-4.5 rounded-full flex-row items-center space-x-2 shadow-xl ${
            product.outOfStock 
              ? "bg-stone-200 text-stone-400 cursor-not-allowed" 
              : "bg-neutral-950 hover:bg-neutral-850 shadow-neutral-950/10"
          }`}
        >
          <ShoppingBag size={14} color={product.outOfStock ? "#8e8a82" : "white"} />
          <Text className={`font-mono text-xs uppercase tracking-widest font-bold ${
            product.outOfStock ? "text-stone-400" : "text-white"
          }`}>
            {product.outOfStock ? "Sold Out" : "Bespoke Draft"}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const MOCK_PREMIUM_FABRICS = [
  { id: "f-crepe", name: "Imperial Moss Crepe", colorHex: "#e3dbca", priceDelta: 0 },
  { id: "f-silk", name: "Pure Mulberry Silk", colorHex: "#f0d5ab", priceDelta: 4500 },
];
