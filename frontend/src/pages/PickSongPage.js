// @ts-check
import React, { useEffect, useState,  useCallback } from 'react';
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
import { SearchBar } from 'react-native-elements';

var Sound = require('react-native-sound');
var RNFetchBlob = require('rn-fetch-blob').default

import querystring from 'querystring';
import { debounce } from "lodash";
import axios from 'axios';


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

function SearchSpotifyAndPlay(s) {
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
  q: 'ANdromedik',
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

}

function PickSongPage() {


    const [search, setSearch] = useState('');
    const handler = useCallback((s) => debounce(function(s){
        console.log('handler')
        console.log(s);
        SearchSpotifyAndPlay(s)
    }, 500), []);
    function changedSearch(s) {
        //console.log('Veranderen')
        setSearch(s);
        SearchSpotifyAndPlay(s);// handler(s);
    }
    

    const greeting = 'Hello Function Component!';

    return (
        <View>
            <Text>PickSongPage</Text>
<View>
<SearchBar
        placeholder="Type Here..."
        onChangeText={changedSearch }
        value={search}
      />
</View>
        </View>
        
    );
}


export default PickSongPage;