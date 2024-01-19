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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleOnly: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 17.5, // Половина ширины и высоты для создания круга
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleOnlyText: {
    color: 'white',
    fontSize: 20,
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
});

export default styles;
