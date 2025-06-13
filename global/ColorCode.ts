type ColorType = {
  main: string;
  dark: string;
  light: string;
  text: string;
  background: string;
  border: string;
};

export interface ColorPalette {
  primary: ColorType;
  secondary: ColorType;
  error: ColorType;
}

export const colorPalette: ColorPalette = {
  primary: {
    main: "#4A628A",
    dark: "#1E3E62",
    light: "#7AB2D3",
    text: "#FFFFFF",
    background: "#DFF2EB",
    border: "#3C3D37",
  },
  secondary: {
    main: "#AD49E1",
    dark: "#7A1CAC",
    light: "#EBD3F8",
    text: "#000000",
    background: "#B9E5E8",
    border: "#3C3D37",
  },
  error: {
    main: "#FF4842",
    dark: "#B72136",
    light: "#FFA48D",
    text: "#fff",
    background: "#FFE7D9",
    border: "#7A0C2E",
  },
};
