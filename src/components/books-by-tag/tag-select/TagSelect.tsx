import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { ALL_TAGS } from '../../../graphQL';
import { colors } from '../../../theme';

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
      {!!tag && (
        <Pressable
          style={({ pressed }) => [
            {
              padding: 15,
              backgroundColor: colors.dark,
              borderColor: pressed ? colors.primary : colors.textWhite,
              borderWidth: 2,
              borderRadius: 20,
              marginBottom: 10,
            },
          ]}
          onPress={() => {
            setShowSelectorStatus(prevState => !prevState);
          }}
        >
          <Text style={{ fontSize: 18, color: colors.textWhite }}>{tag}</Text>
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
              style={({ pressed }) => [
                {
                  padding: 15,
                  marginRight: 25,
                  marginBottom: 10,
                  backgroundColor: '#3C0949',
                  opacity: pressed ? 0.5 : 1,
                  borderColor: pressed ? colors.backgroundAccent : colors.textWhite,
                  borderWidth: 2,
                  borderRadius: 20,
                },
              ]}
              onPress={() => {
                setShowSelectorStatus(false);
                handleChange(tagID || '', 'title');
              }}
            >
              <Text style={{ fontSize: 18, color: colors.textMain }}>sort by Title</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  padding: 15,
                  marginRight: 25,
                  marginBottom: 10,
                  backgroundColor: '#3C0949',
                  opacity: pressed ? 0.5 : 1,
                  borderColor: pressed ? colors.backgroundAccent : colors.textWhite,
                  borderWidth: 2,
                  borderRadius: 20,
                },
              ]}
              onPress={() => {
                setShowSelectorStatus(false);
                handleChange(tagID || '', 'author');
              }}
            >
              <Text style={{ fontSize: 18, color: colors.textMain }}> by Author Surname</Text>
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
                    borderColor: pressed ? colors.backgroundMain : colors.textWhite,
                    borderWidth: 2,
                    borderRadius: 20,
                  },
                ]}
                onPress={() => {
                  setShowSelectorStatus(false);
                  handleChange(item.id, sortBy);
                }}
              >
                <Text style={{ fontSize: 18, color: colors.textAccent }}>{item.tag}</Text>
              </Pressable>
            )}
            keyExtractor={(item, index) => item.id || index.toString()}
          />
        </>
      )}
    </View>
  );
};
