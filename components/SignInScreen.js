import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function App() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigation = useNavigation();

    const loginWithFirebase = () => {
        if (!loginEmail || !loginPassword) {
            Alert.alert('Please enter both email and password.');
            return;
        }

        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then(() => {
                Alert.alert('User logged in!');
                navigation.navigate("Restaurant");
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/wrong-password') {
                    Alert.alert('Wrong password.');
                } else {
                    Alert.alert(error.message);
                }
            });
    };

    return (
        <View style={styles.background}>
            <View style={styles.form}>
                <Text style={styles.header}>Sign In</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setLoginEmail}
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    placeholder="Enter your email"
                />
                <View>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setLoginPassword}
                        autoCapitalize="none"
                        autoComplete="password"
                        keyboardType="default"
                        placeholder="Enter your password"
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        style={styles.showPasswordButton}>
                        <Text style={styles.showPasswordText}>{passwordVisible ? "Hide" : "Show"} Password</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Login" color='white' onPress={loginWithFirebase} />
                    <Button title="Sign Up" color='red' onPress={() => navigation.navigate('SignUp')} />

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#000501',
    },
    form: {
        flex: 1,
        marginHorizontal: 30,
        marginTop: 60,
        backgroundColor: '#000501',
        borderRadius: 10,
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 50,
        color: '#D5D8E1',
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
        textAlignVertical: 'top',
        backgroundColor: '#D5D8E1',
        color: 'black',
    },
    buttonContainer: {
        paddingVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        width: '40%',
        color: '#D5D8E1',
    },
    showPasswordButton: {
        position: 'absolute',
        right: 10,
        top: 8,
    },
    showPasswordText: {
        color: '#D5D8E1',
        fontSize: 15,
    },
});
