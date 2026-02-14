// app/(app)/index.tsx
import AnimeCard from "@/src/components/AnimeCard";
import SearchBar from "@/src/components/SearchBar";
import { Skeleton } from "@/src/components/Skeleton";
import { AuthContext } from "@/src/context/AuthContext";
import { Colors } from "@/src/theme/colors";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { getTopAnime, getTrendingAnime, searchAnime } from "../api";
import { Anime } from "../api/type/type";

export default function Home() {
  const [topAnime, setTopAnime] = useState<Anime[]>([]);
  const [searchResult, setSearchResult] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user } = useContext(AuthContext);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(searchQuery);

  const hasSearch = (searchQuery ?? "").trim().length > 0;
  const showTopAnime = !hasSearch;
  // const showSearchResult = hasSearch && searchResult.length > 0;
  // const showNotFound = hasSearch && searchResult.length === 0 && !loading;
  const showSearchResult = hasSearch && (searchResult?.length ?? 0) > 0;
  const showNotFound =
    hasSearch && (searchResult?.length ?? 0) === 0 && !loading;

  const loadHomeData = async () => {
    try {
      const [topAnime] = await Promise.all([getTopAnime(), getTrendingAnime()]);
      setTopAnime(topAnime.results);
      // setTrendingAnime(topAnime.results);
    } catch (error) {
      console.error("Failed to load anime home data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const results = await searchAnime(debouncedQuery);
      setSearchResult(results.results);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Search Failed",
        text2: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedQuery) return;
    handleSearch();
  }, [debouncedQuery]);

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
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              handleSearch={handleSearch}
            />
          </View>
          {showTopAnime ? (
            <Text style={styles.sectionTitle}>Top Anime</Text>
          ) : (
            <Text style={styles.sectionTitle}>Search Results</Text>
          )}

          <View style={styles.animeCardContainer}>
            {loading ? (
              <View style={styles.animeCardContainer}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <View key={index}>
                    <Skeleton width={100} height={100} borderRadius={8} />
                    <Skeleton
                      width={100}
                      height={20}
                      borderRadius={6}
                      style={{ marginTop: 8 }}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <>
                {/* ⭐ Show Top Anime */}
                {showTopAnime && (
                  <View style={styles.animeCardContainer}>
                    {topAnime.map((anime) => (
                      <Pressable
                        key={anime.id}
                        onPress={() =>
                          router.push({
                            pathname: "/(app)/(anime)/[id]",
                            params: { id: anime.id },
                          })
                        }
                      >
                        <AnimeCard
                          key={anime.id}
                          image={anime.image}
                          title={anime.title}
                          totalEpisodes={anime.totalEpisodes}
                        />
                      </Pressable>
                    ))}
                  </View>
                )}

                {/* ⭐ Show Search Results */}
                {showSearchResult && (
                  <View style={styles.animeCardContainer}>
                    {searchResult.map((anime) => (
                      <Pressable
                        key={anime.id}
                        onPress={() =>
                          router.push({
                            pathname: "/(app)/(anime)/[id]",
                            params: { id: anime.id },
                          })
                        }
                      >
                        <AnimeCard
                          key={anime.id}
                          image={anime.image}
                          title={anime.title}
                          totalEpisodes={anime.totalEpisodes}
                        />
                      </Pressable>
                    ))}
                  </View>
                )}

                {/* ⭐ Show Not Found */}
                {showNotFound && (
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 20,
                      color: "white",
                    }}
                  >
                    Anime not found
                  </Text>
                )}
              </>
            )}
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
