import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { READ_STATISTIC } from '../../../graphQL';
import { colors } from '../../../theme';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

interface YearSelectProps {
  year?: string;
  handleChange: (year: string) => void;
}

export const YearSelect = (props: YearSelectProps) => {
  const { year, handleChange } = props;
  const [allYearsLabels, setAllYearsLabels] = useState<string[]>([]);
  const [showSelectorStatus, setShowSelectorStatus] = useState(false);

  const { data, error } = useQuery(READ_STATISTIC, {
    variables: {
      label: 'all',
    },
  });

  useEffect(() => {
    if (data) {
      setAllYearsLabels(data.statistic.map(({ period }) => period));
    }
  }, [data]);

  return (
    <View
      style={{
        zIndex: 2,
        position: 'absolute',
        right: 0,
        backgroundColor: colors.backgroundMain,
      }}
    >
      {!!allYearsLabels && (
        <Pressable
          style={({ pressed }) => [
            {
              padding: 15,
              backgroundColor: colors.dark,
              opacity: pressed ? 0.5 : 1,
              borderColor: pressed ? colors.primary : colors.textWhite,
              borderWidth: 2,
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
        <FlatList
          style={{ marginLeft: 50, marginTop: 10 }}
          numColumns={3}
          horizontal={false}
          data={allYearsLabels}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                {
                  padding: 15,
                  marginRight: 25,
                  marginBottom: 10,
                  backgroundColor: colors.dark,
                  opacity: pressed ? 0.5 : 1,
                  borderColor:
                    String(year) === String(item) || pressed ? colors.primary : colors.textWhite,
                  borderWidth: 2,
                },
              ]}
              onPress={() => {
                setShowSelectorStatus(false);
                handleChange(item);
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: String(year) === String(item) ? colors.primary : colors.textAccent,
                }}
              >
                {item}
              </Text>
            </Pressable>
          )}
          keyExtractor={index => index.toString()}
        />
      )}
    </View>
  );
};
