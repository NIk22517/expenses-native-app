import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export type IconType = React.ComponentProps<typeof MaterialIcons> & {};

const Icon = ({ ...props }: IconType) => {
  return <MaterialIcons {...props} />;
};

export default Icon;
