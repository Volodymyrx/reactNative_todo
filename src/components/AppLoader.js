import React from 'react-native'
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native'
import { THEME } from '../theme'
import {AppButton} from '../ui/AppButton'

export const AppLoader = () => (
    
        <View style={styles.center}>
            <ActivityIndicator size='large' color={THEME.MAIN_COLOR} />
        </View>
    
)

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})








