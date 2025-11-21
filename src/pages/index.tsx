import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/react";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";

import type { Project, ProjectItf } from "../../data/ecosystem";
import type { Tag } from "../../data/tag";
import { allEcosystemTags } from "../../data/tag";
import CardProjectModern from "../components/card/CardProjectModern";
import CardProjectSkeleton from "../components/card/CardProjectSkeleton";
import SearchBar from "../components/layout/SearchBar";
import Menu from "../components/layout/Menu";
import SwitchTag from "../components/layout/SwitchTag";
import CategoryFilter from "../components/layout/CategoryFilter";
//import HomeMetrics from "../components/metrics/HomeMetrics";
import EcosystemMetrics from "../components/metrics/ecosystem-metrics";
import { useTranslate } from "../context/TranslateProvider";
import { EcosystemApi } from "../services/ecosystem-api.service";
import {
  projectIncludesKeyword,
  ProjectSorting,
  sortBy,
} from "../services/project.service";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Home = () => {
  const { t } = useTranslate();
  const LOADED_STEPS = 12;
  const sortTags: Tag[] = [
    { key: ProjectSorting.A_Z, value: "A - Z", icon: "", label: "A - Z" },
    {
      key: ProjectSorting.TWITTER,
      value: "Followers",
      icon: "",
      label: "Followers",
    },
  ];
  const tagAll = allEcosystemTags[0];
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(tagAll);
  const [filterMainnet, setFilterMainnet] = useState(true);
  const [sorter, setSorter] = useState(sortTags[0]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [projects, setProjects] = useState<ProjectItf[]>([]);
  const [filteredProjectsCount, setFilteredProjectsCount] =
    useState<number>(-1);
  const [lastIndexLoaded, setLastIndexLoaded] = useState<number>(LOADED_STEPS);
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    EcosystemApi.fetchEcosystemProjects(1000)
      .then(setAllProjects)
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filteredProjects = sortBy(
      allProjects
        .filter((project) => !filterMainnet || project.isLive)
        .filter((project: Project) => {
          return (
            (filter === tagAll || project.tags.indexOf(filter.value) !== -1) &&
            projectIncludesKeyword(project, keyword)
          );
        }),
      sorter.key === ProjectSorting.A_Z
        ? ProjectSorting.A_Z
        : ProjectSorting.TWITTER,
    );

    const newProjects = filteredProjects
      .slice(0, lastIndexLoaded)
      .map((project) => {
        const projectTags = project.tags;
        return {
          ...project,
          tagsRef: allEcosystemTags.filter((tagItem: Tag) => {
            return projectTags.includes(tagItem.value);
          }),
        };
      });
    setProjects(newProjects);
    setFilteredProjectsCount(loading ? -1 : filteredProjects.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, filterMainnet, sorter, keyword, lastIndexLoaded, allProjects]);

  const { observe } = useInView({
    onEnter: ({ unobserve }) => {
      unobserve();
      setLastIndexLoaded(lastIndexLoaded + LOADED_STEPS);
    },
  });

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) =>
    setKeyword(event.target.value);

  const renderLoadingState = () => {
    return Array(12)
      .fill(0)
      .map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={`project-skeleton-${index}`} flex={1}>
          <CardProjectSkeleton />
        </Box>
      ));
  };

  const renderSortMenu = () => {
    return (
      <Menu
        icon={faSort}
        small
        typeText=""
        tags={sortTags}
        initialValue={sorter}
        onChange={(newValue) => {
          setSorter(newValue);
        }}
      />
    );
  };

  const renderData = () => {
    return projects.map((project: ProjectItf, index: number) => {
      return (
        <Box
          ref={index === projects.length - 1 ? observe : null}
          key={`project-${project.name}`}
          flex={1}
        >
          <CardProjectModern index={index} project={project} />
        </Box>
      );
    });
  };

  return (
    <Flex
      w="full"
      direction="column"
      justify="flex-start"
      align="center"
      transform="translateZ(0)"
      position="relative"
      zIndex={1}
      py={12}
      px={{ base: 4, md: 6 }}
      bgGradient="linear(to-b, rgba(6, 4, 3, 0.95), rgba(28, 12, 6, 0.92))"
    >
        {/* Hero Section - Full Width */}
        <Flex
          w="full"
          direction="column"
          align="center"
          justify="center"
          mb={16}
          px={4}
        >
          {/* Title */}
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
              Discover, Build & Connect on Starknet
            </Text>
          </MotionBox>

          {/* Subtitle */}
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
              Explore the projects, wallets, and tools driving on-chain innovation. Your gateway to the Starknet ecosystem.
            </Text>
          </MotionBox>

          {/* Ecosystem Metrics */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
            w="full"
            maxW="1200px"
            px={{ base: 0, md: 4 }}
          >
            <Box
              w="full"
              border="1px solid"
              borderColor="whiteAlpha.100"
              borderRadius="3xl"
              boxShadow="0 30px 80px rgba(12, 10, 28, 0.55)"
              backdropFilter="blur(20px)"
              px={{ base: 6, md: 10 }}
              py={{ base: 6, md: 10 }}
              bgGradient="linear(to-br, rgba(249, 107, 44, 0.22), rgba(8, 4, 2, 0.92))"
            >
              <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align={{ base: "flex-start", md: "center" }}
                mb={{ base: 6, md: 8 }}
                gap={3}
              >
                <Box>
                  <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="semibold"
                    letterSpacing="0.02em"
                    textTransform="uppercase"
                    color="whiteAlpha.800"
                  >
                    {t.common.hero_metrics_title || "Live metrics"}
                  </Text>
                  <Text color="whiteAlpha.600" mt={1} maxW="3xl">
                    {t.common.hero_metrics_description ||
                      "Keep up with the latest transactions, contracts, and blocks securing the Starknet ecosystem."}
                  </Text>
                </Box>
              </Flex>
              <EcosystemMetrics />
            </Box>
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
              tags={allEcosystemTags}
              selectedTag={filter}
              onSelect={(newTag) => {
                setFilter(newTag);
                setFilteredProjectsCount(-1);
              }}
              projectCount={filteredProjectsCount}
            />
          </MotionBox>
        </Box>

        {/* Controls Bar */}
        <Box w="full" maxW="1400px" px={4} mb={8}>
          <Flex
            w="full"
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "stretch", md: "center" }}
            gap={4}
          >
            {/* Filter Toggles */}
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={3}
              align="flex-start"
            >
              <SwitchTag
                checkedText="Show all"
                placeholderText="Show all"
                onCheckedChange={() => setFilterMainnet(false)}
                isChecked={!filterMainnet}
              />
              <SwitchTag
                checkedText="Only mainnet"
                placeholderText="Only mainnet"
                onCheckedChange={() => setFilterMainnet(true)}
                isChecked={filterMainnet}
              />
            </Flex>

            {/* Search and Sort */}
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={3}
              align="flex-end"
              w={{ base: "full", md: "auto" }}
            >
              <Box w={{ base: "full", sm: "auto" }}>
                <SearchBar
                  value={keyword}
                  onChange={handleChangeKeyword}
                  placeholder="Search project..."
                />
              </Box>
              <Box w={{ base: "full", sm: "auto" }}>
                {renderSortMenu()}
              </Box>
            </Flex>
          </Flex>
        </Box>

        {/* Projects Grid */}
        <Box w="full" maxW="1400px" px={4}>
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            w="full"
          >
            {loading || (projects && projects.length > 0) ? (
              <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                spacing={{ base: 6, md: 8 }}
                w="full"
              >
                {loading ? renderLoadingState() : renderData()}
              </SimpleGrid>
            ) : (
              <Flex
                w="full"
                direction="column"
                justify="center"
                align="center"
                mt={20}
                py={12}
              >
                <Text fontSize="2xl" fontWeight="bold" mb={2}>
                  {t.common.no_project}
                </Text>
                <Text fontSize="lg" color="whiteAlpha.600">
                  {t.common.maybe_yours}
                </Text>
              </Flex>
            )}
          </MotionBox>
        </Box>
    </Flex>
  );
};

export default Home;
