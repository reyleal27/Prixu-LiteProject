import { CharactersProps } from '@/app/api/type/type'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../theme/colors'



const CharacterCard: React.FC<CharactersProps> = ({
    name,image
}) => {
  return (
      <View style={styles.card}>
          <View style={styles.imageContainer}>
              
          <Image source={{ uri: image }} style={styles.image} />
          </View>
          <Text style={styles.text}>{name.full}</Text>
         </View>
  )
}

export default CharacterCard

const styles = StyleSheet.create({
  card: {
    width: 100,
    cursor: "pointer",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  text: {
    color: Colors.secondary,
    fontSize: 16,
    alignSelf:"center"
  },
});