import { FC, useState } from 'react';
import { Image, Text, Pressable, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import ImageView from 'react-native-image-viewing';
import { colors } from '../../theme';

interface ImageCardProps {
  id?: string;
  uri: string;
  width: number;
  height: number;
  style?: { [x: string]: string | number };
  handleClick?: (id: string) => void;
  title?: string;
  titlePosition?: 'top' | 'bottom';
}

const ImageCard: FC<ImageCardProps> = (props) => {
  const { uri, width, height, style, id = '', title, titlePosition, handleClick } = props;

  const [visible, setIsVisible] = useState(false);

  const showFullSizeImg = () => {
    setIsVisible(true);
  };

  const handleClickImage = () => {
    const fn = !!handleClick ? () => handleClick(id) : showFullSizeImg;
    fn();
  };

  return (
    <Pressable
      onPress={handleClickImage}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}
    >
      <View style={{ width, height, ...style }}>
        {!!uri ? (
          <Image
            source={{ uri }}
            style={{
              width,
              height,
              objectFit: 'cover',
            }}
          />
        ) : (
          <SvgUri
            width={width + 15}
            height={height}
            uri="https://res.cloudinary.com/dlyawnfbk/image/upload/v1698343659/book-cover_ijn21c.svg"
          />
        )}
        {title && (
          <View
            style={{
              backgroundColor: '#00000080',
              zIndex: 3,
              position: 'absolute',
              left: 0,
              paddingVertical: 10,
              paddingHorizontal: 5,
              ...(titlePosition === 'top' && { top: 0 }),
              ...(titlePosition === 'bottom' && { bottom: 0 }),
              width,
            }}
          >
            <Text style={{ color: colors.textInactive }}>{title}</Text>
          </View>
        )}
      </View>
      <ImageView
        images={[{ uri }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </Pressable>
  );
};

export default ImageCard;
