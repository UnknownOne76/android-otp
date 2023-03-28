import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
  //for testing.
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<any | null>(null);
  const [confirm, setConfirm] = useState<any | null>(null);
  const [code, setCode] = useState<string>('');

  //Amka was here before

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing) return null;
  

  const signInWithPhoneNumber = async(phoneNumber: any) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      Alert.alert('Invalid code.'); 
    }
  }

  if (!confirm && user == null) {
    return (
      <View style={{flex: 1, justifyContent: 'center' , alignItems: 'center'}}>
        <Button title="Phone Number Sign In" onPress={() => signInWithPhoneNumber('+976 <your phone number>')}/>
      </View>
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center' , alignItems: 'center'}}>
      <View style={{display: user != null ? 'flex' : 'none' , justifyContent: 'center' , alignItems: 'center'}}> 
      <Text>Welcome User</Text>
      <Text>Client Phone Number: {user?.phoneNumber.slice(4, 12)}</Text>
      <View style={{marginBottom: 10}}/>
      <Button title='Log out.' onPress={() => auth().signOut().then(() => Alert.alert(`Have a nice day! User: ${user?.phoneNumber.slice(4, 12)}`))}/>
      </View>
      <View style={{display: user != null ? 'none' : 'flex'}}> 
      <TextInput value={code} onChangeText={text => setCode(text)} style={{width: 150 , height: 50 , backgroundColor: 'black' , marginBottom: 20 , color: 'white'}}/>
      <Button title="Confirm Code" onPress={() => confirmCode()} />
      </View>
    </View>
  );
}

export default App; 