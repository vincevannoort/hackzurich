// @ts-check
import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Button,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from 'react-native';

function Header() {
    return (
        <View style={{ padding: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontFamily: "Cochin", fontSize: 30, fontWeight: 'bold', paddingBottom: 10 }}>SociAlarm</Text>
            <Text style={{ color: 'white', fontFamily: "Cochin", fontSize: 12, fontWeight: 'bold' }}>The most woke alarm!</Text>
        </View>
    );
}


export default Header;