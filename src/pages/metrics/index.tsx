import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import type { FC } from "react";

import HighlightedText from "../../components/layout/HighlightedText";
import EcosystemMetrics from "../../components/metrics/ecosystem-metrics";
import GithubReposPaper from "../../components/metrics/github-repos-paper";
import NpmDownloadsPaper from "../../components/metrics/npm-downloads-paper";
import { useTranslate } from "../../context/TranslateProvider";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const MetricsPage: FC = () => {
  const { t } = useTranslate();

  return (
    <Flex
      w="full"
      direction="column"
      justify="flex-start"
      align="center"
      transform="translateZ(0)"
      position="relative"
      py={12}
      px={{ base: 4, md: 6 }}
      bgGradient="linear(to-b, rgba(6, 4, 3, 0.95), rgba(28, 12, 6, 0.92))"
    >
      {/* Hero Section - Centered */}
      <Flex
        w="full"
        direction="column"
        align="center"
        justify="center"
        mb={16}
        px={4}
      >
        {/* Title - Centered */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          w="full"
          textAlign="center"
          mb={6}
        >
          <Text
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="extrabold"
            lineHeight="1.05"
            letterSpacing="-0.01em"
            bgGradient="linear(to-r, whiteAlpha.900, accent.400)"
            bgClip="text"
          >
            {t.metrics.title || "Ecosystem metrics"}
          </Text>
        </MotionBox>

        {/* Subtitle - Centered */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          w="full"
          maxW="800px"
          textAlign="center"
          mb={10}
        >
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="whiteAlpha.700"
            lineHeight="1.8"
            maxW="720px"
            mx="auto"
          >
            Real-time network statistics and developer activity metrics that help you keep a pulse on Starknet adoption and tooling momentum.
          </Text>
        </MotionBox>
      </Flex>

      {/* Network Activity Section */}
      <Box w="full" maxW="1400px" px={4} mb={16}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          w="full"
          bgGradient="linear(to-br, rgba(249, 107, 44, 0.18), rgba(7, 4, 3, 0.95))"
          borderRadius="3xl"
          border="1px solid"
          borderColor="whiteAlpha.100"
          boxShadow="0 40px 80px rgba(6, 10, 22, 0.55)"
          px={{ base: 6, md: 10 }}
          py={{ base: 6, md: 10 }}
        >
          <Flex direction="column" gap={6}>
            <Box>
              <Text
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                bgGradient="linear(to-r, white, whiteAlpha.800)"
                bgClip="text"
                mb={2}
              >
                {t.metrics.network_activity || "Network Activity"}
              </Text>
              <Text fontSize="sm" color="whiteAlpha.600" maxW="600px">
                Track Starknet’s throughput at a glance—bridge balances, transactions, contracts, and blocks across mainnet and testnet.
              </Text>
            </Box>
            <EcosystemMetrics />
          </Flex>
        </MotionBox>
      </Box>

      {/* Developer Tools Section */}
      <Box w="full" maxW="1400px" px={4} mb={16}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          w="full"
        >
          <Flex direction="column" gap={6} mb={6}>
            <Text
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, white, whiteAlpha.800)"
              bgClip="text"
            >
              {t.metrics.developer_tools || "Developer Tools"}
            </Text>
            <Text fontSize="sm" color="whiteAlpha.600" maxW="700px">
              Monitor library momentum and repository activity to understand how quickly tools are evolving for builders.
            </Text>
          </Flex>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={6}
            w="full"
          >
            <MotionBox
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              bg="rgba(18, 18, 28, 0.85)"
              borderRadius="2xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              boxShadow="0 30px 60px rgba(6, 10, 22, 0.45)"
              p={4}
            >
              <GithubReposPaper />
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              bg="rgba(18, 18, 28, 0.85)"
              borderRadius="2xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              boxShadow="0 30px 60px rgba(6, 10, 22, 0.45)"
              p={4}
            >
              <NpmDownloadsPaper name="starknet" label="starknet.js" />
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              bg="rgba(18, 18, 28, 0.85)"
              borderRadius="2xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              boxShadow="0 30px 60px rgba(6, 10, 22, 0.45)"
              p={4}
            >
              <NpmDownloadsPaper name="get-starknet" label="get-starknet" />
            </MotionBox>
          </SimpleGrid>
        </MotionBox>
      </Box>
    </Flex>
  );
};

export default MetricsPage;
