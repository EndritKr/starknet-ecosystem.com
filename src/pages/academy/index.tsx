import { Box, Flex, Text } from "@chakra-ui/layout";
import type { FC, ChangeEvent } from "react";
import { useState } from "react";
import { useInView } from "react-cool-inview";
import { motion } from "framer-motion";

import { academyResourcesBundle } from "../../../data/academy";
import { AcademyCategory, allAcademyTags } from "../../../data/tag";
import ContributeContent from "../../components/academy/ContributeContent";
import LearnContent from "../../components/academy/LearnContent";
import NewsInfosContent from "../../components/academy/NewsInfosContent";
import ToolsContent from "../../components/academy/ToolsContent";
import WalletsContent from "../../components/academy/WalletsContent";
import HighlightedText from "../../components/layout/HighlightedText";
import CategoryFilter from "../../components/layout/CategoryFilter";
import SearchBar from "../../components/layout/SearchBar";
import { useTranslate } from "../../context/TranslateProvider";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const AcademyPage: FC = () => {
  const { t } = useTranslate();
  const [currentCategory, setCurrentCategory] = useState(allAcademyTags[0]);
  const [keyword, setKeyword] = useState<string>("");
  const LOADED_STEPS = 20;
  const [lastIndexLoaded, setLastIndexLoaded] = useState<number>(LOADED_STEPS);

  const { observe } = useInView({
    onEnter: ({ unobserve }) => {
      unobserve();
      setLastIndexLoaded(lastIndexLoaded + LOADED_STEPS);
    },
  });

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) =>
    setKeyword(event.target.value);

  const renderContent = () => {
    switch (currentCategory.value) {
      case AcademyCategory.CONTRIBUTE:
        return (
          <ContributeContent
            resources={academyResourcesBundle.contributions}
            observe={observe}
            keyword={keyword}
          />
        );
      case AcademyCategory.TOOLS:
        return (
          <ToolsContent
            resources={academyResourcesBundle.tools}
            observe={observe}
            keyword={keyword}
          />
        );
      case AcademyCategory.WALLETS:
        return (
          <WalletsContent
            resources={academyResourcesBundle.wallets}
            observe={observe}
            keyword={keyword}
          />
        );
      case AcademyCategory.NEWS_FEED:
        return (
          <NewsInfosContent
            resources={academyResourcesBundle.newsfeed}
            observe={observe}
            keyword={keyword}
          />
        );
      case AcademyCategory.LEARNING:
      default:
        return (
          <LearnContent
            observe={observe}
            highlightedResources={academyResourcesBundle.learning.highlighted}
            resources={academyResourcesBundle.learning.other}
            keyword={keyword}
          />
        );
    }
  };

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
        {/* Title - Centered (kept as is) */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          w="full"
          maxW="1000px"
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
            {t.common.academy || "Academy"}
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
            {t.common.academy_subtitle ||
              "Your Starknet learning shop. Find tutorials, guides, contributions, libraries. Subscribe to newsletters to keep track of this very fast-moving ecosystem."}
          </Text>
        </MotionBox>
      </Flex>

      {/* Category Filter - Horizontal and Modern */}
      <Box w="full" maxW="1400px" px={4} mb={8}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          w="full"
        >
          <CategoryFilter
            tags={allAcademyTags}
            selectedTag={currentCategory}
            onSelect={(newTag) => {
              setCurrentCategory(newTag);
            }}
          />
        </MotionBox>
      </Box>

      {/* Search Bar */}
      <Box w="full" maxW="1400px" px={4} mb={8}>
        <Flex
          w="full"
          justify={{ base: "center", md: "flex-end" }}
          align="center"
        >
          <Box w={{ base: "full", md: "320px" }}>
            <SearchBar
              value={keyword}
              onChange={handleChangeKeyword}
              placeholder="Search resources..."
            />
          </Box>
        </Flex>
      </Box>

      {/* Content Section */}
      <Box w="full" maxW="1400px" px={4}>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          w="full"
        >
          {renderContent()}
        </MotionBox>
      </Box>
    </Flex>
  );
};

export default AcademyPage;
