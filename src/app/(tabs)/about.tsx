import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const About = () => {
  return (
    <View>
      <Text>About page</Text>
      <Link href={'/products'}>Go To Products page</Link>
    </View>
  )
}

export default About

const styles = StyleSheet.create({})