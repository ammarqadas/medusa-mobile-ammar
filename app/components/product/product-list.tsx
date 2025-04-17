import React from "react";
import { View, Image, Dimensions } from "react-native";
import {useNavigation} from '@react-navigation/native';
import Carousel, { Pagination } from "react-native-snap-carousel";

import {useColors} from '@styles/hooks';
import {formatImageUrl} from '@utils/image-url';
import Text from "@components/common/text";
import apiClient from '@api/client';

const { width: screenWidth } = Dimensions.get("window");

type HeroCarouselItem = {
  id: string;
  title: string;
  image: string;
  collection_id: string;
};

const HeroCarousel = () => {
  const colors = useColors();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const navigation = useNavigation();

  const [carouselItems, setCarouselItems] = React.useState<
    HeroCarouselItem[]
  >([]);

  React.useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    const res = await apiClient.store.collection.list({});
    setCarouselItems(
      res.collections.map((col) => ({
        id: col.id,
        title: col.title,
        image: col.thumbnail,
        collection_id: col.id,
      }))
    );
  };

  const renderItem = ({ item }: { item: HeroCarouselItem }) => {
    return (
      <View className="w-full items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CollectionDetail", {
              collectionId: item.collection_id,
            });
          }}
          className="w-full"
        >
          <Image
            source={{ uri: formatImageUrl(item.image) }}
            className="w-full h-56 rounded-3xl"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4">
            <Text className="text-white font-content-bold text-lg">
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="pb-10">
      <Carousel
        layout={"default"}
        data={carouselItems}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.9}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeIndex}
        dotStyle={{ backgroundColor: colors.primary, width: 20 }}
      />
    </View>
  );
};

export default HeroCarousel;
