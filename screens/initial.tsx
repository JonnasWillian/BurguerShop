import React from 'react';
import { ImageBackground, StyleSheet, TextInput, ScrollView, View } from 'react-native';
import Menu from '../components/Menu';
import { Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function Initial() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Menu/>

      <ImageBackground
        source={require("../assets/images/initialImage.jpeg")}
        style={styles.backgroundImage}
        resizeMode='cover'
      >
        <Image
          source={require("../assets/images/logoApp.png")}
          style={styles.overlayImage}
        />
      </ImageBackground>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search menu items"
          placeholderTextColor="#666"
        />
      </View>

      {/* Additional content to enable scrolling */}
      <View style={styles.additionalContent}>
        <View style={styles.contentBlock}></View>
        <View style={styles.contentBlock}></View>
        <View style={styles.contentBlock}></View>
        <View style={styles.contentBlock}></View>
        <View style={styles.contentBlock}></View>
        <View style={styles.contentBlock}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  backgroundImage: {
    width: '100%',
    height: "40%",
  },
  overlayImage: {
    width: '40%',
    height: 100,
    position: 'absolute',
    top: 40,
    left: '30%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8A94A4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: -260,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  additionalContent: {
    marginTop: 20,
    alignItems: 'center',
  },
  contentBlock: {
    width: '90%',
    height: 200,
    backgroundColor: '#D3D3D3',
    marginVertical: 10,
    borderRadius: 10,
  },
});
