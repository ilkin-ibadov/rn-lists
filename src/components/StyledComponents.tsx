import { Text, View } from "react-native"
import { useMMKVBoolean } from 'react-native-mmkv'

export const StyledView = ({ children, className = '' }) => {
    const [darkmode, setDarkmode] = useMMKVBoolean('darkmode')

    return <View className={`flex-1 ${darkmode ? "bg-black" : "bg-white"} transition transform duration-300 ${className}`}>{children}</View>
}

export const StyledText = ({children, className = ''}) => {
    const [darkmode, setDarkmode] = useMMKVBoolean('darkmode')

    return <Text className={`${darkmode ? "text-white" : "text-black"} ${className}`}>{children}</Text>
}