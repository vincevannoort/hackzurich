// @ts-check
import React from 'react';
import ReactNativeAN from 'react-native-alarm-notification';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

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
import PickSongPage from './src/pages/PickSongPage';

// Create the client as outlined in the setup guide
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

export const screenOptions = {
    headerShown: false,
    headerStyle: {
        backgroundColor: '#131E22',
    },
    ...TransitionPresets.ModalSlideFromBottomIOS,
};

export const cardStyle = {
    cardStyle: { backgroundColor: '#343E4E' },
};

const Stack = createStackNavigator();

const App = () => {

    return (
        <ApolloProvider client={client}>
            <StatusBar barStyle="dark-content" />
            <NavigationContainer>
                <Stack.Navigator screenOptions={screenOptions}>
                    <Stack.Screen name="HomePage" component={HomePage} options={cardStyle} />
                    <Stack.Screen name="PickSongPage" component={PickSongPage} options={cardStyle} />
                </Stack.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
};

const styles = StyleSheet.create({

});
 
export default App;
