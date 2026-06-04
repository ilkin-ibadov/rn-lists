import { StyledText, StyledView } from '@/components/StyledComponents'
import { Button } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'

const Profile = () => {
  const [accessToken, setAccessToken] = useMMKVString('accessToken')

  return (
    <StyledView>
      <StyledText>Profile page</StyledText>
      <Button onPress={() => {
        setAccessToken('')
      }} title={'Log out'} />
    </StyledView>
  )
}

export default Profile