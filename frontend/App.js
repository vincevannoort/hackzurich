// @ts-check
import React from 'react';
import ReactNativeAN from 'react-native-alarm-notification';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Button,
    View,
    Text,
    StatusBar,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {

    async function setAlarm() {
        const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 1000));

        const alarmNotifData = {
            title: "My Notification Title",
            message: "My Notification Message",
            channel: "my_channel_id",
            small_icon: "ic_launcher",
            data: { foo: "bar" },
        };

        console.log(alarmNotifData)

        console.log('start set alarm')
        const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate });
        console.log(alarm);
        ReactNativeAN.deleteAlarm(alarm.id);
        ReactNativeAN.deleteRepeatingAlarm(alarm.id);
        ReactNativeAN.stopAlarmSound();
        ReactNativeAN.sendNotification(alarmNotifData);
        const alarms = await ReactNativeAN.getScheduledAlarms();
        ReactNativeAN.removeFiredNotification(alarm.id);
        ReactNativeAN.removeAllFiredNotifications();
        console.log('end set alarm')
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Button onPress={() => { setAlarm() }} title="test" />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({

});

export default App;
