import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function App() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigation = useNavigation();

    const loginWithFirebase = () => {
        if (!loginEmail || !loginPassword) {
            Alert.alert('Please enter both email and password.');
            return;
        }

        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert('User logged in!');
                navigation.navigate("Restaurant");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === 'auth/wrong-password') {
                    Alert.alert('Wrong password.');
                } else {
                    Alert.alert(errorMessage);
                }
            });
    };

    return (
        <View style={styles.form}>
            <Text style={styles.header}>Sign In</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => setLoginEmail(value)}
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                placeholder="Enter your email"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => setLoginPassword(value)}
                autoCapitalize="none"
                autoCompleteType="password"
                keyboardType="default"
                placeholder="Enter your password"
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <Button style={styles.button} title="Sign Up with Us" color='blue' onPress={() => navigation.navigate('SignUp')} />
                <Button style={styles.button} title="Login" color='black' onPress={loginWithFirebase} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        margin: 30,
        marginTop: 60,
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 50,
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
        textAlignVertical: 'top'
    },
    buttonContainer: {
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        width: '40%',
    },
});
