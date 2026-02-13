import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Video from "react-native-video";

interface VideoPlayerProps {
  source: string; // video URL
}

export default function VideoPlayer({ source }: VideoPlayerProps) {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />
      )}
      <Video
        source={{ uri: source }}
        style={styles.video}
        resizeMode="contain"
        onLoad={() => setLoading(false)}
        controls={true} // adds play/pause/seek controls
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loader: {
    position: "absolute",
    zIndex: 1,
  },
});
