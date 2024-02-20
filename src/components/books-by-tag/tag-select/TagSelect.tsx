import { FC, useState, useContext } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { Tag } from 'types';
import { ALL_TAGS } from '../../../graphQL';
import { themeContext } from '../../../theme';

interface YearSelectProps {
  tag?: string;
  tagID?: string;
  handleChange: (year: string) => void;
}

const TagSelect: FC<YearSelectProps> = (props) => {
  const { tag, tagID, handleChange } = props;
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
                backgroundColor: 'purple',
                borderColor: colors.textInactive,
                borderWidth: 2,
                borderRadius: 20,
              }}
              onPress={() => {
                setShowSelectorStatus(false);
                handleChange(item.id);
              }}
            >
              <Text style={{ fontSize: 18 }}>{item.tag}</Text>
            </Pressable>
          )}
          keyExtractor={(item, index) => item.id || index.toString()}
        />
      )}
    </View>
  );
};

export default TagSelect;
