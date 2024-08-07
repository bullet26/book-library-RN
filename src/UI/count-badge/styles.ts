import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    top: 10,
    right: 15,
    width: 35,
    height: 35,
    borderRadius: 17.5, // Половина ширины и высоты для создания круга
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleText: {
    color: 'white',
    fontSize: 20,
  },
});

export default styles;
