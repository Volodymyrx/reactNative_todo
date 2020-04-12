import React, {useState} from 'react'
import {View, TextInput, Text, StyleSheet, Button} from 'react-native'


export const AddTodo = ({onSubmit}) => {
    const [value, setValue] =useState('')

    const pressHandler = () => {
        onSubmit(value)
        setValue('')
    }


    return (
        <View style={styles.form}>
            <TextInput 
            style={styles.input}
            // onChangeText={text => setValue(text)}
            onChangeText={setValue}
            value={value}
            placeholder =  "Input name of doing..."
            />
            <Button  title='Add' onPress={pressHandler}/>
    {/* <Text>value: {value}</Text> */}
        </View>
    )
}
const styles=StyleSheet.create({
    form: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,

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
        borderColor: '#999',
    }
})






