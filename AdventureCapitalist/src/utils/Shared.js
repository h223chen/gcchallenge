import { Dimensions, Platform, PixelRatio } from 'react-native';

/**
 * static utility functions that can be imported/used anywhere
 */
class Shared {

	/**
	 * Simple scaling function from StackOverflow since RN
	 * doesn't support rem for stylesheets
	 * @param {int} size - base pixel value
	 * @return {int} scaled pixel value
	 */
	static scaleFontSize(size) {
		const {
			width: SCREEN_WIDTH,
			height: SCREEN_HEIGHT,
		} = Dimensions.get('window');

		const scale = SCREEN_WIDTH / 320;

		const newSize = size * scale
		if (Platform.OS === 'ios') {
			return Math.round(PixelRatio.roundToNearestPixel(newSize));
		} else {
			return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
		}
	}
}

export default Shared;
