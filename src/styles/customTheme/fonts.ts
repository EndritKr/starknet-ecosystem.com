import type { DeepPartial, Theme } from "@chakra-ui/react";

// Inter font - Modern, clean, similar to Starknet's brand identity
const fonts: DeepPartial<Theme["fonts"]> = {
  body: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  heading: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

export default fonts;
