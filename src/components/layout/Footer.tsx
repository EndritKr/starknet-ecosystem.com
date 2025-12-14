import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

import { useTranslate } from "../../context/TranslateProvider";

import LanguageChooser from "./LanguageChooser";
import Link from "./Link";
import NetworkLogos from "./NetworkLogos";
import Logo from "./Logo";

const githubLink = "https://github.com/419Labs/starknet-ecosystem.com";
const telegramLink = "https://t.me/starknet_ecosystem";
const twitterLink = "https://twitter.com/StarkNetEco";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

function Footer() {
  const { locale, t } = useTranslate();
  const [isTooltipOpen, setTooltipOpen] = useState(false);

  const renderTooltip = (label: string) => {
    const content = (
      <Text
        fontSize="sm"
        color="whiteAlpha.600"
        overflow="hidden"
        textOverflow="ellipsis"
        display="-webkit-box"
        sx={{ WebkitLineClamp: "3", WebkitBoxOrient: "vertical" }}
      >
        {label}
      </Text>
    );
    const tooltip = (
      <Flex
        fontSize="md"
        color="whiteAlpha.900"
        bg="primary.800"
        borderRadius="lg"
        p={4}
        border="1px solid"
        borderColor="primary.700"
      >
        {label}
      </Flex>
    );
    return (
      <ChakraTooltip isOpen={isTooltipOpen} bg="transparent" label={tooltip}>
        <Box
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
          onClick={() => setTooltipOpen(true)}
        >
          {content}
        </Box>
      </ChakraTooltip>
    );
  };

  return (
    <Box
      as="footer"
      w="full"
      mt={24}
      py={16}
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      bgGradient="linear(to-b, rgba(7, 4, 3, 0.95), rgba(24, 10, 5, 0.92))"
    >
      <Flex direction="column" maxW="1400px" mx="auto" px={{ base: 4, md: 8 }}>
        <Flex
          direction={{ base: "column", xl: "row" }}
          justify="space-between"
          align={{ base: "flex-start", xl: "center" }}
          gap={{ base: 10, xl: 16 }}
          w="full"
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            w={{ base: "full", xl: "auto" }}
          >
            <VStack align="flex-start" spacing={4} maxW="sm">
              <Logo />
              <Text color="whiteAlpha.600" fontSize="sm">
                Curating the builders, tools, and data fueling Starknet’s
                future.
                
              </Text>
              <HStack spacing={3}>
                <Text color="whiteAlpha.600" fontSize="sm">
                  {t.common.made_with}
                </Text>
                <Text fontSize="md">❤️</Text>
                <Text color="whiteAlpha.600" fontSize="sm">
                  {t.common.by}
                </Text>
                <Link isExternal active href="https://twitter.com/avnu_fi">
                  <Text fontWeight="600" fontSize="sm" _hover={{ color: "accent.400" }}>
                    {t.common.avnu_team}
                  </Text>
                </Link>
              </HStack>
              <NetworkLogos
                network={{
                  github: githubLink,
                  telegram: telegramLink,
                  twitter: twitterLink,
                }}
              />
            </VStack>
          </MotionBox>

          <Flex
            wrap="wrap"
            columnGap={{ base: 12, md: 16 }}
            rowGap={12}
            flex={1}
            justify={{ base: "flex-start", xl: "flex-end" }}
          >
            <MotionVStack
              align="flex-start"
              spacing={4}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Text
                fontSize="xs"
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="0.12em"
                color="whiteAlpha.700"
              >
                Company
              </Text>
              <VStack align="flex-start" spacing={3} fontSize="sm">
                <Link
                  isExternal
                  href="https://api.starknet-db.com/swagger-ui/index.html#/"
                  _hover={{ color: "accent.400" }}
                >
                  API
                </Link>
                <Link
                  isExternal
                  href="https://github.com/419Labs/starknet-ecosystem.com"
                  _hover={{ color: "accent.400" }}
                >
                  About
                </Link>
                <Link
                  href={`/${locale}/privacy-policy`}
                  _hover={{ color: "accent.400" }}
                >
                  Privacy Policy
                </Link>
              </VStack>
            </MotionVStack>

            <MotionVStack
              align="flex-start"
              spacing={4}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Text
                fontSize="xs"
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="0.12em"
                color="whiteAlpha.700"
              >
                Support
              </Text>
              <VStack align="flex-start" spacing={3} fontSize="sm">
                <Link
                  isExternal
                  href="https://github.com/419Labs/starknet-ecosystem.com/blob/main/docs/add-project.md"
                  _hover={{ color: "accent.400" }}
                >
                  List a project
                </Link>
                <Link
                  isExternal
                  href="https://github.com/419Labs/starknet-ecosystem.com/blob/main/docs/add-job.md"
                  _hover={{ color: "accent.400" }}
                >
                  List a job
                </Link>
                <Link
                  isExternal
                  href="https://t.me/starknet_ecosystem"
                  _hover={{ color: "accent.400" }}
                >
                  Contact us
                </Link>
              </VStack>
            </MotionVStack>

            <MotionVStack
              align="flex-start"
              spacing={4}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              maxW="280px"
            >
              <Text
                fontSize="xs"
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="0.12em"
                color="whiteAlpha.700"
              >
                Initiative
              </Text>
              {renderTooltip(
                "This is a community-owned initiative supported by StarkWare. The links in the Starknet Ecosystem are provided as a convenience and for informational purposes only; they do not constitute an endorsement or approval by our initiative of any of the projects or services listed therein.",
              )}
            </MotionVStack>

            <MotionVStack
              align="flex-start"
              spacing={4}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Text
                fontSize="xs"
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="0.12em"
                color="whiteAlpha.700"
              >
                Language
              </Text>
              <LanguageChooser />
            </MotionVStack>
          </Flex>
        </Flex>

        <Box w="full" mt={12} borderTop="1px solid" borderColor="whiteAlpha.100" pt={6}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap={4}
          >
            <Text fontSize="xs" color="whiteAlpha.500" maxW="lg">
              © {new Date().getFullYear()} Starknet Ecosystem — community-driven and open-source.
            </Text>
            <HStack spacing={3} fontSize="xs" color="whiteAlpha.500">
              <Text textTransform="uppercase" letterSpacing="0.18em">
                Built for builders
              </Text>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Footer;
