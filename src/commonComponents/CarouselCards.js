import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Image, Text } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import JsonData from '../assets/jsonData/jsondata.json';
import images from '../assets/images/jsonimages/images';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH;

const ITEMS_PER_PAGE = 8;

const CarouselCards = ({data}) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const AUTO_SCROLL_INTERVAL = 3000;

  
  const paginatedData = Array.from({ length: totalPages }, (_, pageIndex) => {
    const start = pageIndex * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % totalPages);
      isCarousel.current?.snapToItem((index + 1) % totalPages);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [index, totalPages]);

  return (
    <View>
      <Carousel
        layout="default"
        ref={isCarousel}
        data={paginatedData}
        renderItem={({ item }) => <CarouselCardItem items={item} />}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        loop={true}
      />
      <Pagination
        dotsLength={totalPages}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: '#FFBE0B'
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: '#E2DFDF'
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        tappableDots={true}
      />
    </View>
  );
};

const CarouselCardItem = ({ items }) => (
  <View style={styles.container}>
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <View style={styles.gridItem}>
          <View style={[styles.imageContainer, { backgroundColor: '#fff', elevation: 4, borderRadius: 8 }]}>
            <Image source={images[item.subcategoryImageUrl]} style={styles.image} resizeMode='contain' />
          </View>
          <Text style={styles.text}>{item.subcategoryName}</Text>
        </View>
      )}
      keyExtractor={(item) => item.subcategoryId.toString()}
      numColumns={4}
      contentContainerStyle={{ padding: 10 }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
  },
  imageContainer: {
    width: 64,
    height: 64,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '500',
    color: "#2A2A2A",
    textAlign: 'center',
    marginTop: 4,
  },
});

export default CarouselCards;
