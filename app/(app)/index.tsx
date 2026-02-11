// app/(app)/index.tsx
import AnimeCard from "@/src/components/AnimeCard";
import SearchBar from "@/src/components/SearchBar";
import { AuthContext } from "@/src/context/AuthContext";
import { Colors } from "@/src/theme/colors";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTrendingAnime, getTopAnime } from "../api";
import { Anime } from "../api/type/type";
import { Skeleton, SkeletonCard } from "@/src/components/Skeleton";

export default function Home() {
  const [topAnime, setTopAnime] = useState<Anime[]>([]);
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user } = useContext(AuthContext);

  const loadHomeData = async () => {
    try {
      const [topAnime] = await Promise.all([
        getTopAnime(),
        // getAnimeMovies(),
        // getPopularAnime(),
        getTrendingAnime(),
      ]);
      setTopAnime(topAnime.results);
      setTrendingAnime(topAnime.results);
      // setAnimeMovies(moviesAnime.results);
      // setPopularAnime(popularAnime.results);
      // setRecentAnime(recentAnime.results);
    } catch (error) {
      console.error("Failed to load anime home data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.brand}>
              What do you want to watch
              <Text style={{ color: Colors.primary, fontStyle: "italic" }}>
                {user?.name}
              </Text>
              ?
            </Text>
          </View>
          {/* Search */}
          <View style={styles.searchContainer}>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          </View>
          <Text style={styles.sectionTitle}>Top Anime</Text>

          {loading ? (
            <Skeleton width={100} height={200} borderRadius={8} />
          ): (
            <View style={styles.animeCardContainer}>
              {topAnime.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  image={anime.image}
                  title={anime.title}
                  totalEpisodes={anime.totalEpisodes}
                />
              ))}
            </View>
          )}

          <Text style={styles.sectionTitle}>Trending Anime</Text>
          <View style={styles.animeCardContainer}>
            {trendingAnime.map((anime) => (
              <AnimeCard
                key={anime.id}
                image={anime.image}
                title={anime.title}
                totalEpisodes={anime.totalEpisodes}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  header: {
    marginBottom: 24,
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.muted,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.secondary,
    marginBottom: 12,
    alignSelf: "center",
  },
  card: {
    backgroundColor: Colors.background,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 12,
    color: Colors.muted,
  },

  userStyle: {
    fontStyle: "italic",
    color: Colors.primary,
    fontSize: 24,
  },
  searchContainer: {
    marginBottom: 24,
  },
  animeCardContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 12,
  },
});
