import { StyledText, StyledView } from '@/components/StyledComponents'
import { Button } from 'react-native'
import { useAuth } from '@/hooks/useAuth'

const Profile = () => {
  const { logout } = useAuth()

  return (
    <StyledView>
      <StyledText>Profile page</StyledText>
      <Button onPress={logout} title={'Log out'} />
    </StyledView>
  )
}

export default Profile