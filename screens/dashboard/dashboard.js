import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
import { STATUS_CONST } from '../../utilities/constants/App.const';
import { AuthContext } from '../../context/auth-context';

const DashboardScreen = ({ navigation }) => {

    const authContext = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: 50, display: 'flex', alignItems: 'center' }}>
                <Text style={{ fontWeight: 600 }}>Hello! <Text style={{ color: 'maroon', fontWeight: '600' }}>{authContext?.authData?.displayName}</Text></Text>
                <Text style={{ fontWeight: 600 }}>(Logged In as <Text style={{ color: 'teal', fontWeight: '600' }}>{authContext?.authData?.role}</Text>)</Text>
            </View>
            {authContext.authData.role === "Hospital-Schedular" && (<TouchableOpacity style={{ ...styles.button, backgroundColor: '#008CBA', width: '60%', marginBottom: 50 }} onPress={() => { navigation.navigate('Create-Orders') }}>
                <Text style={{ color: '#fff', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}> Create Orders <Icon name="plus" size={15} /></Text>
            </TouchableOpacity>)}
            <Text style={styles.headingStyle}>Click to Check Orders</Text>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: '#F1C40F' }} onPress={() => { navigation.navigate('Orders', { type: '' }) }}>
                <Text style={styles.textStyle}>View All Orders <Icon name="rocket" size={20} /></Text>
            </TouchableOpacity>

            {authContext.authData.role === "Manufacturer" && (<><TouchableOpacity style={{ ...styles.button, backgroundColor: '#4CAF50' }} onPress={() => { navigation.navigate('Orders', { type: STATUS_CONST.RECEIVED }) }}>
                <Text style={styles.textStyle}>Accept Orders <Icon name="rocket" size={20} /></Text>
            </TouchableOpacity><TouchableOpacity style={{ ...styles.button, backgroundColor: '#008CBA' }} onPress={() => { navigation.navigate('Orders', { type: STATUS_CONST.ACCEPTED }) }}>
                    <Text style={styles.textStyle}>Pack Orders <Icon name="rocket" size={20} /></Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.button, backgroundColor: '#f44336' }} onPress={() => { navigation.navigate('Orders', { type: STATUS_CONST.PACKED }) }}>
                    <Text style={styles.textStyle}>Deliver Orders <Icon name="rocket" size={20} /></Text>
                </TouchableOpacity></>)}
            <TouchableOpacity style={{ ...styles.button, backgroundColor: '#555555' }} onPress={() => { navigation.navigate('Orders', { type: STATUS_CONST.DELIVERED }) }}>
                <Text style={styles.textStyle}>{authContext.authData.role === "Hospital-Schedular" ? 'Verify Orders' : 'Orders Delivered'} <Icon name="rocket" size={20} /></Text>
            </TouchableOpacity>
            {authContext.authData.role === "Hospital-Schedular" && (<TouchableOpacity style={{ ...styles.button, backgroundColor: '#A83DAB' }} onPress={() => { navigation.navigate('Orders', { type: STATUS_CONST.VERIFIED }) }}>
                <Text style={styles.textStyle}>Orders Verified <Icon name="rocket" size={20} /></Text>
            </TouchableOpacity>)}
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        elevation: 5,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        marginBottom: 10
    },
    container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff',
        flexDirection: 'column',
        height: '100%'
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 20,
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
    },
    headingStyle: {
        fontSize: 15,
        fontWeight: 700,
        marginBottom: 20,
        color: '#000',
    }
});

export default DashboardScreen;