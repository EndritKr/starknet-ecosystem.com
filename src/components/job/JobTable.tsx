import { Box, Flex, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import type { FC } from "react";

import type { Project } from "../../../data/ecosystem";
import { useTranslate } from "../../context/TranslateProvider";
import type { Job } from "../../models/job";
import { getJobKey } from "../../services/job.service";
import { findProjectById } from "../../services/project.service";

import JobListRaw from "./JobListRaw";

const MotionBox = motion(Box);

interface Props {
  projects: Project[];
  jobs: Job[];
  observe?: (element?: HTMLElement | null | undefined) => void;
}

const JobTable: FC<Props> = ({ projects, jobs, observe }) => {
  const { t } = useTranslate();

  return (
    <Flex w="full" direction="column" gap={4}>
      {jobs && jobs.length > 0 ? (
        jobs.map((job, key) => {
          const project = findProjectById(projects, job.projectId);
          return (
            project && (
              <JobListRaw
                key={`${job.title}-${job.projectId}`}
                id={getJobKey(job, project)}
                project={project}
                job={job}
                last={key === jobs.length - 1}
                observe={observe}
              />
            )
          );
        })
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
            {t.common.no_job}
          </Text>
          <Text fontSize="lg" color="whiteAlpha.600">
            Try a different search term
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default JobTable;
