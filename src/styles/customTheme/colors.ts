import type { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme["colors"]["blackAlpha"]>
> = {
  // Vibrant, modern tag colors
  flat: {
    100: "#10B981", // Emerald
    200: "#3B82F6", // Blue
    300: "#8B5CF6", // Purple
    400: "#6366F1", // Indigo
    500: "#EC4899", // Pink
    600: "#F59E0B", // Amber
    700: "#14B8A6", // Teal
    800: "#EF4444", // Red
    900: "#F97316", // Orange
  },
  brand: {
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444", // Modern red
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },
  onlyDust: {
    100: "#4329b8",
    200: "#db02fb",
    300: "#3802ee",
    400: "red",
    500: "#fde038",
    600: "",
    700: "",
    800: "",
    900: "",
  },
  primary: {
    50: "#2b1b14",
    100: "#241610",
    200: "#1e120d",
    300: "#190f0b",
    400: "#140c09",
    500: "#100907",
    600: "#0c0605",
    700: "#090403",
    800: "#060202",
    900: "#030101",
  },
  // Modern accent colors aligned with Starknet BTFi palette
  accent: {
    50: "#FFF4EC",
    100: "#FFE2D0",
    200: "#FFC3A1",
    300: "#FFA06F",
    400: "#FF8247",
    500: "#F96B2C", // BTFi orange
    600: "#DD561F",
    700: "#B74417",
    800: "#8A300F",
    900: "#521B07",
  },
  warning: {
    100: "#ffda95",
    200: "#f5a42a",
    800: "#A16207",
    900: "#854D0E",
  },
  error: {
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },
  success: {
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981",
    600: "#059669",
    700: "#047857",
    800: "#065F46",
    900: "#064E3B",
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme["colors"]> = {};

const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};

export default colors;
