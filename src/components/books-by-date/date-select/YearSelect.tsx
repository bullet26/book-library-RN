import { FC, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { READ_STATISTIC } from '../../../graphQL';
import { colors } from '../../../theme';
import { IStatistic } from 'types';

interface YearSelectProps {
  year?: string;
  handleChange: (year: string) => void;
}

const YearSelect: FC<YearSelectProps> = (props) => {
  const { year, handleChange } = props;
  const [allYearsLabels, setAllYearsLabels] = useState<string[]>([]);
  const [showSelectorStatus, setShowSelectorStatus] = useState(false);

  const { data, error } = useQuery<{ statistic: IStatistic[] }>(READ_STATISTIC, {
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
      {!!year && (
        <Pressable
          style={({ pressed }) => [
            {
              padding: 15,
              backgroundColor: colors.dark,
              opacity: pressed ? 0.5 : 1,
              borderColor: pressed ? colors.primary : colors.textInactive,
              borderWidth: 2,
            },
          ]}
          onPress={() => {
            setShowSelectorStatus((prevState) => !prevState);
          }}
        >
          <Text style={{ fontSize: 18 }}>{year}</Text>
        </Pressable>
      )}
      {(!year || showSelectorStatus) && (
        <FlatList
          style={{ marginLeft: 50 }}
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
                  borderColor: pressed ? colors.primary : colors.textInactive,
                  borderWidth: 2,
                },
              ]}
              onPress={() => {
                setShowSelectorStatus(false);
                handleChange(item);
              }}
            >
              <Text style={{ fontSize: 18 }}>{item}</Text>
            </Pressable>
          )}
          keyExtractor={(index) => index.toString()}
        />
      )}
    </View>
  );
};

export default YearSelect;
