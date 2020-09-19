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

function PickSongPage() {
    const greeting = 'Hello Function Component!';

    return (
        <View>
            <Text>PickSongPage</Text>
        </View>
    );
}


export default PickSongPage;