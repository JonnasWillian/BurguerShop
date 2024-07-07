import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { Box, Image, Text, VStack, HStack, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type ItemDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'ItemDetails'>;
type ItemDetailsRouteProp = RouteProp<RootStackParamList, 'ItemDetails'>;

interface ItemDetailsProps {
  route: ItemDetailsRouteProp;
  navigation: ItemDetailsNavigationProp;
}

export default function ItemDetails({ route, navigation }: ItemDetailsProps) {
  const { item } = route.params;
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const animationValues = useRef<Record<string, Animated.Value>>({}).current;

  const handleCheckboxChange = (modifierName: string, optionName: string) => {
    setSelectedModifiers(prevState => ({
      ...prevState,
      [modifierName]: optionName,
    }));

    if (animationValues[modifierName]) {
      animationValues[modifierName].setValue(0);
    } else {
      animationValues[modifierName] = new Animated.Value(0);
    }

    Animated.timing(animationValues[modifierName], {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const calculateTotalPrice = () => {
    let basePrice = item.price;
    if (item.modifiers) {
      for (const modifierName in selectedModifiers) {
        const modifier = item.modifiers.find(mod => mod.name === modifierName);
        const selectedOption = modifier?.items.find(opt => opt.name === selectedModifiers[modifierName]);
        if (selectedOption) {
          basePrice += selectedOption.price;
        }
      }
    }
    return basePrice * quantity;
  };

  const handleAddToOrder = () => {
    const orderDetails = {
      item,
      quantity,
      selectedModifiers,
      totalPrice: calculateTotalPrice(),
    };
    navigation.navigate('OrderSummary', { orderDetails });
  };

  return (
    <ScrollView >
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      {item.images && (
        <Box style={styles.imageContainer}>
          <Image source={{ uri: item.images[0].image }} style={styles.image} alt={item.name} />
        </Box>
      )}
      <VStack space={4} style={styles.detailsContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.modifiers && item.modifiers.map((modifier, index) => (
          <Box key={index} style={styles.modifierBox}>
            <Box backgroundColor='#DADADA'>
              <Text style={styles.description}>{modifier.name}</Text>
              <Text>Select 1 option</Text>
            </Box>
            {modifier.items.map((option, idx) => (
              <HStack key={idx} style={styles.optionContainer}>
                <Text style={styles.modifierOption}>{option.name}: R$ {option.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleCheckboxChange(modifier.name, option.name)}
                >
                  <Animated.View style={[
                    styles.checkbox,
                    selectedModifiers[modifier.name] === option.name && {
                      backgroundColor: animationValues[modifier.name].interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#FFF', '#4F372F']
                      }),
                    }
                  ]} />
                </TouchableOpacity>
              </HStack>
            ))}
          </Box>
        ))}

        <Box backgroundColor="#DADADA">            
            <HStack style={styles.counterContainer}>
                <Button onPress={handleDecrease} style={styles.counterButton}>-</Button>
                <Text style={styles.counterValue}>{quantity}</Text>
                <Button onPress={handleIncrease} style={styles.counterButton}>+</Button>
            </HStack>
            {calculateTotalPrice() > 0 &&
            <Button onPress={handleAddToOrder} style={styles.addToOrderButton}>
                <Text style={styles.addToOrderButtonText}>Add to Order • R$ {calculateTotalPrice().toFixed(2)}</Text>
            </Button>}
        </Box>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: '#ffff',
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 'auto',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  title: {
    paddingTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
  },
  modifierBox: {
    marginTop: 10,
    marginBottom: 10,
  },
  modifierName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15
  },
  modifierOption: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  counterButton: {
    backgroundColor: '#4F372F',
    borderRadius: 15,
  },
  counterValue: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  addToOrderButton: {
    backgroundColor: '#4F372F',
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 20,
  },
  addToOrderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
