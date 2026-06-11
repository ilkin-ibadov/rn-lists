import { StyledText, StyledView } from '@/components/StyledComponents'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera"
import { useNotificationPermission } from '@/hooks/useNotificationPermission'

const Scan = () => {
  useNotificationPermission()
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  const [result, setResult] = useState("")

  const handleScan = (scanResult: BarcodeScanningResult) => {
    if (scanned) return

    setScanned(true)
    setResult(scanResult.data)
    console.log("Type: ", scanResult.type)
    console.log("Data: ", scanResult.data)
  }

  const hasRequestedCamera = useRef(false)

  useEffect(() => {
    if (hasRequestedCamera.current || !permission) return
    if (!permission.granted && permission.canAskAgain) {
      hasRequestedCamera.current = true
      requestPermission()
    }
  }, [permission])

  return (
    <StyledView>
      {
        !permission?.granted ? <View className='flex-1 justify-center items-center'>
          <StyledText className='text-xl font-medium'>Camera permission is not granted</StyledText>
          <TouchableOpacity className='bg-blue-500 px-6 py-3 rounded-xl mt-5' onPress={requestPermission}>
            <StyledText className='text-white font-semibold'>Grant Permission</StyledText>
          </TouchableOpacity>
        </View>
          :
          <View className='flex-1 justify-center items-center'>
            <StyledText className='text-xl font-medium mb-5'>Scan the QR code to get started</StyledText>
            <CameraView
              style={{ width: 300, height: 300 }}
              facing='back'
              onBarcodeScanned={scanned ? undefined : handleScan}
            />
            {
              scanned && <View>
                <StyledText className='text-xl font-medium my-3'>{result}</StyledText>
                <TouchableOpacity
                  className='bg-blue-500 px-6 py-3 rounded-xl mt-5'
                  onPress={() => {
                    setScanned(false)
                    setResult("")
                  }}>
                  <StyledText className='text-white font-semibold'>Scan Again</StyledText>
                </TouchableOpacity>
              </View>
            }
          </View>

      }

    </StyledView>
  )
}

export default Scan