import { Link } from 'expo-router'
import StyledText from '@/components/StyledText'
import StyledView from '@/components/StyledView'


const About = () => {
  return (
    <StyledView>
      <StyledText>About page</StyledText>
      <Link href={'/products'}>Go To Products page</Link>
    </StyledView>
  )
}

export default About