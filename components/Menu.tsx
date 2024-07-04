import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Menu = () => {
  return (
    <View style={[styles.menuContainer, { backgroundColor: '#4F372F' }]}>
      <Text style={styles.menuText}>Menu</Text>
      <TouchableOpacity style={styles.menuIcon}>
        <Ionicons name="menu-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    menuContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
    },
    menuText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
    },
    menuIcon: {
      padding: 5,
    },
  });

export default Menu;
