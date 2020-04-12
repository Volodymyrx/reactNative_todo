import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export const Todo = ({todo}) => {
    return(
        <View style={slyles.todo}>
            <Text>{todo.title}, id: {todo.id}</Text>
        </View>
    )

}
const slyles = StyleSheet.create({
    text: {
        
        

    },
    todo: {
        flexDirection: 'row',
        alignContent: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
    }
})











