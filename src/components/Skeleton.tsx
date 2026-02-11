import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, ViewStyle } from "react-native";

interface SkeletonProps {
  width?: number | `${number}%` | "auto";
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width:
            typeof width === "number" ||
            width === "auto" ||
            (typeof width === "string" && /^\d+%$/.test(width))
              ? width
              : undefined,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const SkeletonCard: React.FC = () => (
  <View style={styles.card}>
    <View style={styles.cardRow}>
      <Skeleton width={48} height={48} borderRadius={24} />
      <View style={styles.cardText}>
        <Skeleton width={120} height={16} />
        <Skeleton width={80} height={12} style={{ marginTop: 8 }} />
      </View>
    </View>
  </View>
);

export const SkeletonListItem: React.FC = () => (
  <View style={styles.listItem}>
    <Skeleton width={44} height={44} borderRadius={22} />
    <View style={styles.listItemText}>
      <Skeleton width="70%" height={16} />
      <Skeleton width="40%" height={12} style={{ marginTop: 6 }} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  skeleton: { backgroundColor: "#E5E7EB" },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardRow: { flexDirection: "row", alignItems: "center" },
  cardText: { marginLeft: 12, flex: 1 },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 12,
  },
  listItemText: { flex: 1, marginLeft: 12 },
});
