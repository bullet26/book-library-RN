import { useState } from 'react';
import { ActivityIndicator, FlatList, Linking, Pressable, Text, View } from 'react-native';
import { useQuery } from '@apollo/client/react';
import ImageView from 'react-native-image-viewing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALL_MEDIA_FOR_BOOK } from '../../graphQL';
import { colors } from '../../theme';
import { BookMediaProps } from './type';
import { ImageCard } from '../../UI';
import { normalizeUrl } from '../../utils';

export const BookMedia = ({ route }: BookMediaProps) => {
  const { id } = route?.params;

  const { loading, error, data } = useQuery(ALL_MEDIA_FOR_BOOK, {
    skip: !id,
    variables: { id },
  });

  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const media = data?.book?.media;

  const handleClickImage = (id: string) => {
    const currentIndex = media?.image.findIndex(item => item.id === id) || 0;
    const correctIndex = currentIndex === -1 ? 0 : currentIndex;
    setIndex(correctIndex);
    setIsVisible(true);
  };

  const handleClickVideo = async (id: string) => {
    const url = media?.video.find(item => item.id === id)?.url;

    if (url) await Linking.openURL(url);
  };

  return (
    <>
      {!!loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: colors.backgroundMain,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      {!!data && (
        <SafeAreaView style={{ backgroundColor: colors.backgroundAccent, flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            {media?.video.map((item, i) => (
              <Pressable
                key={item.id}
                onPress={() => handleClickVideo(item.id)}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <Text style={{ fontSize: 18, padding: 15, color: colors.textAccent }}>
                  {item.type} #{i + 1}
                </Text>
              </Pressable>
            ))}
          </View>

          {!!media?.image.length && (
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
      )}
    </>
  );
};
