import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import images from '../../assets/images/jsonimages/images';

export default function SearchScreen({ navigation, route }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsWithDetails, setSuggestionsWithDetails] = useState([]);
  const [data] = useState(route.params?.data || []);
 
  const onSearchText = (query) => {
    if (query) {
      const filtered = data.products.reduce((acc, product) => {
        const matchingSubcategories = product.subcategory.filter(sub =>
          sub.subcategoryName.toLowerCase().includes(query.toLowerCase())
        );
        return [...acc, ...matchingSubcategories];
      }, []);

      setSuggestions(filtered);
      //dispatch(addSearch(query));
      setSuggestionsWithDetails(filtered)
    } else {
      setSuggestions([]);
      setSuggestionsWithDetails([])
    }
  }

  const handleClear = () => {
    setQuery('');
    onSearchText('')
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity style={[styles.suggestionItem,{flexDirection:'row'}]} onPress={() => [onSearchText(item.subcategoryName),setQuery(item.subcategoryName), setSuggestions([])]}>
      <View style={[{ backgroundColor: '#fff' }]}>
            <Image source={images[item.subcategoryImageUrl]} style={{width:30,height:30}} resizeMode='contain' resizeMethod='auto' />
          </View>
      <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 18, color: '#2A2A2A' }}>{item.subcategoryName} - {item.subcategoryWeight}</Text>
    </TouchableOpacity>
  );

  const renderSuggestionItemWithDetails = ({ item }) => (
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={20} color="#C5BEC0" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search to add products"
          value={query}
          onChangeText={(text) => [setQuery(text),console.log("text",text), onSearchText(text)]}
          placeholderTextColor={'#C5BEC0'}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Entypo name="circle-with-cross" size={20} color="#C5BEC0" />
          </TouchableOpacity>
        )}
        <View style={{marginRight:20}}>
        <Icon name="search" size={20} color="#C5BEC0" />
        </View>
      </View>
      {suggestions.length > 0 && (

        <View style={{ height: 150 }}>
          <FlatList
            data={suggestions}
            renderItem={renderSuggestionItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
      {suggestionsWithDetails.length > 0 &&
        <FlatList
          data={suggestionsWithDetails}
          renderItem={renderSuggestionItemWithDetails}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.listContainer, { marginHorizontal: 1, elevation: 10, marginTop: 8, borderRadius: 10, backgroundColor: '#fff' }]}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    //marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 0.4,
    borderColor: 'gray',
    borderRadius: 20,
  },
  backButton: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    padding: 8,
    marginRight: 10,
    color: '#2A2A2A',
    lineHeight: 18,
    fontSize: 14
  },
  clearButton: {
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  listContainer: {
    flexGrow: 1,
  },
  suggestionDetailsText: { fontSize: 14, fontWeight: 'bold', lineHeight: 21, color: '#2A2A2A' },
  suggestionItem: {
    padding: 8,
    // borderBottomWidth: 0.25,
    // borderBottomColor: 'gray',
  },
});
