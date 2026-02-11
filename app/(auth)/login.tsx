import AppButton from "@/src/components/AppButton";
import { AuthContext } from "@/src/context/AuthContext";
import { Colors } from "@/src/theme/colors";
import { router } from "expo-router";
import { useContext, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { login } = useContext(AuthContext);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(40)).current;
  const imageScale = useRef(new Animated.Value(0.8)).current;

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

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
      // Navigate after successful login
      router.replace("/(app)");
      console.log("Login successful");
      Toast.show({
        type: "success",
        text1: "Logged in successfully!",
      });
    } catch (e) {
      setError("root", {
        type: "manual",
        message: "Invalid email or password",
      });
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "Invalid email or password",
      });
      console.log("Login failed", e);
    }
  };
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
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [{ scale: imageScale }],
            },
          ]}
        >
          <Image
            source={require("@/assets/images/login.jpg")} // Add your image
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.textContent}>
          <Text style={styles.title}>Login</Text>

          {/* Email */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Email"
                placeholderTextColor="#ffffff"
                autoCapitalize="none"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}

          {/* Password */}
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Password"
                placeholderTextColor="#ffffff"
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          <View style={{ width: "80%", alignSelf: "center" }}>
            <AppButton
              title={isSubmitting ? "Logging in..." : "Login"}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <Text style={styles.text}>
            Don’t have an account?
            <Text style={styles.signup} onPress={() => router.push("/signup")}>
              {" "}
              Sign up
            </Text>
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: "center",
        backgroundColor: Colors.background,
  },
  content: {
      flex: 1,
      gap: 8,
  },
//   textContent: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 24,
//     gap: 12,
//   },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
      maxHeight: 350,
    position:"absolute"
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    opacity: 0.6,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 10,
    color: Colors.secondary,
    width: "80%",
    alignSelf: "center",
      marginTop: 8,
    
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  error: {
    color: "#ff3b30",
    fontSize: 12,
      marginLeft: 38,
   
  },
  text: {
    textAlign: "center",
    color: "#666",
  },
  signup: {
    color: "#007AFF",
    fontWeight: "600",
  },
    textContent: {
      marginTop: 20,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 8,
  },
});
