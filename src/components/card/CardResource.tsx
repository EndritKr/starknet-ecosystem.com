import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { ResourceItf } from "../../../data/academy";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface CardResourceProps {
  index: number;
  resource: ResourceItf;
  indication?: any;
  cardContent?: any;
}

function CardResource({
  index,
  resource,
  indication,
  cardContent,
}: CardResourceProps) {
  const { name, description, link } = resource;

  const getFallbackText = (text: string) => {
    return (
      <Text fontWeight="bold" fontSize="24px" color="white">
        {text.substring(0, 1).toUpperCase()}
      </Text>
    );
  };

  const getFallbackColor = () => {
    return `flat.${((index % 9) + 1) * 100}`;
  };

  const handleClick = () => {
    if (link) window.open(link, "_blank");
  };

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    hover: {
      y: -8,
      scale: 1.02,
    },
  };

  return (
    <MotionBox
    initial="hidden"
    animate="visible"
    whileHover="hover"
    variants={cardVariants}
    transition={{
      delay: index * 0.05,        // ✔️ OK ici
      duration: 0.4,              // ✔️ OK
      ease: [0.25, 0.46, 0.45, 0.94], // ✔️ OK ici, pas dans un variant
    }}
    cursor="pointer"
    onClick={handleClick}
    w="full"
    >
      <MotionFlex
        bg="primary.800"
        borderRadius="xl"
        p={4}
        border="1px solid"
        borderColor="primary.700"
        transition="all 0.3s ease"
        _hover={{
          borderColor: "accent.500",
          boxShadow: "0 8px 24px rgba(14, 165, 233, 0.15)",
        }}
        direction={{ base: "column", sm: "row" }}
        gap={4}
        h="full"
      >
        {/* Icon/Image Section */}
        <MotionFlex
          bg={getFallbackColor()}
          h={{ base: "120px", sm: "112px" }}
          w={{ base: "full", sm: "112px" }}
          minW="112px"
          borderRadius="lg"
          align="center"
          justify="center"
          overflow="hidden"
          position="relative"
          flexShrink={0}
        >
          {cardContent || getFallbackText(name)}
          {link && (
            <Box
              position="absolute"
              top={2}
              right={2}
              bg="primary.900"
              borderRadius="full"
              p={1.5}
              opacity={0.8}
            >
              <FontAwesomeIcon
                icon={faExternalLink}
                fontSize="10px"
                color="rgba(255, 255, 255, 0.7)"
              />
            </Box>
          )}
        </MotionFlex>

        {/* Content Section */}
        <MotionFlex
          flex={1}
          direction="column"
          justify="space-between"
          align="flex-start"
          minW={0}
        >
          <Box flex={1} w="full">
            <Text
              as="h6"
              fontWeight="bold"
              fontSize="lg"
              mb={2}
              color="whiteAlpha.900"
              lineHeight="1.3"
            >
              {name}
            </Text>
            <Text
              fontSize="sm"
              color="whiteAlpha.600"
              overflow="hidden"
              textOverflow="ellipsis"
              display="-webkit-box"
              sx={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }}
              lineHeight="1.5"
              mb={3}
            >
              {description}
            </Text>
          </Box>

          {/* Indication (Difficulty or Network Logos) */}
          {indication && (
            <Box mt="auto">
              {indication}
            </Box>
          )}
        </MotionFlex>
      </MotionFlex>
    </MotionBox>
  );
}

export default CardResource;
