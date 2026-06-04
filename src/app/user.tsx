import { Text, View } from 'react-native'
import { StyledText, StyledView } from '@/components/StyledComponents'
import { getCurrentUser } from '@/api/users'
import { useEffect, useState } from 'react'

const User = () => {
  const [user, setUser] = useState({})

  useEffect(() => {

    (async function () {
      const userData = await getCurrentUser()
      setUser(userData)
    })()
  }, [])

  return (
    <StyledView className='justify-center items-center'>
      <View className='items-center'>
        <StyledText className='text-2xl'>{user.firstName} {user.lastName}</StyledText>
        <StyledText className='mt-3'>{user.email}</StyledText>
      </View>
    </StyledView>
  )
}

export default User