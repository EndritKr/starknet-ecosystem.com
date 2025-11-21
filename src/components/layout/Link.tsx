import type { LinkProps } from "@chakra-ui/layout";
import { Box, Link as ChakraLink } from "@chakra-ui/layout";
import NextLink from "next/link";

interface Props extends LinkProps {
  active?: boolean;
  color?: string;
  hoverOpacity?: string;
  href: string;
  fontWeight?: string;
  fontSize?: string;
  isExternal?: boolean;
}
function Link({
  children,
  active,
  href,
  color,
  hoverOpacity = "1",
  fontWeight,
  fontSize,
  isExternal,
}: Props) {
  return (
    <Box
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color || (active ? "white" : "whiteAlpha.700")}
      opacity={color || active ? "1" : "0.7"}
      sx={{ transition: "all 0.3s ease" }}
      position="relative"
      _hover={{
        textDecoration: "none",
        opacity: hoverOpacity,
        color: "white",
      }}
    >
      {isExternal ? (
        <ChakraLink
          _hover={{
            textDecoration: "none",
            opacity: hoverOpacity,
          }}
          isExternal
          href={href}
        >
          {children}
        </ChakraLink>
      ) : (
        <NextLink href={href}>{children}</NextLink>
      )}
    </Box>
  );
}

export default Link;
