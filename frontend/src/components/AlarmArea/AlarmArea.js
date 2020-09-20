// @ts-check
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker'

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
    const [show, setShow] = useState(false);
    const [alarmTime, setAlarmTime] = useState(new Date());

    function setTime() {
        setShow(true)
    }

    function changedTime(event, selectedDate) {
        console.log(event)
        console.log(selectedDate)
        setAlarmTime(new Date(selectedDate))
        setShow(false)
    }

    function setAlarm() {
        setAlarmActivated(!alarmActivated)
        AsyncStorage.setItem('alarmActivated', (!alarmActivated).toString())
        console.log('set alarm')
    }

    useEffect(() => {
        (async function () {
            const alarmActivatedStorage = await AsyncStorage.getItem('alarmActivated')
            if (alarmActivatedStorage == null) AsyncStorage.setItem('alarmActivated', false.toString())
            const alarmActivated = alarmActivatedStorage == 'true'
            setAlarmActivated(alarmActivated)
        })();
    }, [])

    const hours = alarmTime.getHours()
    const minutes = alarmTime.getMinutes()

    return (
        <View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#5DADF8', borderRadius: 6, padding: 30, marginBottom: 30 }}>
                <View>
                    <Pressable onPress={() => { setTime() }}>
                        <Text style={{ color: 'white', fontSize: 35, paddingLeft: 5, }}>{hours}:{minutes}</Text>
                    </Pressable>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={alarmTime}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={changedTime}
                        />
                    )}
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