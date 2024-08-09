import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import CommonHeader from '../../commonComponents/CommonHeader';
import JsonData from '../../assets/jsonData/jsondata.json';
import images from '../../assets/images/jsonimages/images';
import CarouselCards from '../../commonComponents/CarouselCards';

const SubCategoriesScreen = ({ navigation, route }) => {
  const [jsonData] = useState(JsonData);

  const handleSearchPress = () => {
    navigation.navigate('Search', { data: jsonData });
  };

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: '#F1EFEF', padding: 10, margin: 6, borderRadius: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignContent:'center' }}>
        <View style={{ width: '72%',justifyContent:'space-between'}}>
          <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 21, color: '#2A2A2A' }}>{item.subcategoryName}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignContent:'flex-end',alignItems:'flex-end'}}>
            <Text style={styles.suggestionDetailsText}>{item.subcategoryWeight}</Text>
            <Text style={styles.suggestionDetailsText}>₹{item.subcategoryPrice}</Text>
          </View>

        </View>
        <View style={{ }}>
          <View style={[styles.image, { backgroundColor: '#fff', elevation: 4, borderRadius: 8 }]}>
            <Image source={images[item.subcategoryImageUrl]} style={styles.image} resizeMode='contain' resizeMethod='auto' />
          </View>
          <TouchableOpacity style={{ backgroundColor: '#fff', margin: 8, alignItems: 'center', padding: 2, borderRadius: 6 }}>
            <Text style={[styles.suggestionDetailsText, { color: '#80B918' }]}>+ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CommonHeader title={route.params.item.productName} navigation={navigation} onSearchPress={handleSearchPress} />
      <ScrollView style={{marginTop:14,marginBottom:2}}>
      <View>
      <CarouselCards data={route.params.item.subcategory} />
      </View>
      <FlatList
          data={route.params.item.subcategory}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={[styles.listContainer, { marginHorizontal: 14, elevation: 10, marginTop: 8, borderRadius: 10, backgroundColor: '#fff' }]}
        />
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  suggestionDetailsText: { fontSize: 14, fontWeight: 'bold', lineHeight: 21, color: '#2A2A2A' },
  listContainer: {
    flexGrow: 1,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    //marginRight: 10,
  },
})

export default SubCategoriesScreen;
