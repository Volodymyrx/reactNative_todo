import React from 'react'
import {View, TextInput, Text, StyleSheet, Button} from 'react-native'


export const AddTodo = (props) => {
    return (
        <View style={styles.form}>
            <TextInput style={styles.input}/>
            <Button style={styles.buttonAdd} title='Add'/>
        </View>
    )
}
const styles=StyleSheet.create({
    form: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    input:{
        width: '70%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,

        borderColor: '#3949ab',
    },
    buttonAdd: {
        color: '#ff1',
        backgroundColor: '#777',
        borderStyle: 'solid',
        borderWidth: 2,
    }
})






