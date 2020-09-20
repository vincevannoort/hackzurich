// @ts-check
import React, { useEffect, useState, useCallback } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';
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
import useGroup from '../hooks/useGroup';

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
                limit: 15
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

const UPDATE_GROUP_WITH_TRACK = gql`
    mutation updateGroupWithTrack($groupId: Int!, $track: String!, $name: String!, $artist: String!, $image: String!) {
        updateOneGroup(
            where: {
                id: $groupId
            }
            data: {
                track: {
                    create: {
                        url: $track,
                        name: $name,
                        artist: $artist
                        image: $image
                    }
                }
            }
        ) {
            id
            track {
                id
                url
            }
        }
    }
`;

function PickSongPage({ navigation }) {
    const [search, setSearch] = useState('');
    const [tracks, setTracks] = useState([]);
    const [groupId] = useGroup();
    const [updateGroupWithTrack, { loading, error, data }] = useMutation(UPDATE_GROUP_WITH_TRACK)

    console.log(data)
    console.log(error)
    console.log(loading)

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

    function setSongForGroup(track) {
        if (groupId == null) throw new Error("No group selected")

        const variables = {
            groupId: groupId,
            track: track.preview_url,
            userId: 1,
            name: track.name,
            artist: track.artists[0].name,
            image: track.album.images[0].url
        };

        console.log(variables)

        updateGroupWithTrack({
            variables: variables
        })

        navigation.goBack()
        console.log(track)
    }

    const filteredTracks = tracks.filter(track => track.preview_url != null)

    return (
        <View style={{ padding: 30 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22, marginBottom: 20 }}>Pick a song</Text>
            <View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={changedSearch}
                    value={search}
                />
                <ScrollView style={{ marginTop: 30 }} keyboardShouldPersistTaps='always'>
                    {
                        filteredTracks.map(track => {
                            return (
                                <TouchableOpacity key={track.id} onPress={() => setSongForGroup(track)}>
                                    <View key={track.id} style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#505F77', marginBottom: 10, borderRadius: 6 }}>
                                        <ImageBackground source={{ uri: track.album.images[0].url }} style={{ width: 80, height: 80, borderRadius: 5, overflow: 'hidden' }} />
                                        <View style={{ padding: 20 }}>
                                            <Text style={{ color: 'white', fontSize: 15, }}>{track.name}</Text>
                                            <Text style={{ color: 'white', fontSize: 12, opacity: 0.7 }}>{track.artists[0].name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>

    );
}


export default PickSongPage;