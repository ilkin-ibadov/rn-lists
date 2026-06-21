import { Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera"
import { useNotificationPermission } from '@/hooks/useNotificationPermission'

const Scan = () => {
    const notificationPermitted = useNotificationPermission()
    const [permission, requestPermission] = useCameraPermissions()
    const [scanned, setScanned] = useState(false)
    const [result, setResult] = useState("")
    const hasRequestedCamera = useRef(false)

    const handleScan = (scanResult: BarcodeScanningResult) => {
        if (scanned) return

        setScanned(true)
        setResult(scanResult.data)
    }

    useEffect(() => {
        if (hasRequestedCamera.current || !permission) return

        if (!permission.granted && permission.canAskAgain) {
            hasRequestedCamera.current = true
            requestPermission()
        }
    }, [permission])

    return (
        <View className='flex-1 justify-center items-center'>
            {permission?.granted ? <View>
                <Text className='text-4xl text-center mb-5'>Scan QR</Text>
                <CameraView
                    style={{ width: 300, height: 300 }}
                    facing='back'
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr', 'aztec', 'codabar', 'code128', 'code39', 'code93', 'datamatrix', 'ean13', 'ean8', 'itf14', 'pdf417', 'upc_a', 'upc_e']
                    }}
                    onBarcodeScanned={scanned ? undefined : handleScan}
                />
            </View>
                :
                <Text className='text-zinc-500'>Permission denied, change in settings</Text>}
        </View>
    )
}

export default Scan