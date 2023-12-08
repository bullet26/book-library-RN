import { FC, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Selector from 'react-native-select-dropdown';
import { READ_STATISTIC } from '../../../graphQL';
import { IStatistic } from 'types';

interface YearSelectProps {
  year?: string;
  handleChange: (year: string) => void;
}

const YearSelect: FC<YearSelectProps> = (props) => {
  const { year, handleChange } = props;

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

  return (
    <>
      <Selector
        defaultButtonText={'Select a year'}
        defaultValue={year}
        data={allYearsLabels}
        onSelect={(selectedItem) => handleChange(selectedItem)}
      />
    </>
  );
};

export default YearSelect;
