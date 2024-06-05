import { FC, useState, useContext } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { Tag } from 'types';
import { ALL_TAGS } from '../../../graphQL';
import { themeContext } from '../../../theme';

interface YearSelectProps {
  tag?: string;
  tagID?: string;
  sortBy: string;
  handleChange: (id: string, sortBy: string) => void;
}

const TagSelect: FC<YearSelectProps> = (props) => {
  const { tag, tagID, sortBy, handleChange } = props;
  const [showSelectorStatus, setShowSelectorStatus] = useState(false);

  const colors = useContext(themeContext);

  const { data, error } = useQuery<{ tags: Tag[] }>(ALL_TAGS, {});

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
      {!!tag && (
        <Pressable
          style={{
            padding: 15,
            backgroundColor: colors.dark,
            borderColor: colors.textInactive,
            borderWidth: 2,
            borderRadius: 20,
            marginBottom: 10,
          }}
          onPress={() => {
            setShowSelectorStatus((prevState) => !prevState);
          }}
        >
          <Text style={{ fontSize: 18 }}>{tag}</Text>
        </Pressable>
      )}
      {(!tag || showSelectorStatus) && (
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
              style={{
                padding: 15,
                marginRight: 25,
                marginBottom: 10,
                backgroundColor: '#3C0949',
                borderColor: colors.textInactive,
                borderWidth: 2,
                borderRadius: 20,
              }}
              onPress={() => {
                setShowSelectorStatus(false);
                handleChange(tagID || '', 'title');
              }}
            >
              <Text style={{ fontSize: 18 }}>sort by Title</Text>
            </Pressable>
            <Pressable
              style={{
                padding: 15,
                marginRight: 25,
                marginBottom: 10,
                backgroundColor: '#3C0949',
                borderColor: colors.textInactive,
                borderWidth: 2,
                borderRadius: 20,
              }}
              onPress={() => {
                setShowSelectorStatus(false);
                handleChange(tagID || '', 'author');
              }}
            >
              <Text style={{ fontSize: 18 }}> by Author Surname</Text>
            </Pressable>
          </View>
          <FlatList
            style={{ marginLeft: 50 }}
            numColumns={2}
            horizontal={false}
            data={data?.tags}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  padding: 15,
                  marginRight: 25,
                  marginBottom: 10,
                  backgroundColor: '#672976',
                  borderColor: colors.textInactive,
                  borderWidth: 2,
                  borderRadius: 20,
                }}
                onPress={() => {
                  setShowSelectorStatus(false);
                  handleChange(item.id, sortBy);
                }}
              >
                <Text style={{ fontSize: 18 }}>{item.tag}</Text>
              </Pressable>
            )}
            keyExtractor={(item, index) => item.id || index.toString()}
          />
        </>
      )}
    </View>
  );
};

export default TagSelect;
