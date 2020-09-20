// @ts-check
import React, { useEffect } from 'react';

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

import ReactNativeAN from 'react-native-alarm-notification';
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs'
import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../components/GroupArea/GroupArea';
import useGroup from '../hooks/useGroup';


function Footer() {
    const { data, loading, error } = useQuery(GET_GROUPS)
    const [groupId] = useGroup()

    useEffect(() => {
        RNFetchBlob
            .config({
                fileCache: true,
            })
            .fetch('GET', 'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86')
            .then((res) => {
                console.log('The file saved to ', res.path())
            });

        (async function () {
            console.log('test')
            // const read = await RNFS.readFileRes('test.mp3')
            // console.log(read)
        })();
    }, [])

    async function startAlarm() {
        console.log('groupId', groupId)
        console.log(data)

        const group = data.groups.find(group => group.id == groupId)
        console.log('found group', group)
        console.log('track url in start alarm: ', group.track.url)

        console.log('start set alarm')
        const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 1000));
        const alarmNotifData = {
            title: "You are now woke!",
            message: `${group.track.name} - ${group.track.artist}`,
            channel: "my_channel_id",
            small_icon: "ic_launcher",
            auto_cancel: true,
            has_button: true,
            sound_name: group.track.url,
        };
        console.log(alarmNotifData)
        const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate });
        ReactNativeAN.sendNotification(alarmNotifData);
        console.log('end set alarm')
    }

    async function stopAlarm() {
        ReactNativeAN.stopAlarmSound()
    }
    return (
        <View>
            <TouchableOpacity onPress={startAlarm} style={{ borderRadius: 6, padding: 10, backgroundColor: '#505F77', marginBottom: 10 }}>
                <Text style={{ color: 'white' }}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={stopAlarm} style={{ borderRadius: 6, padding: 10, backgroundColor: '#505F77' }}>
                <Text style={{ color: 'white' }}>Stop</Text>
            </TouchableOpacity>
        </View>
    );
}


export default Footer;