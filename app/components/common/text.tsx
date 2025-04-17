import React from 'react';
import {Text} from 'react-native';
import {tv, type VariantProps} from 'tailwind-variants';

const text = tv({
  variants: {
    type: {
      display: 'text-display font-display',
      content: 'text-content font-content leading-4',
    },
  },
  defaultVariants: {
    type: 'content',
  },
});

type CommonTextProps = VariantProps<typeof text> & {
  className?: string;
};

const TextComponent = ({
  type,
  className,
  children,
  ...rest
}: PropsWithChildren<CommonTextProps & TextProps>) => {
  return (
    <Text
      className={text({
        type,
        className,
      })}
      {...rest}>
      {children}
    </Text>
  );
};

export default TextComponent;
