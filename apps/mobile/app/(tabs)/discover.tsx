import React from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react-native";
import { apiService } from "../../services/api";
import { Product } from "../../types";

export default function MobileDiscoverScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCat, setSelectedCat] = React.useState("All");
  const [items, setItems] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const categories = ["All", "Suits", "Blazers", "Trousers", "Dresses", "Shirts"];

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        setError("");
        setItems(await apiService.getProducts());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load catalog");
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredItems = items.filter(item => {
    const matchCat = selectedCat === "All" || item.category === selectedCat;
    const matchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#faf9f6" }}>
      
      {/* Search Header Container */}
      <View className="px-6 pt-14 pb-4 border-b border-stone-100 bg-[#faf9f6]">
        <Text className="text-[10px] font-mono tracking-widest text-[#c5a880] uppercase mb-0.5">Sartorial Catalog</Text>
        <Text className="text-xl font-serif text-neutral-900 italic font-semibold">Atelier Collections</Text>

        {/* Custom Search Input */}
        <View className="flex-row items-center bg-white border border-stone-200 rounded-2xl px-3.5 py-3 mt-4 space-x-2">
          <Search size={14} color="#8e8a82" />
          <TextInput
            placeholder="Search silhouettes, drapes, fabrics..."
            placeholderTextColor="#8e8a82"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-xs font-mono text-neutral-900 focus:outline-none"
          />
          <TouchableOpacity className="p-1">
            <SlidersHorizontal size={14} color="#17181c" />
          </TouchableOpacity>
        </View>

        {/* Scroll Category Pills */}
        <View className="flex-row items-center mt-4">
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedCat(item)}
                className={`mr-2 px-4 py-2 rounded-full border ${
                  selectedCat === item 
                    ? "bg-neutral-950 border-neutral-950" 
                    : "bg-stone-50 border-stone-150"
                }`}
              >
                <Text className={`font-mono text-[9px] uppercase tracking-wider font-bold ${
                  selectedCat === item ? "text-white" : "text-stone-500"
                }`}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* Product List Grid */}
      {isLoading ? (
        <View className="py-20 justify-center items-center">
          <ActivityIndicator size="small" color="#c5a880" />
        </View>
      ) : (
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListEmptyComponent={
          <View className="py-20 justify-center items-center text-center">
            <Text className="font-serif italic text-stone-500 text-sm">{error || "No silhouettes match search matrix"}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/product/${item.id}`)}
            className="w-[47%] bg-white border border-stone-150/70 rounded-3xl overflow-hidden mb-5 flex flex-col justify-between hover:shadow"
          >
            <View>
              {/* Image Frame */}
              <View className="aspect-square bg-stone-100 relative">
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: "100%", height: "100%", opacity: item.outOfStock ? 0.6 : 1 }}
                  className=""
                />
                
                {/* Out Of Stock Badge overlay */}
                {item.outOfStock && (
                  <View className="absolute inset-0 bg-black/10 justify-center items-center">
                    <View className="bg-red-650 px-2.5 py-1 rounded-full border border-red-500 shadow-md">
                      <Text className="text-[7.5px] font-mono uppercase text-white font-bold tracking-widest">Out of Stock</Text>
                    </View>
                  </View>
                )}
                
                <View className="absolute top-3 left-3 bg-white/90 px-2 py-0.5 rounded-full border border-stone-1.5 shadow-sm">
                  <Text className="text-[7.5px] font-mono uppercase text-neutral-900 tracking-wider font-bold">{item.category}</Text>
                </View>
              </View>

              {/* Text Fields */}
              <View className="p-3.5 space-y-1">
                <Text className="font-serif text-sm font-semibold text-neutral-990 leading-tight truncate">{item.name}</Text>
                <Text className="text-[9px] text-[#c5a880] font-mono truncate">{item.tagline}</Text>
              </View>
            </View>

            {/* Bottom Panel */}
            <View className="bg-stone-50 px-3.5 py-3 border-t border-stone-100/70 flex-row justify-between items-center">
              <Text className="font-mono text-xs font-bold text-neutral-950">₹{item.basePrice.toLocaleString()}</Text>
              <View className="flex-row items-center space-x-0.5 bg-neutral-950/5 px-2 py-0.5 rounded-full">
                <Sparkles size={8} color="#c5a880" fill="#c5a880" />
                <Text className="text-[7px] font-mono text-[#c5a880]">FIT</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
      )}

    </View>
  );
}
