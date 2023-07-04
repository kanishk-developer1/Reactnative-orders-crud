import { React, useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { addDoc, collection } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase, { db } from '../../database/firebasedb';
import { AuthContext } from '../../context/auth-context';
import AuthService from '../../services/authService';
import { STATUS_CONST } from '../../utilities/constants/App.const';

const CreateOrderScreen = ({ navigation }) => {
    const authService = new AuthService();
    const authContext = useContext(AuthContext);

    const initialState = {
        productId: '',
        productName: ''
    }
    const [orderState, setOrderState] = useState(initialState);

    const updateStateVal = (val, prop) => {
        setOrderState({ ...orderState, [prop]: val });
    }

    const onCreateOrder = async () => {
        if (!orderState.productId || !orderState.productName) {
            Alert.alert(`Fields Shouldn't be Empty!`);
        } else {
            authContext.setLoading(true);
            const addColRef = collection(db, 'Orders')
            await addDoc(addColRef, {
                ProductId: orderState.productId,
                ProductName: orderState.productName,
                Status: STATUS_CONST.RECEIVED
            }).then((response) => {
                setOrderState(initialState);
                Alert.alert(`Order Created Succesfully!`);
            }).catch((error) => {
                console.log(error)
                Alert.alert('Status Update Failed!');
            })
            .finally(() => authContext.setLoading(false))
        }
    }

    return (
        authContext.loading ?
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
            :
            <View
                style={styles.container}
            >
                <TextInput
                    placeholder='Product Id'
                    style={styles.inputStyle}
                    value={orderState.productId}
                    onChangeText={(val) => updateStateVal(val, 'productId')}
                ></TextInput>
                <TextInput
                    placeholder='Product Name'
                    style={styles.inputStyle}
                    value={orderState.productName}
                    onChangeText={(val) => updateStateVal(val, 'productName')}
                >
                </TextInput>
                <Button
                    color="#f65610"
                    title="Create Order"
                    onPress={onCreateOrder}
                />
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Orders', { type: '' }) }}>
                    <Text style={styles.textStyle}>View Orders<Icon name="rocket" size={15} /></Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        elevation: 5,
        borderRadius: 0,
        paddingVertical: 1,
        paddingHorizontal: 12,
        marginVertical: 10,
        width: '100%',
        backgroundColor: '#9F2B68',
        display: 'flex',
        alignItems:'center'
    },
    textStyle: {
        fontSize: 15,
        fontWeight: 700,
        paddingBottom: 10,
        color: '#fff',
    },
})

export default CreateOrderScreen;