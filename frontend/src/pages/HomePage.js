// @ts-check
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Button,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import AlarmArea from '../components/AlarmArea/AlarmArea';
import GroupArea from '../components/GroupArea/GroupArea';
import Header from '../components/Header/Header';

import Footer from '../Footer/Footer';

function HomePage({ navigation }) {
    const greeting = 'Hello Function Component!';

    return (
        <ScrollView>
            <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1543076599-c70d85801510?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' }} style={{ position: 'absolute', width: '100%', height: 400 }}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['rgba(52, 62, 78, 0.5)', 'rgba(52, 62, 78, 1)']} style={{ width: '100%', height: 400 }}>
                </LinearGradient>
            </ImageBackground>

            <View style={{ padding: 30 }}>
                <Header />
                <AlarmArea />
                <GroupArea navigation={navigation} />
                <Footer />
            </View>
        </ScrollView>
    );
}


export default HomePage;