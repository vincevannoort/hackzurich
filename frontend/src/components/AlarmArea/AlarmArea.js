// @ts-check
import React, { useState } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Button,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Pressable,
} from 'react-native';

function AlarmArea() {
    const [alarmActivated, setAlarmActivated] = useState(false);

    function setTime() {
        console.log('set alarm')
    }

    function setAlarm() {
        setAlarmActivated(!alarmActivated)
        console.log('set alarm')
    }

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#5DADF8', borderRadius: 6, padding: 20, marginBottom: 30 }}>
                <View>
                    <Pressable onPress={setTime}>
                        <Text style={{ color: 'white', fontSize: 35, paddingLeft: 5, }}>07:00</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable onPress={setAlarm} style={{ padding: 10, backgroundColor: alarmActivated ? '#5DF888' : 'grey', borderRadius: 6, }}>
                        <Text style={{ color: 'white' }}>{alarmActivated ? 'Enabled' : 'Disabled'}</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}


export default AlarmArea;