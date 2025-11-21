import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar, Image, Tag as ChakraTag } from "@chakra-ui/react";
import { faCircle, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";

import type { Project } from "../../../data/ecosystem";
import { allEcosystemTags } from "../../../data/tag";
import ProjectsInfos from "../../components/project/ProjectsInfos";
import { EcosystemApi } from "../../services/ecosystem-api.service";
import FourOhFour from "../404";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const ProjectPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (typeof id === "string") {
      EcosystemApi.fetchProjectById(id)
        .then(setProject)
        .catch(() => setError(true));
    } else {
      setError(true);
    }
  }, [id]);

  if (!project && error) return <FourOhFour />;
  if (!project) {
    return (
      <Flex
        w="full"
        h="50vh"
        align="center"
        justify="center"
      >
        <Text color="whiteAlpha.600">Loading...</Text>
      </Flex>
    );
  }

  // Get project tags
  const projectTags = allEcosystemTags.filter((tag) =>
    project.tags.includes(tag.value)
  );

  const getHighlighted = (): string => project.name.split(" ")[0];
  const getText = (): string => {
    const words = project.name.split(" ");
    if (words.length === 1) return "";
    return words.slice(1, words.length).join(" ");
  };

  return (
    <Flex
      w="full"
      direction="column"
      align="flex-start"
      position="relative"
      bgGradient="linear(to-b, rgba(14, 14, 22, 0.96), primary.900)"
      borderRadius={{ base: "2xl", md: "3xl" }}
      p={{ base: 4, md: 8 }}
      gap={10}
      boxShadow="0 30px 80px rgba(6, 8, 18, 0.55)"
    >
      {/* Hero Section with Banner */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        w="full"
        mb={12}
      >
        <Box position="relative" w="full" borderTopRadius="3xl" overflow="visible">
          <MotionBox
            borderRadius="3xl"
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.100"
            boxShadow="0 30px 80px rgba(8, 10, 22, 0.6)"
            bg="primary.800"
          >
            <Box position="relative" w="full" h="full">
              <Box
                w="full"
                h={{ base: "240px", md: "340px", lg: "420px" }}
                position="relative"
              >
                <Image
                  src={project.network.twitterBanner ?? project.image}
                  width="full"
                  height="full"
                  objectFit="cover"
                  alt={project.name}
                />
                <Box
                  position="absolute"
                  inset={0}
                  bgGradient="linear(to-b, rgba(10, 10, 18, 0.2), rgba(10, 10, 18, 0.92))"
                />
              </Box>
            </Box>
          </MotionBox>

          {/* Status Badge */}
          {(project.isLive || project.isTestnetLive) && (
            <MotionBox
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              position="absolute"
              top={6}
              left={6}
            >
              <ChakraTag
                borderRadius="full"
                bg={project.isLive ? "success.500" : "warning.500"}
                px={4}
                py={2}
                boxShadow="0 12px 24px rgba(0,0,0,0.3)"
              >
                <FontAwesomeIcon fontSize="8px" icon={faCircle} />
                <Text ml={2} fontSize="sm" color="white" fontWeight="bold">
                  {project.isLive ? "Live" : "Testnet"}
                </Text>
              </ChakraTag>
            </MotionBox>
          )}

          {/* Project Avatar Overlay */}
          <MotionBox
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.45, type: "spring" }}
            position="absolute"
            bottom={{ base: -36, md: -40 }}
            left={{ base: 6, md: 10 }}
            zIndex={2}
          >
            <Avatar
              size={{ base: "xl", md: "2xl" }}
              name={project.name}
              src={project.network.twitterImage || `/logos/${project.image}`}
              border="4px solid"
              borderColor="primary.900"
              bg="primary.700"
              boxShadow="0 20px 45px rgba(6,8,18,0.55)"
            />
          </MotionBox>
        </Box>
      </MotionBox>

      {/* Main Content */}
      <Flex
        w="full"
        direction={{ base: "column", lg: "row" }}
        gap={8}
        align="flex-start"
      >
        {/* Left Column - Main Info */}
        <Flex
          flex={1}
          direction="column"
          minW={0}
          pt={{ base: 16, md: 20 }}
          px={{ base: 2, md: 4 }}
        >
          {/* Title Section */}
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            mb={6}
          >
            <Text
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              lineHeight="1.1"
              mb={4}
              bgGradient="linear(to-r, white, whiteAlpha.900)"
              bgClip="text"
            >
              <Text as="span" color="accent.400">
                {getHighlighted()}
              </Text>
              {getText() && ` ${getText()}`}
            </Text>

            {/* Description */}
            {project.description && (
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="whiteAlpha.700"
                lineHeight="1.7"
                maxW="800px"
                mb={6}
              >
                {project.description}
              </Text>
            )}

            {/* Tags */}
            {projectTags.length > 0 && (
              <Flex
                wrap="wrap"
                gap={2}
                mt={4}
              >
                {projectTags.map((tag, index) => (
                  <MotionBox
                    key={tag.value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <ChakraTag
                      fontSize="sm"
                      fontWeight="medium"
                      borderRadius="full"
                      px={4}
                      py={2}
                      bg="primary.800"
                      color="whiteAlpha.900"
                      border="1px solid"
                      borderColor="primary.700"
                      _hover={{
                        borderColor: "accent.500",
                        bg: "primary.700",
                      }}
                      transition="all 0.2s"
                    >
                      {tag.label}
                    </ChakraTag>
                  </MotionBox>
                ))}
              </Flex>
            )}
          </MotionBox>

          {/* Project Info Cards */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            w="full"
          >
            <ProjectsInfos project={project} />
          </MotionBox>
        </Flex>

        {/* Right Column - Additional Info Sidebar */}
        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          w={{ base: "full", lg: "400px" }}
          flexShrink={0}
        >
          <Box
            bgGradient="linear(to-br, rgba(249, 107, 44, 0.15), rgba(8, 4, 3, 0.95))"
            borderRadius="2xl"
            p={6}
            border="1px solid"
            borderColor="whiteAlpha.100"
            position="sticky"
            top={24}
            boxShadow="0 30px 60px rgba(6,10,22,0.5)"
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              mb={6}
              color="whiteAlpha.900"
            >
              Quick Links
            </Text>

            {/* Social Links */}
            <Flex direction="column" gap={4}>
              {project.network.twitter && (
                <MotionBox
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Flex
                    as="a"
                    href={project.network.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    align="center"
                    gap={3}
                    p={3}
                    borderRadius="lg"
                    bg="rgba(18,18,28,0.85)"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    _hover={{
                      borderColor: "accent.500",
                      bg: "rgba(18,18,28,0.95)",
                    }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <Text fontSize="sm" fontWeight="medium">
                      Twitter
                    </Text>
                    <FontAwesomeIcon
                      icon={faExternalLink}
                      fontSize="12px"
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  </Flex>
                </MotionBox>
              )}

              {project.network.github && (
                <MotionBox
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Flex
                    as="a"
                    href={project.network.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    align="center"
                    gap={3}
                    p={3}
                    borderRadius="lg"
                    bg="primary.900"
                    border="1px solid"
                    borderColor="primary.700"
                    _hover={{
                      borderColor: "accent.500",
                      bg: "primary.700",
                    }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <Text fontSize="sm" fontWeight="medium">
                      GitHub
                    </Text>
                    <FontAwesomeIcon
                      icon={faExternalLink}
                      fontSize="12px"
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  </Flex>
                </MotionBox>
              )}

              {project.network.website && (
                <MotionBox
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Flex
                    as="a"
                    href={project.network.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    align="center"
                    gap={3}
                    p={3}
                    borderRadius="lg"
                    bg="primary.900"
                    border="1px solid"
                    borderColor="primary.700"
                    _hover={{
                      borderColor: "accent.500",
                      bg: "primary.700",
                    }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <Text fontSize="sm" fontWeight="medium">
                      Website
                    </Text>
                    <FontAwesomeIcon
                      icon={faExternalLink}
                      fontSize="12px"
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  </Flex>
                </MotionBox>
              )}
            </Flex>

            {/* Network Info */}
            <Box
              mt={8}
              pt={6}
              borderTop="1px solid"
              borderColor="primary.700"
            >
              <Text
                fontSize="sm"
                color="whiteAlpha.600"
                mb={3}
                fontWeight="medium"
              >
                Network Status
              </Text>
              <Flex align="center" gap={2}>
                <Box
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  bg={project.isLive ? "success.500" : project.isTestnetLive ? "warning.500" : "error.500"}
                  boxShadow={`0 0 8px ${project.isLive ? "rgba(16, 185, 129, 0.5)" : project.isTestnetLive ? "rgba(245, 158, 11, 0.5)" : "rgba(239, 68, 68, 0.5)"}`}
                />
                <Text fontSize="sm" color="whiteAlpha.700">
                  {project.isLive
                    ? "Mainnet Live"
                    : project.isTestnetLive
                      ? "Testnet Live"
                      : "Not Live"}
                </Text>
              </Flex>
            </Box>
          </Box>
        </MotionBox>
      </Flex>
    </Flex>
  );
};

export default ProjectPage;
