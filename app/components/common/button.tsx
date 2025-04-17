import {useState, useRef, ReactNode} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import {ChevronDown} from 'lucide-react-native';

import Text from './text';
import {tv} from 'tailwind-variants';

const accordion = tv({
  base: 'overflow-hidden border border-gray-200 rounded-xl',
});

const accordionHeader = tv({
  base: 'flex-row items-center justify-between px-4 py-3',
});

type Props = {
  title: string;
  children: ReactNode;
};

const Accordion = ({title, children}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleAnimation = () => {
    const config = {
      duration: 300,
      toValue: isOpen ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    setIsOpen(!isOpen);
  };
  return (
    <TouchableOpacity
      onPress={toggleAnimation}
      className={accordion()}>
      <View className={accordionHeader()}>
        <Text className="font-content-bold">{title}</Text>
        <ChevronDown size={24} className="self-center" />
      </View>
      {children}
    </TouchableOpacity>
  );
};

export default Accordion;
