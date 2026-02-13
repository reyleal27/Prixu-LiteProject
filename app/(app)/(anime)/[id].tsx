import { View, Text, StyleSheet, Image, FlatList, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getAnimeDetails, getAnimeEpisodes, getEpisodeStream } from "@/app/api";
import EpisodesCard from "@/src/components/EpisodesCard";
import { Colors } from "@/src/theme/colors";
import { Anime, CharactersProps, EpisodeType } from "@/app/api/type/type";
import CharacterCard from "@/src/components/CharacterCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnimeDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [animeCharacter, setAnimeCharacters] = useState<CharactersProps[]>([]);
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
  const [streamURL, setStreamURL] = useState<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [details, episodes] = await Promise.all([
          getAnimeDetails(id),
          getAnimeEpisodes(id),
        ]);
        setAnime(details);
        setEpisodes(episodes);
        setAnimeCharacters(details.characters);
      } catch (error) {
        console.error("Failed to load anime:", error);
      }
    };
    fetchData();
  }, [id]);

  console.log(animeCharacter[0]);

  console.log("anime", anime);
  // console.log("episode",episodes)
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Anime Details Section */}
        {anime && (
          <View style={styles.detailsSection}>
            <Text style={styles.title}>
              {anime.title.english}
            </Text>
            <Image source={{ uri: anime.image }} style={styles.image} />
            <Text style={styles.description}>{anime.description}</Text>
          </View>
        )}

        {/* Characters Section */}
        {animeCharacter && animeCharacter.length > 0 && (
          <View style={styles.charactersSection}>
            <Text style={styles.sectionTitle}>Characters</Text>
            <View style={styles.characterCardContainer}>
              {animeCharacter.map((character, index) => (
                <CharacterCard
                  key={character.name?.full || index}
                  name={character.name}
                  image={character.image}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
)}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24, // Extra padding at bottom
  },
  detailsSection: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
  },
  charactersSection: {
    padding: 16,
    paddingTop: 8,
  
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },
  characterCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent:"space-around"
  },
});