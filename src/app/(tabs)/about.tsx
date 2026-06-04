import { Link } from 'expo-router'
import { StyledText, StyledView } from '@/components/StyledComponents'


const About = () => {
  return (
    <StyledView>
      <StyledText>About page</StyledText>
      <Link href={'/products'}>Go To Products page</Link>
    </StyledView>
  )
}

export default About