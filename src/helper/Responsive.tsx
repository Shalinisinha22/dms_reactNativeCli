// packages
import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native";

// Retrieve initial screen's width
let screenWidth = Dimensions.get("window").width;

// Retrieve initial screen's height
let screenHeight = Dimensions.get("window").height;
export const isiPAD =
  screenHeight / screenWidth < 2.6 &&
  Math.max(screenHeight, screenWidth) >= 930 
export const isTablet = screenHeight / screenWidth < 1.6;

export const WINDOW_WIDTH = screenWidth;
export const WINDOW_HEIGHT = screenHeight;

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isX = isIphoneXorAbove();

export function isIphoneXorAbove() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimen.height === 932 ||
      dimen.width === 430 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.width === 390 ||
      dimen.height === 844 ||
      dimen.height === 926 ||
      dimen.width === 428 ||
      dimen.height === 852 ||
      dimen.width === 393)
  );
}
// guideline height for standard 5" device screen is 680
export function RFValue(fontSize: number, standardScreenHeight = 680) {
  const standardLength =
    screenWidth > screenHeight ? screenWidth : screenHeight;
  const offset: number | any =
    screenWidth > screenHeight
      ? 0
      : Platform.OS === "ios"
      ? 78
      : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

  const deviceHeight =
    isIphoneXorAbove() || Platform.OS === "android"
      ? standardLength - offset
      : standardLength;

  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
const wp = (widthPercent: number) => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */
const hp = (heightPercent: number) => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

/**
 * Event listener function that detects orientation change (every time it occurs) and triggers
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 * @param {object} that Screen's class component this variable. The function needs it to
 *                      invoke setState method and trigger screen rerender (this.setState()).
 */
const listenOrientationChange = (that: {
  setState: (arg0: { orientation: string }) => void;
}) => {
  Dimensions.addEventListener("change", (newDimensions) => {
    // Retrieve and save new dimensions
    screenWidth = newDimensions.window.width;
    screenHeight = newDimensions.window.height;

    // Trigger screen's rerender with a state update of the orientation variable
    that.setState({
      orientation: screenWidth < screenHeight ? "portrait" : "landscape",
    });
  });
};

/**
 * Wrapper function that removes orientation change listener and should be invoked in
 * componentWillUnmount lifecycle method of every class component (UI screen) that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 */

export { hp, listenOrientationChange, wp };
