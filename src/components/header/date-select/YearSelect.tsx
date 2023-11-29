import { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import Selector from 'react-native-select-dropdown';
import { READ_STATISTIC } from '../../../graphQL';
import { IStatistic } from 'types';
import { BooksByDateProps } from '../type';

interface YearSelectProps {
  year?: string;
}

const YearSelect: FC<YearSelectProps> = (props) => {
  const navigation = useNavigation<BooksByDateProps>();

  const { year } = props;

  const [allYearsLabels, setAllYearsLabels] = useState<string[]>([]);

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

  const handleChange = (year: string) => {
    navigation.navigate('BookBySpecificDate', { year });
  };

  return (
    <>
      <Selector
        defaultButtonText={'Select a year'}
        data={allYearsLabels}
        onSelect={(selectedItem) => handleChange(selectedItem)}
      />
    </>
  );
};

export default YearSelect;
