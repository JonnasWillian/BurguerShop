import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Box, Button, Text, VStack, HStack, IconButton, Divider } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface ModifierItem {
  name: string;
  price: number;
}

interface Modifier {
  name: string;
  items: ModifierItem[];
}

interface Item {
  name: string;
  price: number;
  modifiers?: Modifier[];
}

interface OrderDetails {
  item: Item;
  quantity: number;
  selectedModifiers: Record<string, string>;
}

interface RouteParams {
  route: { params: { orderDetails: OrderDetails } };
}

export default function OrderSummary({ route }: RouteParams) {
  const { orderDetails } = route.params;
  const [quantity, setQuantity] = useState(orderDetails.quantity);
  const [totalPrice, setTotalPrice] = useState(calculateInitialTotalPrice());
  const navigation = useNavigation();

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [quantity, orderDetails.selectedModifiers]);

  function calculateInitialTotalPrice() {
    return calculateBasePrice(orderDetails.item, orderDetails.selectedModifiers) * orderDetails.quantity;
  }

  function calculateBasePrice(item: Item, selectedModifiers: Record<string, string>) {
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
    return basePrice;
  }

  function calculateTotalPrice() {
    return calculateBasePrice(orderDetails.item, orderDetails.selectedModifiers) * quantity;
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VStack space={4} flex={1} justifyContent="space-between">
        <Box>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('/')}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Basket</Text>
          <Divider my={4} />

          <Box paddingTop={15}>
            <HStack justifyContent="space-between" padding={2}>
              <Box>
                <Text style={styles.itemName}>{orderDetails.item.name}</Text>
                {Object.keys(orderDetails.selectedModifiers).map((modifierName, index) => (
                  <Text key={index} style={styles.modifierDetail}>{orderDetails.selectedModifiers[modifierName]}</Text>
                ))}
                <HStack alignItems="center">
                  <IconButton
                    icon={<Ionicons style={styles.counterButton} name="remove-circle-outline" size={25} color="white" />}
                    onPress={handleDecrease}
                  />
                  <Text style={styles.quantity}>{quantity}</Text>
                  <IconButton
                    icon={<Ionicons style={styles.counterButton} name="add-circle-outline" size={25} color="white" />}
                    onPress={handleIncrease}
                  />
                </HStack>
              </Box>
              <Text style={styles.itemPrice}>R$ {totalPrice.toFixed(2)}</Text>
            </HStack>

            <Divider my={4} />

            <Box background='#DADADA' padding={4} borderRadius={8}>
              <HStack justifyContent="space-between">
                <Text style={styles.describeTotal}>SubTotal:</Text>
                <Text style={styles.total}>R$ {totalPrice.toFixed(2)}</Text>
              </HStack>

              <Divider my={2} />

              <HStack justifyContent="space-between">
                <Text style={styles.describeTotal}>Total:</Text>
                <Text style={styles.total}>R$ {totalPrice.toFixed(2)}</Text>
              </HStack>
            </Box>
          </Box>
        </Box>

        <Button onPress={() => navigation.navigate('/')} style={styles.addToOrderButton}>
          <Text style={styles.addToOrderButtonText}>Checkout now</Text>
        </Button>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  alignBox: {
    padding: 20,
  },
  counterButton: {
    backgroundColor: '#4F372F',
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
    marginTop: 10,
  },
  modifierDetail: {
    fontSize: 16,
  },
  describeTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
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
