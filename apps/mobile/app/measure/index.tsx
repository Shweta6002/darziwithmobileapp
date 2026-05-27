import React from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import { Sparkles, ArrowLeft, Check, Compass, Cpu, HelpCircle } from "lucide-react-native";
import { useFitStore } from "../../store/useFitStore";

export default function MobileMeasurementFlow() {
  const router = useRouter();
  const addProfile = useFitStore((state) => state.addProfile);
  const setActiveProfile = useFitStore((state) => state.setActiveProfile);

  const [step, setStep] = React.useState(1);
  const [profileTitle, setProfileTitle] = React.useState("Custom Active Sizing");

  // Step numeric states
  const [height, setHeight] = React.useState("172");
  const [weight, setWeight] = React.useState("64");
  const [chest, setChest] = React.useState("36");
  const [waist, setWaist] = React.useState("30");
  const [seat, setSeat] = React.useState("38");
  const [shoulder, setShoulder] = React.useState("17.0");
  const [sleeve, setSleeve] = React.useState("Full Sleeve");

  const [preference, setPreference] = React.useState<"Slim Fit" | "Regular Fit" | "Relaxed Fit">("Slim Fit");

  const handleFinishCalibration = () => {
    const numHeight = Number(height) || 165;
    const numWeight = Number(weight) || 55;
    const numChest = Number(chest) || 34;
    const numWaist = Number(waist) || 28;
    const numSeat = Number(seat) || 36;
    const numShoulder = Number(shoulder) || 16.5;

    const newProfile = {
      id: "prof-" + Math.floor(100 + Math.random() * 900),
      title: profileTitle || "Bespoke Profile",
      fitPreference: preference,
      measurements: {
        height: numHeight,
        weight: numWeight,
        chest: numChest,
        waist: numWaist,
        seat: numSeat,
        shoulder: numShoulder,
        sleeveLength: sleeve
      },
      createdOn: new Date().toISOString().split("T")[0]
    };

    addProfile(newProfile);
    setActiveProfile(newProfile);

    Alert.alert(
      "TrueFit Calibrated",
      "Dynamic size mapped. We locked in bespoke modifications for your silhouette.",
      [{ text: "Continue To Details", onPress: () => router.back() }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#faf9f6" }}>
      
      {/* Banner Sticky Bar */}
      <View className="px-6 pt-14 pb-4 border-b border-stone-100 flex-row justify-between items-center bg-[#faf9f6]">
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-1 mr-1.5"
          >
            <ArrowLeft size={16} color="#17181c" />
          </TouchableOpacity>
          <View>
            <Text className="text-[8px] font-mono tracking-widest text-[#c5a880] uppercase">TrueFit 3D Core</Text>
            <Text className="text-sm font-serif italic text-neutral-900 font-bold">Calibration</Text>
          </View>
        </View>

        <View className="bg-neutral-950/5 px-3 py-1 rounded-full">
          <Text className="text-[9px] font-mono text-neutral-900">Step {step} of 4</Text>
        </View>
      </View>

      {/* Main Form Scroller */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 100 }}>
        
        {/* PROGRESS STEPPER HEADER INDICATORS */}
        <View className="flex-row space-x-1.5 mb-6">
          {[1,2,3,4].map((s) => (
            <View 
              key={s} 
              className={`flex-1 h-1 rounded-full ${
                step >= s ? "bg-neutral-950" : "bg-stone-200"
              }`} 
            />
          ))}
        </View>

        {/* STEP 1: KEY VITAL HEIGHT/WEIGHT STATS */}
        {step === 1 && (
          <View className="space-y-6">
            <View>
              <Text className="font-serif text-lg font-bold text-neutral-950">Primary Body Metrics</Text>
              <Text className="text-[11px] text-stone-500 mt-1">Our neural sizer starts modeling based on height and weight densities.</Text>
            </View>

            {/* Heights */}
            <View className="space-y-2">
              <Text className="text-[9px] font-mono uppercase text-stone-400 font-bold">Body Height (in cm)</Text>
              <TextInput
                keyboardType="numeric"
                maxLength={3}
                value={height}
                onChangeText={setHeight}
                placeholder="e.g. 172"
                className="bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#c5a880]"
              />
            </View>

            {/* Weights */}
            <View className="space-y-1.5">
              <Text className="text-[9px] font-mono uppercase text-stone-400 font-bold">Body Weight (in kg)</Text>
              <TextInput
                keyboardType="numeric"
                maxLength={3}
                value={weight}
                onChangeText={setWeight}
                placeholder="e.g. 64"
                className="bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#c5a880]"
              />
            </View>

            {/* Helpful illustration card */}
            <View className="bg-[#f5f3ef] border border-stone-200/60 rounded-2xl p-4 flex-row items-center space-x-3">
              <Cpu size={16} color="#c5a880" />
              <Text className="text-[9.5px] text-stone-600 flex-1 leading-relaxed">
                Height & density mapping enables our platform to estimate chest/seam targets with high (94%) precision.
              </Text>
            </View>
          </View>
        )}

        {/* STEP 2: MEASUREMENTS CORNERSTONE */}
        {step === 2 && (
          <View className="space-y-5">
            <View>
              <Text className="font-serif text-lg font-bold text-neutral-950">Cornerstone Seams</Text>
              <Text className="text-[11px] text-stone-500 mt-1">Provide exact measurements in inches or follow our AI recommendations.</Text>
            </View>

            {/* Inputs grid */}
            <View className="grid grid-cols-2 gap-4 flex-row flex-wrap">
              <View className="w-[47%] space-y-2 mb-3">
                <Text className="text-[9px] font-mono uppercase text-stone-400 block font-bold">Chest (inches)</Text>
                <TextInput
                  keyboardType="numeric"
                  value={chest}
                  onChangeText={setChest}
                  className="bg-white border border-stone-200 rounded-2xl p-3 text-xs text-neutral-900 font-mono"
                />
              </View>

              <View className="w-[47%] space-y-2 mb-3">
                <Text className="text-[9px] font-mono uppercase text-stone-400 block font-bold">Waist (inches)</Text>
                <TextInput
                  keyboardType="numeric"
                  value={waist}
                  onChangeText={setWaist}
                  className="bg-white border border-stone-200 rounded-2xl p-3 text-xs text-neutral-900 font-mono"
                />
              </View>

              <View className="w-[47%] space-y-2">
                <Text className="text-[9px] font-mono uppercase text-stone-400 block font-bold">Seat (inches)</Text>
                <TextInput
                  keyboardType="numeric"
                  value={seat}
                  onChangeText={setSeat}
                  className="bg-white border border-stone-200 rounded-2xl p-3 text-xs text-neutral-900 font-mono"
                />
              </View>

              <View className="w-[47%] space-y-2">
                <Text className="text-[9px] font-mono uppercase text-stone-400 block font-bold">Shoulder (inches)</Text>
                <TextInput
                  keyboardType="numeric"
                  value={shoulder}
                  onChangeText={setShoulder}
                  className="bg-white border border-stone-200 rounded-2xl p-3 text-xs text-neutral-900 font-mono"
                />
              </View>
            </View>
          </View>
        )}

        {/* STEP 3: FIT PREFERENCES */}
        {step === 3 && (
          <View className="space-y-6">
            <View>
              <Text className="font-serif text-lg font-bold text-neutral-950">Silhouette Flow Preference</Text>
              <Text className="text-[11px] text-stone-500 mt-1">Specify how much breathing allowance to append into drapes.</Text>
            </View>

            {/* Select preference buttons */}
            <View className="space-y-3">
              {(["Slim Fit", "Regular Fit", "Relaxed Fit"] as const).map((pref) => {
                const isSel = preference === pref;
                return (
                  <TouchableOpacity
                    key={pref}
                    onPress={() => setPreference(pref)}
                    className={`p-4 rounded-2xl border flex-row items-center justify-between ${
                      isSel ? "border-neutral-950 bg-neutral-950/5" : "border-stone-200 bg-white"
                    }`}
                  >
                    <View>
                      <Text className="font-serif text-xs font-bold text-neutral-900">{pref}</Text>
                      <Text className="text-[9.5px] text-stone-500 mt-0.5">
                        {pref === "Slim Fit" && "Close body tracking with crisp contoured seam dart lines."}
                        {pref === "Regular Fit" && "Balanced professional drapes with standard breathing allowance."}
                        {pref === "Relaxed Fit" && "Generous volumes emphasizing casual, comfortable drapes."}
                      </Text>
                    </View>
                    {isSel && <Check size={14} color="#17181c" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* STEP 4: LABELLING AND COMPLETE */}
        {step === 4 && (
          <View className="space-y-6">
            <View>
              <Text className="font-serif text-lg font-bold text-neutral-950">Label Sizing Blueprint</Text>
              <Text className="text-[11px] text-stone-500 mt-1">Append a descriptive title to distinguish profiles easily.</Text>
            </View>

            <View className="space-y-2">
              <Text className="text-[9px] font-mono uppercase text-[#c5a880] block font-bold">Profile Name *</Text>
              <TextInput
                value={profileTitle}
                onChangeText={setProfileTitle}
                placeholder="e.g. Work corporate regular"
                className="bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-xs text-neutral-900"
              />
            </View>

            {/* Recap Box info */}
            <View className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
              <Text className="text-[9px] font-mono uppercase text-stone-400 block tracking-wider font-bold">Aesthetic Calibration Summary</Text>
              
              <View className="space-y-1.5 text-xs">
                <Text className="text-stone-600">Density Estimation: Height {height}cm • Weight {weight}kg</Text>
                <Text className="text-stone-600">Chest Seam Allowance: {chest}" ({preference})</Text>
                <Text className="text-stone-600">Neck/Armhole Calibration: Auto Dynamic Balanced</Text>
              </View>
            </View>
          </View>
        )}

      </ScrollView>

      {/* Footer Navigation flow triggers */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#faf9f6]/95 border-t border-stone-200/60 p-6 flex-row space-x-3 items-center justify-between backdrop-blur-md">
        {step > 1 ? (
          <TouchableOpacity
            onPress={() => setStep(step - 1)}
            className="border border-stone-200 bg-white px-5 py-3.5 rounded-full"
          >
            <Text className="font-mono text-xs text-[#17181c] uppercase tracking-wider font-bold">Back</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        {step < 4 ? (
          <TouchableOpacity
            onPress={() => setStep(step + 1)}
            className="flex-1 bg-neutral-950 py-3.5 rounded-full items-center justify-center max-w-[200px]"
          >
            <Text className="font-mono text-xs text-white uppercase tracking-widest font-bold">Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleFinishCalibration}
            className="flex-1 bg-neutral-950 py-3.5 rounded-full items-center justify-center max-w-[200px] flex-row space-x-1.5"
          >
            <Sparkles size={11} color="white" fill="white" />
            <Text className="font-mono text-xs text-white uppercase tracking-widest font-bold">Calibrate Active</Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
}
