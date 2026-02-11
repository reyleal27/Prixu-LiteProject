import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { useContext, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "@/src/context/AuthContext";
import AppButton from "@/src/components/AppButton";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { Colors } from "@/src/theme/colors";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function Signup() {
  const { signup } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
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

  const onSubmit = async (data: FormData) => {
    try {
      await signup(data);
      router.replace("/login");
      Toast.show({
        type: "success",
        text1: "Account created successfully!",
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Email already in use",
      });
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
        <Text style={styles.title}>Create Account</Text>

        {/* Name */}
        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Full Name"
              placeholderTextColor="#ffffff"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

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
              autoCapitalize="none"
              placeholderTextColor="#ffffff"
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
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
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
          <AppButton title="Sign Up" onPress={handleSubmit(onSubmit)} />
        </View>

        <Text style={styles.text}>
          Already registered?
          <Text style={styles.login} onPress={() => router.push("/login")}>
            {" "}
            Login
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
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: Colors.text,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    width: "80%",
    alignSelf: "center",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    color: Colors.secondary,
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  error: {
    color: "#ff3b30",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 38,
  },
  text: {
    marginTop: 12,
    textAlign: "center",
    color: "#666",
  },
  login: {
    color: "#007AFF",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  textContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 8,
  },
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
});
