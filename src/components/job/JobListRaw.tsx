import {
  Box,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Show, Button, Collapse, Image, Avatar } from "@chakra-ui/react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useState } from "react";

import type { Project } from "../../../data/ecosystem";
import { useTranslate } from "../../context/TranslateProvider";
import type { Job } from "../../models/job";
import NetworkLogos from "../layout/NetworkLogos";
import StyledTag from "../layout/StyledTag";

import JobCreatedFrom from "./JobCreatedFrom";
import JobDetailSections from "./JobDetailSections";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface Props {
  id: string;
  project: Project | undefined;
  job: Job;
  last: boolean;
  observe?: (element?: HTMLElement | null | undefined) => void;
}

const JobListRaw: FC<Props> = ({ id, project, job, last, observe }) => {
  const { locale } = useTranslate();
  const { t } = useTranslate();
  const [opened, setOpened] = useState(false);
  const { query } = useRouter();

  useEffect(() => {
    const { key } = query;
    if (key && typeof key === "string") {
      setOpened(id === encodeURI(key));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (!project || !job) return null;

  const renderJobDetails = () => {
    return job && project ? (
      <Flex direction="column">
        {/* Networks */}
        <Box mt={4}>
          <NetworkLogos network={project.network} />
        </Box>
        <JobDetailSections currentJob={job} />
        <HStack
          spacing={1}
          my={4}
          pb={4}
          fontSize="sm"
          fontWeight="light"
          color="whiteAlpha.600"
        >
          <Text>{t.jobs.published || "Published"}</Text>
          <b>
            <JobCreatedFrom createdAt={dayjs(job.createdOn)} />
          </b>
          <Text>{t.jobs.ago || "Ago"}</Text>
        </HStack>
      </Flex>
    ) : (
      <span>{t.jobs.no_selected || "No job selected"}</span>
    );
  };

  const renderApplyBtn = (label: string) => {
    return (
      <Link
        w="full"
        isExternal
        href={job.applyLink}
        _hover={{ textDecoration: "none" }}
        onClick={(event) => event.stopPropagation()}
      >
        <Button
          w="full"
          variant="outline"
          bg="accent.500"
          color="white"
          borderColor="accent.500"
          _hover={{
            bg: "accent.600",
            borderColor: "accent.600",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)",
          }}
          transition="all 0.3s"
        >
          {label || "Apply"}
        </Button>
      </Link>
    );
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      mb={4}
    >
      <MotionFlex
        onClick={() => {
          setOpened(!opened);
          window.history.pushState({}, "", `/${locale}/jobs/?key=${id}#${id}`);
        }}
        id={id}
        direction="column"
        w="full"
        minH="100px"
        cursor="pointer"
        sx={{ transition: "all 0.3s ease" }}
        bg="primary.800"
        borderRadius="xl"
        border="1px solid"
        borderColor={opened ? "accent.500" : "primary.700"}
        py={5}
        px={5}
        _hover={{
          borderColor: "accent.500",
          boxShadow: "0 8px 24px rgba(14, 165, 233, 0.1)",
          transform: "translateY(-2px)",
        }}
        ref={observe && last ? observe : null}
        whileHover={{ y: -2 }}
      >
        <Flex
          w="full"
          h="full"
          direction="row"
          justify="space-between"
          align="center"
          gap={4}
        >
          {/* Logo */}
          <Flex justify="center" align="center" h="full" w="80px" flexShrink={0}>
            {project.image ? (
              <Image
                w="full"
                maxW="80px"
                h="80px"
                objectFit="contain"
                src={`/logos/${project.image}`}
                alt={`${project.name} logo`}
                borderRadius="lg"
                bg="primary.900"
                p={2}
              />
            ) : (
              <Avatar
                size="lg"
                bg="flat.600"
                name={project.name.slice(0, 2)}
              />
            )}
          </Flex>

          {/* Job Info */}
          <VStack
            flex={1}
            direction="column"
            justify="flex-start"
            align="flex-start"
            spacing={2}
            minW={0}
          >
            <Text
              fontSize="lg"
              fontWeight="bold"
              whiteSpace="normal"
              overflow="hidden"
              textOverflow="ellipsis"
              display="-webkit-box"
              sx={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }}
              color="whiteAlpha.900"
            >
              {job.title}
            </Text>
            <Text fontSize="sm" color="accent.400" fontWeight="medium">
              {project.name}
            </Text>
            <HStack
              fontSize="xs"
              spacing={3}
              color="whiteAlpha.600"
              flexWrap="wrap"
            >
              {job.compensation && (
                <Text>
                  {job.compensation?.currency || "$"}
                  {job.compensation?.from}k - {job.compensation?.currency || "$"}
                  {job.compensation?.to}k
                </Text>
              )}
              {job.location && (
                <Text>📍 {job.location}</Text>
              )}
            </HStack>
          </VStack>

          {/* Tags */}
          <Show above="lg">
            <Stack
              flex={2}
              direction="row"
              spacing={2}
              wrap="wrap"
              shouldWrapChildren
              justify="flex-end"
              maxW="300px"
            >
              {job.remote && (
                <Box>
                  <StyledTag key="remote" selected value="Remote" size="sm" />
                </Box>
              )}
              {job.tags.slice(0, 3).map((tag) => (
                <Box key={tag}>
                  <StyledTag key={tag} value={tag} size="sm" />
                </Box>
              ))}
            </Stack>
          </Show>

          {/* Apply Button (Desktop) */}
          <Show above="md">
            <Box
              flexShrink={0}
              w="120px"
              opacity={opened ? 1 : 0}
              className="apply-btn"
              transition="all 0.3s linear"
            >
              {renderApplyBtn(t.jobs.apply)}
            </Box>
          </Show>
        </Flex>

        {/* Expanded Details */}
        <Collapse in={opened} animateOpacity>
          <MotionFlex
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: opened ? 1 : 0, height: opened ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            direction="column"
            align="flex-start"
            h="full"
            px={{ base: 0, xl: "80px" }}
            mt={6}
            pt={6}
            borderTop="1px solid"
            borderColor="primary.700"
          >
            {renderJobDetails()}
            <Flex
              border="1px solid"
              borderColor="primary.700"
              bg="primary.900"
              direction="column"
              w="full"
              p={6}
              borderRadius="xl"
              mt={6}
            >
              {renderApplyBtn(t.jobs.apply_long)}
              <HStack align="flex-start" mt={4} spacing={3}>
                <Text fontSize="lg">👉</Text>
                <Text fontSize="sm" color="whiteAlpha.600" lineHeight="1.6">
                  Please reference you found the job on starknet-ecosystem.com,
                  this helps us get more companies to post here, thanks!
                </Text>
              </HStack>
            </Flex>
            {renderApplyBtn(t.jobs.apply_long)}
            <HStack align="flex-start" mt={4} spacing={3}>
              <Text fontSize="lg">👉</Text>
              <Text fontSize="sm" color="whiteAlpha.600" lineHeight="1.6">
                Please reference you found the job on starknet-ecosystem.com,
                this helps us get more companies to post here, thanks!
              </Text>
            </HStack>
          </Box>
      </MotionFlex>
    </Collapse>
      </MotionFlex >
    </MotionBox >
  );
};

export default JobListRaw;
