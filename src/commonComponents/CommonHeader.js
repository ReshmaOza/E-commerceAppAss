// CommonHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CommonHeader = ({ title, navigation, onSearchPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#2A2A2A" style={styles.icon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subText}>{'Select any product to add'}</Text>
        </View>
      </View>
      <View style={{}}>
        <TouchableOpacity onPress={onSearchPress} style={styles.searchButton}>
          <Icon name="search" size={24} color="#2A2A2A" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 3,
  },
  searchButton: {
    marginLeft: 16,
  },
  icon: {
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2A2A2A',
  },
  subText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#2A2A2A',
    lineHeight: 18
  },
});

export default CommonHeader;
