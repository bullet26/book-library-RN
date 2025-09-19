import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { ALL_TAGS } from '../../../graphQL';
import { colors } from '../../../theme';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

interface YearSelectProps {
  tag?: string;
  tagID?: string;
  sortBy: string;
  handleChange: (id: string, sortBy: string) => void;
}

export const TagSelect = (props: YearSelectProps) => {
  const { tag, tagID, sortBy, handleChange } = props;
  const [showSelectorStatus, setShowSelectorStatus] = useState(false);

  const { data, error } = useQuery(ALL_TAGS, {});

  return (
    <View
      style={{
        zIndex: 2,
        position: 'absolute',
        top: 50,
        right: 0,
        backgroundColor: showSelectorStatus ? colors.backgroundMain : 'transparent',
      }}
    >
      {data?.tags && (
        <Pressable
          style={({ pressed }) => [
            {
              padding: 15,
              backgroundColor: colors.dark,
              borderColor: pressed ? colors.primary : colors.textWhite,
              borderWidth: 2,
              borderRadius: 20,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => {
            setShowSelectorStatus(prevState => !prevState);
          }}
        >
          {showSelectorStatus ? (
            <>
              <Text style={{ fontSize: 18, color: colors.textMain }}>Close</Text>
              <FontAwesome6
                name="xmark"
                iconStyle="solid"
                style={{ color: colors.textMain }}
                size={25}
              />
            </>
          ) : (
            <FontAwesome6
              name="pen-to-square"
              iconStyle="solid"
              style={{ color: colors.textMain }}
              size={30}
            />
          )}
        </Pressable>
      )}
      {showSelectorStatus && (
        <>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
            }}
          >
            <Pressable
              style={({ pressed }) => [
                {
                  padding: 15,
                  marginRight: 25,
                  marginBottom: 10,
                  backgroundColor: '#3C0949',
                  opacity: pressed ? 0.5 : 1,
                  borderColor:
                    sortBy === 'title'
                      ? colors.textWhite
                      : pressed
                      ? colors.backgroundAccent
                      : colors.primary,
                  borderWidth: 2,
                  borderRadius: 20,
                },
              ]}
              onPress={() => {
                setShowSelectorStatus(false);
                handleChange(tagID || '', 'title');
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: sortBy === 'title' ? colors.textWhite : colors.textMain,
                }}
              >
                sort by Title
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  padding: 15,
                  marginRight: 25,
                  marginBottom: 10,
                  backgroundColor: '#3C0949',
                  opacity: pressed ? 0.5 : 1,
                  borderColor:
                    sortBy === 'author'
                      ? colors.textWhite
                      : pressed
                      ? colors.backgroundAccent
                      : colors.primary,
                  borderWidth: 2,
                  borderRadius: 20,
                },
              ]}
              onPress={() => {
                setShowSelectorStatus(false);
                handleChange(tagID || '', 'author');
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: sortBy === 'author' ? colors.textWhite : colors.textMain,
                }}
              >
                by Author Surname
              </Text>
            </Pressable>
          </View>
          <FlatList
            style={{ marginLeft: 50 }}
            numColumns={2}
            horizontal={false}
            data={data?.tags}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  {
                    padding: 15,
                    marginRight: 25,
                    marginBottom: 10,
                    backgroundColor: '#672976',
                    opacity: pressed ? 0.5 : 1,
                    borderColor:
                      tag === item.tag
                        ? colors.textWhite
                        : pressed
                        ? colors.backgroundMain
                        : colors.primary,

                    borderWidth: 2,
                    borderRadius: 20,
                  },
                ]}
                onPress={() => {
                  setShowSelectorStatus(false);
                  handleChange(item.id, sortBy);
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: tag === item.tag ? colors.textWhite : colors.textAccent,
                  }}
                >
                  {item.tag}
                </Text>
              </Pressable>
            )}
            keyExtractor={(item, index) => item.id || index.toString()}
          />
        </>
      )}
    </View>
  );
};
