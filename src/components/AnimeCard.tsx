import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../theme/colors";

type AnimeProps = {
  image: string;
  title: {
    english: string | null;
    userPreffered: string | null;
  };
  totalEpisodes: number;
  description?: string;
};

const AnimeCard: React.FC<AnimeProps> = ({
  image,
  title,
  totalEpisodes,
  description,
}) => {

    const getFirstSentence = (text:string) => {
      if (typeof text !== "string") return "";
      const match = text.match(/.*?[.!?](\s|$)/);
      return match ? match[0].trim() : text.trim();
    };
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.episodes}>{totalEpisodes} eps</Text>
      </View>
      <Text style={styles.title}>{title.english || title.userPreffered}</Text>
      <Text style={styles.description}>{getFirstSentence(description??"")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    cursor:"pointer"
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  episodes: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
      textAlign: "center",
    color: Colors.text
    },
    description: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
     textAlign: "center",
  }
});

export default AnimeCard;
