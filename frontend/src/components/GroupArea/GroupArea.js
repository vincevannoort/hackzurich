// @ts-check
import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';

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
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import useGroup from '../../hooks/useGroup';


export const GET_GROUPS = gql`
    query {
        groups {
            id
            name
            track {
                id
                url
                name
                artist
                image
            }
        }
    }
`;

const SELECT_GROUP_FOR_USER = gql`
    mutation selectGroupForUser($userId: Int!, $wakeUpGroupId: Int!) {
        updateOneUser(
            where: { id: $userId }
            data: { wakeUpGroup: { connect: { id: $wakeUpGroupId } } }
        ) {
            id
        }
    }
`;

function GroupArea({ navigation }) {
    const { data, loading, error, refetch } = useQuery(GET_GROUPS)
    const [selectGroupForUser] = useMutation(SELECT_GROUP_FOR_USER)
    const [selectedGroup, setSelectedGroup] = useGroup()

    useEffect(() => {
        if (!loading && !error) {
            refetch()
        }
    }, [])

    if (error) console.log(error.message)
    if (loading || error) return <></>;

    const textStyle = { color: 'white', opacity: 0.7, marginBottom: 10 }
    const group = data.groups.find(group => group.id == selectedGroup)

    console.log(group)

    return (
        <View>
            <View style={{ backgroundColor: '#505F77', borderRadius: 6, padding: 30, marginBottom: 30 }}>
                <Text style={textStyle}>Select your wake up group:</Text>
                <View style={{ borderRadius: 6, overflow: 'hidden', marginBottom: 15, backgroundColor: '#5DADF8', paddingHorizontal: 5 }}>
                    <Picker
                        style={{ backgroundColor: '#5DADF8', padding: 10, color: 'white' }}
                        selectedValue={selectedGroup}
                        onValueChange={(itemValue) => {
                            console.log('set group', itemValue)
                            setSelectedGroup(itemValue)
                        }
                        }>
                        {/* <Picker.Item label={'Select a group'} value={null} /> */}
                        {
                            data.groups.map(group => {
                                return (
                                    <Picker.Item key={group.id} label={group.name} value={group.id} />
                                )
                            })
                        }
                    </Picker>
                </View>
                <Text style={textStyle}>Yesterday's wake up song:</Text>
                {
                    group && (
                        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#697C9B', borderRadius: 6, marginBottom: 15 }}>
                            <ImageBackground source={{ uri: group.track.image }} style={{ width: 80, height: '100%', borderRadius: 6, overflow: 'hidden' }} />
                            <View style={{ padding: 15, paddingHorizontal: 20 }}>
                                <Text style={{ color: 'white', fontFamily: "Cochin", fontSize: 16, fontWeight: 'bold' }}>{group.track.name}</Text>
                                <Text style={{ color: 'white', fontFamily: "Cochin", fontSize: 14, marginBottom: 5 }}>{group.track.artist}</Text>
                                <Text style={{ color: 'white', fontFamily: "Cochin", fontSize: 9, opacity: 0.7 }}>Selected by: Vince van Noort</Text>
                            </View>
                        </View>
                    )
                }
                <Text style={textStyle}>Next group member to select a song:</Text>
                <TouchableOpacity onPress={() => navigation.navigate('PickSongPage')}>
                    <View style={{ backgroundColor: '#697C9B', padding: 14, paddingHorizontal: 15, borderRadius: 6 }}>
                        <Text style={{ color: 'white', fontFamily: "Cochin", fontSize: 15 }}>Vince van Noort</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default GroupArea;