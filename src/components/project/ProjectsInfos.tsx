import { Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import type { FC } from "react";
import { useEffect, useState } from "react";

import type { Project } from "../../../data/ecosystem";
import allJobs from "../../../data/job";
import { useTranslate } from "../../context/TranslateProvider";
import Link from "../layout/Link";
import NetworkLogos from "../layout/NetworkLogos";

import ProjectsInfosDetails from "./ProjectsInfosDetails";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface Props {
  project?: Project;
}

const ProjectsInfos: FC<Props> = ({ project }) => {
  const { t } = useTranslate();
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    setJobCount(allJobs.filter((job) => job.projectId === project?.id).length);
  }, [project]);

  if (!project) return null;

  return (
    <MotionFlex
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      direction="column"
      align="flex-start"
      w="full"
    >
      <Text
        fontSize={{ base: "2xl", md: "3xl" }}
        mb={8}
        fontWeight="bold"
        bgGradient="linear(to-r, white, whiteAlpha.800)"
        bgClip="text"
      >
        Project Information
      </Text>

      <Flex
        direction={{ base: "column", md: "row" }}
        w="full"
        gap={8}
        flexWrap="wrap"
      >
        {/* Social Links Section */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          flex={1}
          minW={{ base: "100%", md: "250px" }}
        >
          <Box
            bg="primary.800"
            borderRadius="xl"
            p={6}
            border="1px solid"
            borderColor="primary.700"
            h="full"
            _hover={{
              borderColor: "primary.600",
            }}
            transition="all 0.3s"
          >
            <Text
              fontSize="sm"
              fontWeight="600"
              mb={4}
              color="whiteAlpha.700"
              letterSpacing="0.05em"
              textTransform="uppercase"
            >
              Social Links
            </Text>
            <ProjectsInfosDetails
              title=""
              value={<NetworkLogos network={project.network} />}
            />
            {project.token && (
              <Box mt={6}>
                <ProjectsInfosDetails
                  title="Token"
                  value={
                    <HStack>
                      <Text color="whiteAlpha.600" fontSize="sm">
                        {project.token}
                      </Text>
                    </HStack>
                  }
                />
              </Box>
            )}
          </Box>
        </MotionBox>

        {/* Jobs & Other Info Section */}
        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          flex={1}
          minW={{ base: "100%", md: "250px" }}
        >
          <Box
            bg="primary.800"
            borderRadius="xl"
            p={6}
            border="1px solid"
            borderColor="primary.700"
            h="full"
            _hover={{
              borderColor: "primary.600",
            }}
            transition="all 0.3s"
          >
            <Text
              fontSize="sm"
              fontWeight="600"
              mb={4}
              color="whiteAlpha.700"
              letterSpacing="0.05em"
              textTransform="uppercase"
            >
              Opportunities
            </Text>
            <ProjectsInfosDetails
              title={t.common.jobs || "Jobs"}
              value={
                <HStack>
                  <Text color="whiteAlpha.600" fontSize="sm">
                    {jobCount === 0
                      ? "No open position"
                      : `${jobCount} open position${jobCount > 1 ? "s" : ""}`}
                  </Text>
                  {jobCount > 0 && (
                    <Link
                      href="/jobs"
                      color="accent.400"
                      fontWeight="600"
                      fontSize="sm"
                      _hover={{
                        color: "accent.300",
                      }}
                    >
                      View →
                    </Link>
                  )}
                </HStack>
              }
            />
          </Box>
        </MotionBox>
      </Flex>
    </MotionFlex>
  );
};

export default ProjectsInfos;
