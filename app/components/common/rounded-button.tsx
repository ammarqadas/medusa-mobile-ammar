import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {tv} from 'tailwind-variants';

const button = tv({
  base: 'bg-content-secondary rounded-full items-center justify-center elevation-sm',
  variants: {
    size: {
      sm: 'h-6 w-6',
      md: 'h-12 w-12',
      lg: 'h-14 w-14',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type RoundedButtonProps = {
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const RoundedButton = ({onPress, size, className,}: RoundedButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={button({size, className})}
      activeOpacity={0.7}
      >
        <View>

        </View>

    </TouchableOpacity>
  );
};

export default RoundedButton;
