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
            <Text style={{ fontFamily: "Cochin", fontSize: 30, fontWeight: 'bold', paddingBottom: 10 }}>SociAlarm</Text>
            <Text style={{ fontFamily: "Cochin", fontSize: 12, fontWeight: 'bold' }}>The only alarm that gets you woke!</Text>
        </View>
    );
}


export default Header;