import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TouchableOpacity, Alert } from 'react-native';
import { updateDoc, doc } from "firebase/firestore";
import firebase, { db } from '../../database/firebasedb';
import { NEXT_STATUS_CONST, NEXT_STATUS_BTN_CONST, STATUS_CONST } from '../../utilities/constants/App.const';
import { AuthContext } from '../../context/auth-context';

const OrderDetailsScreen = ({ route, navigation }) => {
    const authContext = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [ordersList, setOrdersList] = useState([]);
    const { type } = route.params;

    const fetchOrders = async () => {
        setIsLoading(true);
        const ref = type ?  firebase.firestore().collection('Orders').where('Status', '==', type) : firebase.firestore().collection('Orders');
        await ref
            .get()
            .then((querySnapshot) => {
                console.log(querySnapshot.docs);
                const ordersData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), OrderId: doc.id }));
                setOrdersList(ordersData);
            }).finally(() => setIsLoading(false));

        // await getDocs(collection(db, "Orders"))
        //     .then((querySnapshot) => {
        //         const ordersData = querySnapshot.docs
        //             .map((doc) => ({ ...doc.data(), OrderId: doc.id }));
        //         setOrdersList(ordersData);
        //     }).finally(() => setIsLoading(false))
    }

    const updateOrderStatus = async (orderId) => {
        setIsLoading(true);
        const updateColRef = doc(db, 'Orders', orderId)
        await updateDoc(updateColRef, {
            Status: NEXT_STATUS_CONST[type]
        }).then((response) => {
            Alert.alert(`Order ${NEXT_STATUS_CONST[type]} Succesfully!`);
            fetchOrders();
        }).catch((error) => {
            Alert.alert('Status Update Failed!');
        })
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        isLoading ? <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E" />
        </View> :
            <>
                <View>
                    <Text style={styles.headingText}>{!type ? 'All Orders' : `Orders ${type}`}</Text>
                </View>

                {!ordersList.length ? <View>
                    <Text style={styles.noData}>No Orders Found!</Text>
                </View> : <ScrollView style={styles.container}>
                    {ordersList.map((item, i) =>
                        <View key={i} style={styles.itemContainer}>
                            <View>
                                <Text style={styles.orderTextStyle}>Order ID - {item.OrderId}</Text>
                                <Text style={styles.orderTextStyle}>Product Name- {item.ProductName}</Text>
                                <Text style={styles.orderTextStyle}>Product ID- {item.ProductId}</Text>
                                <View style={{display: 'flex', flexDirection: 'row', gap: 5, justifyContent: 'flex-start', width: '100%'}}>
                                <TouchableOpacity style={{ marginTop: 20 }}>
                                    <Text style={styles.statusBtn}>{item.Status}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate('Tracking-Order',{order: {...item, index: Object.keys(STATUS_CONST).findIndex(itm => itm === item.Status.toUpperCase())}})}>
                                    <Text style={{...styles.statusBtn, backgroundColor: '#85cf69'}}>View History</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                            {(type && ((type !== STATUS_CONST.DELIVERED && authContext.authData.role === "Manufacturer") || ((type !== STATUS_CONST.VERIFIED && type !== STATUS_CONST.RECEIVED) && authContext.authData.role === "Hospital-Schedular"))) && <TouchableOpacity onPress={() => updateOrderStatus(item.OrderId)}>
                                <Text style={styles.button}>{NEXT_STATUS_BTN_CONST[type]} </Text>
                            </TouchableOpacity>}
                        </View>)
                    }

                </ScrollView>}
            </>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 22,
        paddingVertical: 30
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexBasis: 1,
        flexGrow: 1,
        borderBottomColor: 'grey',
        paddingVertical: 5,
        borderBottomWidth: 1,
        justifyContent: 'space-around'
    },
    headingText: {
        textAlign: 'center',
        fontSize: 20,
        borderBottomColor: '#B2BABB',
        borderBottomWidth: 1,
        color: '#615A55'
    },
    noData: {
        textAlign: 'center',
        fontSize: 20,
        color: '#615A55',
        paddingVertical: 100
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        elevation: 5,
        backgroundColor: "#f38070",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '100%',
        marginBottom: 10,
        color: '#fff'
    },
    statusBtn: {
        elevation: 5,
        backgroundColor: "#67a0fe",
        borderRadius: 10,
        padding: 8,
        width: '100%',
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center'
    },
    orderTextStyle: {
        textTransform: 'uppercase',
        fontWeight: 600
    }
})

export default OrderDetailsScreen;

