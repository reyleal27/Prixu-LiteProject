import React from 'react'
import { View,Text, StyleSheet } from 'react-native';

import {EpisodeType} from '@/app/api/type/type';


const EpisodesCard:React.FC<EpisodeType> = ({ number, episodeTitle }) => {
  return (
    <View style={ styles.card }>
      <Text>{number}</Text>
      <Text>{episodeTitle}</Text>
    </View>
  )
}

export default EpisodesCard

const styles = StyleSheet.create({
    card: {
        padding: 10,
    }
})
