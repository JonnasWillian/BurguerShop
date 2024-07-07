import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Menu from '../components/Menu';
import { Box, Image, View, HStack, Text, Accordion, VStack, Spinner } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function Initial({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://cdn-dev.preoday.com/challenge/menu')
      .then(response => response.json())
      .then(json => {
        setData(json.sections);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner color="blue.500" />;
  }

  const truncateDescription = (description) => {
    if (!description) return '';
    if (description.length > 50) {
      return description.substring(0, 50) + '...';
    }
    return description;
  };

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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          <HStack>
            {data.map((item, index) => (
              <Box key={index} style={styles.itemBox}>
                <Image source={{uri:item.images[0].image}} style={styles.itemImage} alt={item.description} />
                <Text style={styles.itemTitle}>{item.name}</Text>
              </Box>
            ))}
          </HStack>
        </ScrollView>
      </View>

      <View style={styles.accordionContainer}>
        <Accordion allowMultiple>
          {data.map((topic, index) => (
            <Accordion.Item key={index}>
              <Accordion.Summary>
                <Text>{topic.name}</Text>
                <Accordion.Icon />
              </Accordion.Summary>
              <Accordion.Details>
                {topic.items.map((subitem, subindex) => (
                  <TouchableOpacity 
                    key={subindex} 
                    onPress={() => navigation.navigate('ItemDetails', { item: subitem })}
                  >
                    <HStack space={3} style={styles.subitemContainer}>
                      <VStack style={styles.textContainer}>
                        <Text style={styles.subitemName}>{subitem.name}</Text>
                        <Text style={styles.subitemDescription}>{truncateDescription(subitem.description)}</Text>
                        <Text style={styles.subitemValue}>R$ {subitem?.price}</Text>
                      </VStack>
                      {subitem.images && (
                        <Image source={{uri:subitem.images[0].image}} style={styles.subitemImage} alt={subitem.name} />
                      )}
                    </HStack>
                  </TouchableOpacity>
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
    paddingBottom: 100,
  },
  backgroundImage: {
    width: '100%',
    height: 130,
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
    marginTop: 20,
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
    marginTop: 10,
    alignItems: 'center',
  },
  horizontalScroll: {
    paddingHorizontal: 10,
  },
  itemBox: {
    width: 150,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 5,
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    resizeMode: "cover",
  },
  itemTitle: {
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
    width: 80,
    height: 80,
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
    height: 70,
    borderColor: '#EEEEEE',
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
