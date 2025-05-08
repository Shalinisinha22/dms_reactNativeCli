import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {  useState } from "react";
import Modal from "react-native-modal";
import {
  DocumentViewModalProps,
} from "../../interfaces/Types";
import { colors } from "../../utils/Colors";
import { IconsPath } from "../../utils/IconPath";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../../helper/Responsive";
import Pdf from "react-native-pdf";
import { IMAGE_URL } from "@env";
import { useTranslation } from "react-i18next";

const DocumentViewModal = ({
  isVisible,
  backOnPress,
  item,
}: DocumentViewModalProps) => {
    const {t} = useTranslation();
  const { top } = useSafeAreaInsets();
  const match = item?.name.match(/\.([a-zA-Z0-9]+)$/);
  const fileExtension = match ? match[1] : "";
  const [imageError, setImageError] = useState(false);

  return (
    <Modal isVisible={isVisible} statusBarTranslucent style={styles.modal}>
      <View style={styles.mainView}>
        <Pressable
          onPress={backOnPress}
          style={[
            styles.closeButton,
            {
              marginTop: top,
            },
          ]}
        >
          <Image source={IconsPath.whiteClose} style={styles.closeIcons} />
        </Pressable>
        {fileExtension === "pdf" ? (
          <Pdf
            source={{
              uri: IMAGE_URL + item?.file_path,
            }}
            onError={() => setImageError(true)}
            onLoadComplete={() => setImageError(false)}
            style={styles.pdf}
          />
        ) : (
          <Image
            source={{
              uri: IMAGE_URL + item?.file_path,
            }}
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
            style={styles.document}
          />
        )}
        {imageError && (
          <View style={styles.noDocument}>
            <Text style={{
              color:colors.black,
            }}>{t('error.noDocumentFound')}</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default DocumentViewModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 0,
  },
  closeButton: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
    right: wp(5),
    padding: wp(3),
    borderRadius: 50,
  },
  closeIcons: {
    width: wp(4),
    height: wp(4),
    resizeMode: "contain",
  },
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  document: {
    width: wp(100),
    height: hp(80),
    marginTop: hp(2),
    resizeMode: "contain",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  noDocument: {
    position: "absolute",
    justifyContent: "center",
    width: wp(100),
    height: hp(100),
    alignItems: "center",
  },
});
