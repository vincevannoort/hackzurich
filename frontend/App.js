// @ts-check
import React from 'react';
import ReactNativeAN from 'react-native-alarm-notification';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

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

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomePage from './src/pages/HomePage';

// Create the client as outlined in the setup guide
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

const GET_USERS = gql`
  query {
    users {
        id
        name
    }
  }
`;

const App = () => {


    function Alarm() {
        const { data, loading, error } = useQuery(GET_USERS)
        if (loading || error) return <></>;
        console.log(data)

        async function startAlarm() {
            console.log('start set alarm')
            const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 10000));
            console.log(new Date(Date.now() + 10000))
            const alarmNotifData = {
                title: "My Notification Title",
                message: "My Notification Message",
                channel: "my_channel_id",
                small_icon: "ic_launcher",
                data: { foo: "bar" },
                auto_cancel: true,
                has_button: true,
            };
            const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate });
            ReactNativeAN.deleteAlarm(alarm.id);
            ReactNativeAN.deleteRepeatingAlarm(alarm.id);
            ReactNativeAN.stopAlarmSound();
            ReactNativeAN.sendNotification(alarmNotifData);
            const alarms = await ReactNativeAN.getScheduledAlarms();
            ReactNativeAN.removeFiredNotification(alarm.id);
            ReactNativeAN.removeAllFiredNotifications();
            console.log('end set alarm')
        }

        async function stopAlarm() {
            ReactNativeAN.stopAlarmSound()
        }

        return (
            <>
                <TouchableOpacity onPress={() => { console.log('pressed') }}>
                    <View style={{ padding: 30 }}>
                        <Text>test</Text>
                    </View>
                </TouchableOpacity>
                <Button onPress={() => { startAlarm() }} title="start" />
                <Button onPress={() => { stopAlarm() }} title="stop" />
                {
                    data.users.map((user) => {
                        return (
                            <View key={user.name} style={{ padding: 10, backgroundColor: 'red' }}>
                                <Text>
                                    {user.name}
                                </Text>
                            </View>
                        )
                    })
                }
            </>
        )
    }


    return (
        <ApolloProvider client={client}>
            <StatusBar barStyle="dark-content" />
            <View style={{ backgroundColor: '#343E4E', flex: 1 }}>
                <HomePage />
            </View>
        </ApolloProvider>
    );
};

const styles = StyleSheet.create({

});

export default App;
