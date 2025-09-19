import { useIsFocused } from '@react-navigation/native';
import { ReactNode } from 'react';

export const UnmountOnBlur = ({ children }: { children: ReactNode }) => {
  const isFocused = useIsFocused();

  return isFocused ? children : null;
};
