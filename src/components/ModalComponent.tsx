import { TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';

const ModalComponent = ({ isModalVisible, setModalVisible, children }) => {
    return (
        <Modal
            onBackdropPress={() => setModalVisible(false)} // Closes when clicking outside
            swipeDirection="down" // Allows swiping down to close
            onSwipeComplete={() => setModalVisible(false)}
            style={styles.modal}
            isVisible={isModalVisible}>
            {children}
        </Modal>
    )
}

export default ModalComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0, // Ensures the content stretches edge-to-edge at the bottom
    },
    modalContent: {
        backgroundColor: 'white',
        paddingTop: 12,
        paddingHorizontal: 24,
        paddingBottom: 40, // Extra padding for safe area or spacing
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: '40%', // Adjust height threshold here
        alignItems: 'center',
    },
    bar: {
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 3,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
});