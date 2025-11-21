import { Box, Flex, Text } from "@chakra-ui/layout";
import type { NextPage } from "next";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";
import { motion } from "framer-motion";

import { allProjects } from "../../../data/ecosystem";
import allJobs from "../../../data/job";
import JobTable from "../../components/job/JobTable";
import HighlightedText from "../../components/layout/HighlightedText";
import SearchBar from "../../components/layout/SearchBar";
import { useTranslate } from "../../context/TranslateProvider";
import type { Job } from "../../models/job";
import type { JobFilter } from "../../models/job-filter";
import { filterJobs } from "../../services/job.service";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const LOADED_STEPS = 25;

const JobsPage: NextPage = () => {
  const { t } = useTranslate();
  const [lastIndexLoaded, setLastIndexLoaded] = useState<number>(LOADED_STEPS);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<JobFilter>({
    remote: false,
    search: "",
    tags: [],
  });

  useEffect(() => {
    const newJobs = filterJobs(allJobs, filters)
      .sort((job1, job2) => (job1.createdOn > job2.createdOn ? -1 : 1))
      .slice(0, lastIndexLoaded);
    setJobs(newJobs);
  }, [filters, lastIndexLoaded]);

  const { observe } = useInView({
    onEnter: ({ unobserve }) => {
      unobserve();
      setLastIndexLoaded(lastIndexLoaded + LOADED_STEPS);
    },
  });

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) =>
    setFilters({ ...filters, search: event.target.value });

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
            {t.common.job_title_main || "Jobs"}
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
            {t.common.jobs_subtitle ||
              "You may be one click away from your dream job."}
          </Text>
        </MotionBox>
      </Flex>

      {/* Search Bar */}
      <Box w="full" maxW="1400px" px={4} mb={8}>
        <Flex
          w="full"
          justify={{ base: "center", md: "flex-end" }}
          align="center"
        >
          <Box w={{ base: "full", md: "320px" }}>
            <SearchBar
              value={filters.search}
              onChange={handleChangeKeyword}
              placeholder="Search jobs..."
            />
          </Box>
        </Flex>
      </Box>

      {/* Jobs Table */}
      <Box w="full" maxW="1400px" px={4}>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          w="full"
        >
          <JobTable projects={allProjects} jobs={jobs} observe={observe} />
        </MotionBox>
      </Box>
    </Flex>
  );
};

export default JobsPage;
