import React, { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet, Pressable } from "react-native";
import { CustomToggleProps } from "../../interfaces/Types";
import { wp } from "../../helper/Responsive";
import { colors } from "../../utils/Colors";

const CustomToggle = ({
  initialValue = false,
  onToggle,
}: CustomToggleProps) => {
  const [isOn, setIsOn] = useState(initialValue);
  const translateX = useRef(new Animated.Value(initialValue ? 20 : 0)).current;

  useEffect(() => {
    // Animate the switch thumb position when the toggle changes
    Animated.timing(translateX, {
      toValue: isOn ? 23 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOn, translateX]);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (onToggle) {
      onToggle(!isOn);
    }
  };

  return (
    <Pressable
      onPress={toggleSwitch}
      style={[
        styles.switchContainer,
        isOn ? styles.switchOn : styles.switchOff,
      ]}
    >
      <Animated.View
        style={[styles.switchThumb, { transform: [{ translateX }] }]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: wp(11),
    height: wp(6),
    borderRadius: 15,
    padding: 3,
    justifyContent: "center",
  },
  switchOn: {
    backgroundColor: colors.green_1, // Green color when on
  },
  switchOff: {
    backgroundColor: colors.lightGray_3, // Gray color when off
  },
  switchThumb: {
    width: wp(4),
    height: wp(4),
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default CustomToggle;
