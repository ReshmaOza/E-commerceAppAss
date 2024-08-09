import { View, Text, SafeAreaView, Alert, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CommonHeader from '../../commonComponents/CommonHeader';
import JsonData from '../../assets/jsonData/jsondata.json';
import images from '../../assets/images/jsonimages/images';

export default function ProductCategoriesScreen({ navigation }) {

  const [jsonData] = useState(JsonData);

  const handleSearchPress = () => {
    navigation.navigate('Search',{ data: jsonData });
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('SubCategories', { item: item })}
      >
        <Text style={styles.title}>{item.productName}</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={item.subcategory.slice(0, 8)}
          renderItem={renderSubcategoryItem}
          keyExtractor={(item) => item.subcategoryId.toString()}
          numColumns={4}
          contentContainerStyle={{ padding: 10 }}
        />
      </View>
    </View>
  );

  const renderSubcategoryItem = ({ item, index }) => (
    <View
      style={styles.subcategoryItem}
    >
      <View style={{ alignItems: 'center', margin: 8 }}>
        <View style={[styles.image, { backgroundColor: '#fff', elevation: 4, borderRadius: 8 }]}>
          <Image source={images[item.subcategoryImageUrl]} style={styles.image} resizeMode='contain' resizeMethod='auto' />
        </View>
        <Text style={{ fontSize: 10, lineHeight: 15, fontWeight: '500', color: "#2A2A2A", textAlign: 'center', marginTop: 4 }}>{item.subcategoryName}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CommonHeader title={'Product Categories'} navigation={navigation} onSearchPress={handleSearchPress} />
      <FlatList
      style={{marginTop:10}}
        data={jsonData.products}
        renderItem={renderItem}
        keyExtractor={(item) => item.productName}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    //backgroundColor: '#fff',
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    flex: 1,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 10,
  },
  subcategoryItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
