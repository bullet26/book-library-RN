import { useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { ImageCard } from '../../UI';
import { normalizeUrl } from '../../utils';
import { styles } from './styles';
import { useBookMedia } from './hook/useBook';

export const BookMedia = () => {
  const { loading, media, getImgIndex, handleClickVideo } = useBookMedia();

  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const handleClickImage = (id: string) => {
    const correctIndex = getImgIndex(id);
    setIndex(correctIndex);
    setIsVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    !!media && (
      <SafeAreaView edges={['top']} style={styles.wrapper}>
        <View style={styles.videoWrapper}>
          {media.video.map((item, i) => (
            <TouchableOpacity
              style={styles.videoButton}
              onPress={() => handleClickVideo(item.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.triggerText}>
                {item.type} #{i + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {!!media.image.length && (
          <>
            <FlatList
              data={media.image}
              numColumns={3}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <ImageCard
                  uri={item.url}
                  id={item.id}
                  width={125}
                  height={200}
                  handleClick={handleClickImage}
                />
              )}
            />
            <ImageView
              images={media.image.map(item => ({
                uri: normalizeUrl(item.url),
              }))}
              imageIndex={index}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
          </>
        )}
      </SafeAreaView>
    )
  );
};
