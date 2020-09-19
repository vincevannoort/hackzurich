// @ts-check
import React, { useState } from 'react';
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
    Pressable,
} from 'react-native';


const GET_GROUPS = gql`
    query {
        groups {
            id
            name
        }
    }
`;

function GroupArea() {
    const { data, loading, error } = useQuery(GET_GROUPS)
    if (loading || error) return <></>;
    console.log(data)
    console.log(loading)
    console.log(error)

    return (
        <View>
            <View style={{ backgroundColor: '#505F77', borderRadius: 6, padding: 20, marginBottom: 30 }}>
                <Text>test</Text>
                {
                    data.groups.map(group => {
                        return (
                            <Text>{group.name}</Text>
                        )
                    })
                }
            </View>
        </View>
    );
}


export default GroupArea;