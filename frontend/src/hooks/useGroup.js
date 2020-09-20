import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function useGroup() {
    const [selectedGroup, setSelectedGroup] = useState(null)

    useEffect(() => {
        (async function () {
            const alarmActivatedStorage = await AsyncStorage.getItem('wakeUpGroupId')
            if (alarmActivatedStorage != null) {
                setSelectedGroup(parseInt(alarmActivatedStorage))
            }
        })();
    }, [])

    async function selectGroup(wakeUpGroupId) {
        setSelectedGroup(wakeUpGroupId)
        await AsyncStorage.setItem('wakeUpGroupId', wakeUpGroupId.toString())
    }

    return [selectedGroup, selectGroup];
}