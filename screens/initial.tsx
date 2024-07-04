import React from 'react';
import { ImageBackground, StyleSheet, TextInput, ScrollView } from 'react-native';
import Menu from '../components/Menu';
import { Box, Image, View, HStack, Text, Accordion, VStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const data = [
  { title: 'Item 1', image: require('../assets/images/initialImage.jpeg') },
  { title: 'Item 2', image: require('../assets/images/initialImage.jpeg') },
  { title: 'Item 3', image: require('../assets/images/initialImage.jpeg') },
];

const topics = [
  {
    title: 'Topic 1',
    items: [
      {
        name: 'Subitem 1',
        description: 'Description of Subitem 1',
        value: '$10',
        image: require('../assets/images/initialImage.jpeg')
      },
      {
        name: 'Subitem 2',
        description: 'Description of Subitem 2',
        value: '$20',
        image: require('../assets/images/initialImage.jpeg')
      },
    ]
  },
  {
    title: 'Topic 2',
    items: [
      {
        name: 'Subitem 3',
        description: 'Description of Subitem 3',
        value: '$30',
        image: require('../assets/images/initialImage.jpeg')
      },
      {
        name: 'Subitem 4',
        description: 'Description of Subitem 4',
        value: '$40',
        image: require('../assets/images/initialImage.jpeg')
      },
    ]
  },
];

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

      <View style={styles.additionalContent}>
        <HStack space={3} style={styles.itemContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item, index) => (
              <Box key={index} style={styles.itemBox}>
                <Image source={item.image} style={styles.itemImage} alt={item.title} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </Box>
            ))}
          </ScrollView>
        </HStack>
      </View>

      <View style={styles.accordionContainer}>
        <Accordion allowMultiple>
          {topics.map((topic, index) => (
            <Accordion.Item key={index}>
              <Accordion.Summary>
                <Text>{topic.title}</Text>
                <Accordion.Icon />
              </Accordion.Summary>
              <Accordion.Details>
                {topic.items.map((subitem, subindex) => (
                  <HStack key={subindex} space={3} style={styles.subitemContainer}>
                    <VStack style={styles.textContainer}>
                      <Text style={styles.subitemName}>{subitem.name}</Text>
                      <Text style={styles.subitemDescription}>{subitem.description}</Text>
                      <Text style={styles.subitemValue}>{subitem.value}</Text>
                    </VStack>
                    <Image source={subitem.image} style={styles.subitemImage} alt={subitem.name} />
                  </HStack>
                ))}
              </Accordion.Details>
            </Accordion.Item>
          ))}
        </Accordion>
      </View>

      <View style={styles.allergyInfoContainer}>
        <Text style={styles.allergyInfoText}>View allergy information</Text>
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
    top: 10,
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
    marginTop: -170,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    paddingHorizontal: 10,
  },
  itemBox: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemImage: {
    width: '60%',
    height: '50%',
    borderRadius: 50,
  },
  itemTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  accordionContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  subitemContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  subitemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  subitemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subitemDescription: {
    fontSize: 14,
    color: '#666',
  },
  subitemValue: {
    fontSize: 14,
    color: '#333',
  },
  allergyInfoContainer: {
    width: '100%',
    height: 67,
    padding: 24,
    gap: 10,
    borderWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginTop: 20,
  },
  allergyInfoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
