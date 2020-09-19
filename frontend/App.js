// @ts-check
import React, {Component, useState} from 'react';
import ReactNativeAN from 'react-native-alarm-notification';
import DateTimePicker from '@react-native-community/datetimepicker';
var Sound = require('react-native-sound');
var RNFetchBlob = require('rn-fetch-blob').default

import querystring from 'querystring';

import axios from 'axios';


import {
	View,
	Text,
	Button,
	TextInput,
	StyleSheet,
	ToastAndroid,
	Platform,
	NativeEventEmitter,
	NativeModules,
} from 'react-native';

import {
    SafeAreaView,
    ScrollView,
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

    async function  setFutureAlarm() {
		const {futureFireDate, update} = this.state;

		const _seconds = parseInt(futureFireDate, 10) * 60 * 1000;
		const fire_date = ReactNativeAN.parseDate(new Date(Date.now() + _seconds));

		const details = {
			fire_date,
			sound_name: 'iphone_ringtone.mp3',
		};
		console.log(`alarm set: ${fire_date}`);

		try {
			const alarm = await ReactNativeAN.scheduleAlarm(details);
			console.log(alarm);
			if (alarm) {
				this.setState({
					update: [...update, {date: `alarm set: ${fire_date}`, id: alarm.id}],
				});
			}
		} catch (e) {
			console.log(e);
		}
    };
    
    async function downloadAndPlayUrl(varurl) {
        RNFetchBlob
  .config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache : true,
  })
  .fetch('GET', varurl, {
    //some headers ..
  })
  .then((res) => {
    // the temp file path
    console.log('The file saved to ', res.path())
    Sound.setCategory('Playback');
 
// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
var whoosh = new Sound(res.path(), Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
 
  // Play the sound with an onEnd callback
  whoosh.play((success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
});
  })

    }

    async function setAlarm() {


        const clientid = '3805b6e2e62846dba4af67a405795fb4';
        const clientsec = '690d18873c134514be06c9d727784bc3';
        const clientsecret = 'Basic MzgwNWI2ZTJlNjI4NDZkYmE0YWY2N2E0MDU3OTVmYjQ6NjkwZDE4ODczYzEzNDUxNGJlMDZjOWQ3Mjc3ODRiYzM=';

            var acc_token = 'QQ';
          axios.post( 'https://accounts.spotify.com/api/token', 
                querystring.stringify({
                grant_type: 'client_credentials'
                })
              , {
              headers: {
                'Authorization': clientsecret,
                'Accept':'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
              }
            })
          .then(function (response) {
            console.log('SPOTIFY SUCCES'); 
            console.log(response);
            console.log('Acces token');
        
            console.log(response.data.access_token);
            acc_token = response.data.access_token;
            console.log('AAAA')
            console.log('AAA \n')
            console.log('hALLO ZEG:' + acc_token);
  
            axios({method:'get',
            url: 'https://api.spotify.com/v1/search', 
            params: {
          q: 'Andromedik',
          type: 'track',
          limit: 5
            },
          headers: {
            'Authorization': 'Bearer ' + acc_token,
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        })
      .then(function (response) {
        console.log('Search SUCCES');
        console.log(response);

        var plyuri = response.data.tracks.items[0].preview_url;
        console.log(plyuri);
        downloadAndPlayUrl(plyuri);
        console.log('Search token');
    
      //   console.log(response.data.access_token);
      //   acc_token = response.data.acces_token;
      //   console.log('AAAA')
        //console.log(respbody['access_token']);
      })
      .catch(function (error) {
          console.log('Search ERRRROR');
        console.log(error);
        console.log(error.response.data);
      });
  
            
            //console.log(respbody['access_token']);
          })
          .catch(function (error) {
              console.log('SPOTIFY ERRRROR');
            console.log(error);
            console.log(error.response.data);
          });



         




        


        // curl -X "POST" -H "Authorization: Basic ZjM4ZjAw...WY0MzE=" -d grant_type=client_credentials https://accounts.spotify.com/api/token


        
        const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 1000));

        const alarmNotifData = {
            title: "My Notification Title",
            message: "My Notification Message",
            channel: "my_channel_id",
            small_icon: "ic_launcher",
            data: { foo: "bar" },
            auto_cancel: true,
            has_button: true,
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

    async function stopAlarm() {
        ReactNativeAN.stopAlarmSound()
    }

    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Button onPress={() => { setAlarm() }} title="start" />
                    <Button onPress={() => { stopAlarm() }} title="stop" />
                </ScrollView>


                <View>
					<Button
						onPress={setFutureAlarm}
						title="Set Future Alarm"
						color="#007fff"
					/>
				</View>
                {/* <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"

        /> */}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({

});

export default App;
