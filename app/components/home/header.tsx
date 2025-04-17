import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '@components/common/text';
import {useCartQuantity} from '@data/hooks';
import Icon from '@react-native-vector-icons/ant-design';
import MaterialIcon from '@react-native-vector-icons/material-design-icons';
import {TabActions, useNavigation} from '@react-navigation/native';
import {useColors} from '@styles/hooks';
import Badge from '@components/common/badge';
import {useQuery} from '@tanstack/react-query';
import RoundedButton from '@components/common/rounded-button';
import {useCustomer} from '../../data/hooks';

const Header = () => {

  return (
    <View className="px-5 flex-row h-14 justify-between items-center">
      {showRegionSelector ? <RegionSelectorButton /> : <ProfileButton />}
      <Text type="display" className="text-content">
        MEDUSA MOBILE
      </Text>
      <CartButton />
    </View>
  );
};

const RegionSelectorButton = () => {
  const colors = useColors();
  const navigation = useNavigation();

  return (
    <RoundedButton
      onPress={() => {
        navigation.navigate('RegionSelect');
      }}>
      <MaterialIcon name="map-marker" size={20} color={colors.primary} />
    </RoundedButton>
  );
};

const ProfileButton = () => {
  const colors = useColors();
  const {customer, isAuthenticated} = useCustomer();
  const navigation = useNavigation();
  return (
    <RoundedButton
      onPress={() => {
        if (isAuthenticated) {
          navigation.dispatch(TabActions.jumpTo('Profile'));
        } else if(!customer?.id){
          navigation.navigate('SignIn');
        }
      }}>
      <MaterialIcon name="account-outline" size={20} color={colors.primary} />
    </RoundedButton>
  );
};

const CartButton = () => {
  const colors = useColors();
  const navigation = useNavigation();
  const itemCount = useCartQuantity();
  const navigateToCart = () => {
    navigation.navigate('Cart');
  };
  return (
    <TouchableOpacity
      onPress={navigateToCart}
      className="w-12 h-12 justify-center items-center bg-primary rounded-full elevation-sm">
      <View>
        <Icon name="shopping-cart" size={18} color={colors.contentSecondary} />
        {itemCount > 0 && (
          <View className="absolute -top-2 -right-3">
            <Badge variant="secondary" quantity={itemCount} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Header;
