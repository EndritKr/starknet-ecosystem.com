import { Box, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import {
  AspectRatio,
  Avatar,
  Image,
  Tag as ChakraTag,
} from "@chakra-ui/react";
import { faCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import type { ProjectItf } from "../../../data/ecosystem";
import { useTranslate } from "../../context/TranslateProvider";
import NetworkLogos from "../layout/NetworkLogos";

function pick(amount: number) {
  return (_: unknown, index: number) => index < amount;
}

interface CardProjectModernProps {
  index: number;
  project: ProjectItf;
}

const MotionBox = motion(Box);
function CardProjectModern({ index, project }: CardProjectModernProps) {
  const { t } = useTranslate();
  const router = useRouter();

  const {
    name,
    tagsRef: tags,
    network,
    isLive,
    isTestnetLive,
    image,
  } = project;

  const getFallbackText = (text: string) => (
    <Text fontWeight="extrabold" fontSize="20px" letterSpacing="0.08em">
      {text}
    </Text>
  );

  const getFallbackColor = () => `flat.${((index % 9) + 1) * 100}`;

  const getIndicationText = (): string | undefined => {
    if (isLive) {
      return "Live";
    }
    if (isTestnetLive) {
      return "Testnet";
    }
    return undefined;
  };

  const renderFallbackImage = () => (
    <Flex
      w="full"
      h="full"
      align="center"
      justify="center"
      bgGradient="linear(to-br, rgba(249, 107, 44, 0.22), rgba(8, 4, 3, 0.9))"
      textAlign="center"
      color="whiteAlpha.900"
      px={6}
    >
      {getFallbackText(name.toUpperCase())}
    </Flex>
  );

  const indication = getIndicationText();

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
      delay: index * 0.05,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94], // ✔️ autorisé ici
    }}
    h="full"
    cursor="pointer"
    onClick={() => router.push({ pathname: `/projects/${project.id}` })}
    >
    <Flex
      h="full"
      direction="column"
      bgGradient="linear(to-br, rgba(249, 107, 44, 0.15), rgba(9, 5, 3, 0.95))"
      borderRadius="3xl"
        overflow="visible"
        border="1px solid"
        borderColor="whiteAlpha.100"
        boxShadow="0 18px 50px rgba(8, 8, 16, 0.55)"
        transition="all 0.3s ease"
        role="group"
        _hover={{
          borderColor: "accent.500",
          boxShadow: "0 30px 70px rgba(20, 12, 48, 0.6)",
        }}
      >
        {/* Image Banner with gradient overlay */}
        <Box position="relative" borderTopRadius="3xl" overflow="visible">
          <AspectRatio
            w="full"
            ratio={16 / 9}
            borderTopRadius="3xl"
            overflow="hidden"
          >
            <Box
              w="full"
              h="full"
              position="relative"
              bg="rgba(20, 20, 28, 0.85)"
            >
              <Image
                w="full"
                h="full"
                fallback={renderFallbackImage()}
                src={network.twitterBanner}
                objectFit="cover"
                objectPosition="center"
                transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                transformOrigin="center"
                _groupHover={{ transform: "scale(1.02)" }}
                alt={`${name} visual`}
              />
              <Box
                position="absolute"
                inset={0}
                pointerEvents="none"
                bgGradient="linear(to-b, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.65))"
              />

              {/* Live/Testnet Badge */}
              {indication && (
                <MotionBox
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  position="absolute"
                  top={4}
                  left={4}
                >
                  <ChakraTag
                    borderRadius="full"
                    bg={isLive ? "success.500" : "warning.200"}
                    color={isLive ? "white" : "gray.900"}
                    px={3}
                    py={1}
                    boxShadow="lg"
                  >
                    <FontAwesomeIcon fontSize="6px" icon={faCircle} />
                    <Text ml={2} fontSize="xs" fontWeight="bold" textTransform="uppercase">
                      {indication}
                    </Text>
                  </ChakraTag>
                </MotionBox>
              )}
            </Box>
          </AspectRatio>

          <MotionBox
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 + 0.25, type: "spring" }}
            position="absolute"
            bottom="-32px"
            left={6}
            zIndex={2}
          >
            <Avatar
              size="lg"
              name={name}
              src={network.twitterImage || `/logos/${image}`}
              border="4px solid"
              borderColor="primary.900"
              bg={getFallbackColor()}
              boxShadow="0 8px 25px rgba(0, 0, 0, 0.45)"
            />
          </MotionBox>
        </Box>

        {/* Content */}
        <Flex flex={1} direction="column" pt={16} pb={6} px={6}>
          <Box>
            <Text
              as="h3"
              fontSize="xl"
              fontWeight="semibold"
              bgGradient="linear(to-r, whiteAlpha.900, whiteAlpha.700)"
              bgClip="text"
              noOfLines={1}
            >
              {name}
            </Text>

            <HStack spacing={2} flexWrap="wrap" mt={4}>
              {tags && tags.length > 0 ? (
                tags.filter(pick(4)).map((tag, tagIndex) => (
                  <MotionBox
                    key={`project-${name}-tag-${tag.value}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05 + 0.35 + tagIndex * 0.05,
                    }}
                  >
                    <ChakraTag
                      fontSize="xs"
                      fontWeight="medium"
                      borderRadius="full"
                      px={3}
                      py={1.5}
                      bg="rgba(255,255,255,0.04)"
                      color="whiteAlpha.900"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      letterSpacing="0.04em"
                      textTransform="uppercase"
                    >
                      {t.tags[tag.value] || tag.label || tag.value}
                    </ChakraTag>
                  </MotionBox>
                ))
              ) : (
                <ChakraTag bg="rgba(255,255,255,0.04)" color="whiteAlpha.700">
                  No tags
                </ChakraTag>
              )}
            </HStack>
          </Box>

          <Spacer />

          <Flex
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap={4}
            pt={6}
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
          >
            <NetworkLogos network={network} justifyContent="flex-start" />
            <MotionBox
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              cursor="pointer"
            >
              <Flex
                align="center"
                color="accent.400"
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="0.08em"
              >
                View project
                <Box as="span" ml={2}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Box>
              </Flex>
            </MotionBox>
          </Flex>
        </Flex>
      </Flex>
    </MotionBox>
  );
}

export default CardProjectModern;
