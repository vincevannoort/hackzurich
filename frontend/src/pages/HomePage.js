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
import AlarmArea from '../components/AlarmArea/AlarmArea';
import GroupArea from '../components/GroupArea/GroupArea';
import Header from '../components/Header/Header';

function HomePage() {
    const greeting = 'Hello Function Component!';

    return (
        <View>
            <View style={{ padding: 30 }}>
                <Header />
                <AlarmArea />
                <GroupArea />
            </View>
            <Text>HomePage</Text>
        </View>
    );
}


export default HomePage;