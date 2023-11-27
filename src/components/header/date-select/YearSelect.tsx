import { FC, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { READ_STATISTIC } from '../../../graphQL';
import { IStatistic } from 'types';

interface YearSelectProps {
  year?: string;
}

const YearSelect: FC<YearSelectProps> = (props) => {
  const navigation = useNavigation();

  const { year } = props;

  const [allYearsLabels, setAllYearsLabels] = useState<{ value: string; label: string }[]>([]);

  const { data, error } = useQuery<{ statistic: IStatistic[] }>(READ_STATISTIC, {
    variables: {
      label: 'all',
    },
  });

  useEffect(() => {
    if (data) {
      setAllYearsLabels(data.statistic.map(({ period }) => ({ value: period, label: period })));
    }
  }, [data]);

  const handleChange = (year: string) => {
    navigation.navigate('BookBySpecificDate', { year });
  };

  console.log('====================================');
  console.log('YearSelect');
  console.log('====================================');

  return (
    <>
      <Text>Select a year</Text>

      {/* <Selector
        defaultValue={[year || '']}
        style={{ width: 120 }}
        options={allYearsLabels}
        onChange={(arr, extend) => console.log(arr, extend.items)}
      /> */}
    </>
  );
};

export default YearSelect;
