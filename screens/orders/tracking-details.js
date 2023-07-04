import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TouchableOpacity, Alert } from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import { updateDoc, doc } from "firebase/firestore";
import firebase, { db } from '../../database/firebasedb';
import { NEXT_STATUS_CONST, NEXT_STATUS_BTN_CONST, STATUS_CONST } from '../../utilities/constants/App.const';
import { AuthContext } from '../../context/auth-context';

const TrackingDetailsScreen = ({ route, navigation }) => {
    const authContext = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [ordersList, setOrdersList] = useState([]);
    const { order } = route.params;

    const data= Object.keys(STATUS_CONST).map((item,i) => {
        console.log(order)
        return {
            time: formatDate(new Date(new Date().setHours(new Date().getHours() + (i + 1)))),
            title: item,
            lineColor: order.index < i ? 'grey' : 'green',
            circleColor: order.index < i ? 'grey' : 'green',
            description: `Order gets ${item} at scheduled time`.toLowerCase()
        }
    });

      function formatDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    return (
        <View style={styles.listContainer}>
            <View style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 5, 
                justifyContent: 'space-between', 
                width: '100%',
                backgroundColor: '#fff',
                padding: 8,
                }}>
                <View>
                    <Text style={{fontWeight: 700}}>Order ID - <Text style={{textTransform: 'uppercase', color: '#6DA17F', fontStyle: 'italic'}}>{order.OrderId}</Text></Text>
                    <Text style={{fontWeight: 700}}>Product Name- <Text style={{textTransform: 'uppercase', color: '#6DA17F', fontStyle: 'italic'}}>{order.ProductName}</Text></Text>
                    <Text style={{fontWeight: 700}}>Product ID- <Text style={{textTransform: 'uppercase', color: '#6DA17F', fontStyle: 'italic'}}>{order.ProductId}</Text></Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.statusBtn}>{order.Status}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        <Timeline
        style={styles.list}
data={data}
/>
        </View>)
        // <View style={styles.itemContainer}>
        //      {/* <View style={{ 
        //         display: 'flex', 
        //         flexDirection: 'row', 
        //         gap: 5, 
        //         justifyContent: 'space-between', 
        //         width: '100%',
        //         backgroundColor: '#fff',
        //         padding: 8,
        //         marginLeft: 8
        //         }}>
        //         <View>
        //             <Text>Order ID - {order.OrderId}</Text>
        //             <Text>Product Name- {order.ProductName}</Text>
        //             <Text>Product ID- {order.ProductId}</Text>
        //         </View>
        //         <View>
        //             <TouchableOpacity>
        //                 <Text style={styles.statusBtn}>{order.Status}</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View> */}
        //     <View style={styles.listContainer}>
        //             <Timeline
        //             style={styles.list}
        //   data={data}
        // />
        //             </View>
        // </View>)

}

const styles = StyleSheet.create({
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 5,
        paddingRight: 5,
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
        paddingVertical: 4,
        paddingHorizontal: 6,
        width: '100%',
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center'
    },
    listContainer: {
        flex: 1,
        padding: 20,
        paddingTop:65,
        backgroundColor:'white'
      },
      list: {
        flex: 1,
        marginTop:20,
      },
})

export default TrackingDetailsScreen;

