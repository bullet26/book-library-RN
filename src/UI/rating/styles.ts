import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  ratingCircle: {
    maxWidth: 50,
    maxHeight: 50,
    borderRadius: 25, // Половина ширины и высоты для создания круга
    color: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 30,
  },
});

export default styles;
