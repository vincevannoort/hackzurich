// @ts-check
import React, { useEffect, useState, useCallback } from 'react';
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

async function searchSpotifyAndPlay(s) {
    const clientsecret = 'Basic MzgwNWI2ZTJlNjI4NDZkYmE0YWY2N2E0MDU3OTVmYjQ6NjkwZDE4ODczYzEzNDUxNGJlMDZjOWQ3Mjc3ODRiYzM=';
    let accessToken = null;

    /** request access token */
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token',
            querystring.stringify({
                grant_type: 'client_credentials'
            }), {
            headers: {
                'Authorization': clientsecret,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        accessToken = response.data.access_token
    } catch (error) {
        console.log('error requesting access token', error.message)
    }

    try {
        if (accessToken == null) throw new Error("No access token found")
        const responseGet = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/search',
            params: {
                q: s,
                type: 'track',
                limit: 5
            },
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        return responseGet.data.tracks.items
    } catch (error) {
        console.log(accessToken)
        console.log('error requesting song', error.message)
    }

}

function PickSongPage() {
    const [search, setSearch] = useState('');
    const [tracks, setTracks] = useState([]);

    async function searchSpotify(search) {
        const trackList = await searchSpotifyAndPlay(search);
        if (trackList == null || trackList == undefined) return;
        console.log('trackList')
        console.log(trackList)
        setTracks(trackList)
    }

    const handler = useCallback(debounce(() => {
        searchSpotify(search);
    }, 500), [search]);

    function changedSearch(s) {
        setSearch(s);
        handler()
    }

    return (
        <View>
            <Text>PickSongPage</Text>
            <View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={changedSearch}
                    value={search}
                />
                <ScrollView>
                    {
                        tracks.map(track => {
                            return (
                                <View key={track.id}>
                                    <Text>{track.name}</Text>
                                </View>

                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>

    );
}


export default PickSongPage;