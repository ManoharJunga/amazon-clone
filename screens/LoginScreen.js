import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png"
          }}
        />
      </View>




      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#041E42" }}>Login In to your Account</Text>
        </View>


        <View style={{ marginTop: 70 }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#D0D0D0",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30
          }} >
            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="grey" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }}
              placeholder='enter your Email' />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#D0D0D0",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30
          }} >
            <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="grey" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16
              }}
              placeholder='enter your Password'
            />
          </View>

        </View>
        <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007FFF", fontWeight: "500" }}>Forgot Password</Text>
        </View>
        <View style={{ marginTop: 80 }} />
        <Pressable style={{ width: 200, backgroundColor: "#FEBE10", borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15 }}>
          <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Login</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
          <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>Don't have an account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})