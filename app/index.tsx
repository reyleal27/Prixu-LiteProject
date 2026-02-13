
// app/index.tsx
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { useContext, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import AppButton from "@/src/components/AppButton";
import { Colors } from "@/src/theme/colors";
import { AuthContext } from "@/src/context/AuthContext";

export default function Welcome() {
  const { token, user, loading } = useContext(AuthContext);
  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(40)).current;
  const imageScale = useRef(new Animated.Value(0.8)).current;

  
   useEffect(() => {
     if (loading) return;

     // User NOT logged in
     if (!token && !user) {
       router.replace("/(auth)/login");
     }
     // User logged in
     else if (token && user) {
       router.replace("/(app)");
     }
   }, [token, user, loading]);
  

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fade,
            transform: [{ translateY: slide }],
          },
        ]}
      >
        {/* Image */}
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [{ scale: imageScale }],
            },
          ]}
        >
          <Image
            source={require("@/assets/images/onboarding.jpg")} // Add your image
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Title and Description */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Prixu-Lite</Text>
          <Text style={styles.subtitle}>
          Watch everything you want for free!
          </Text>
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <AppButton
            title="Enter Now"
            onPress={() => router.push("/login")}
          />
          
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 60,
    // paddingHorizontal: 24,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: 350,
  },
  image: {
    width: "100%",
   resizeMode: "cover",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: Colors.muted,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "80%",
      gap: 16,
  },
  signupText: {
    fontSize: 14,
    color: Colors.muted,
    textAlign: "center",
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: "600",
  },
});