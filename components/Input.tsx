import {
  TextInput,
  TextInputProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Typography, TypographyProps } from "./Typograhy";
import { colorPalette } from "../global/ColorCode";

interface InputProps extends TextInputProps {
  boxProps?: ViewProps;
  labelProps?: TypographyProps;
  errorText?: TypographyProps;
  style?: ViewStyle;
}

const Input = ({
  labelProps,
  errorText,
  boxProps,
  style,
  ...props
}: InputProps) => {
  return (
    <View {...boxProps}>
      {labelProps?.content && <Typography {...labelProps} />}
      <View>
        <TextInput
          {...props}
          style={[
            {
              paddingHorizontal: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: errorText
                ? colorPalette.error.main
                : colorPalette.secondary.text,
            },
            style,
          ]}
        />
        {errorText?.content && (
          <Typography
            variant="caption"
            {...errorText}
            style={{
              color: colorPalette.error.main,
              paddingTop: 5,
              paddingLeft: 5,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Input;
