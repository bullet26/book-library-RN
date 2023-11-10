import { FC } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { SvgUri } from 'react-native-svg';

interface ImageCardProps {
  id?: string;
  uri: string;
  width: number;
  height: number;
  style?: { [x: string]: string | number };
  handleClick?: (id: string) => void;
}

const ImageCard: FC<ImageCardProps> = (props) => {
  const { uri, width, height, style, id = '', handleClick = () => {} } = props;

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(id)}>
      {!!uri ? (
        <Image
          source={{ uri }}
          style={{
            width,
            height,
            ...style,
          }}
        />
      ) : (
        <SvgUri
          width="180px"
          height="315px"
          uri="https://res.cloudinary.com/dlyawnfbk/image/upload/v1698343659/book-cover_ijn21c.svg"
        />
      )}
    </TouchableWithoutFeedback>
  );
};

export default ImageCard;
