import { Box, SimpleGrid, VStack } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { ResourceItf } from "../../../data/academy";
import CardHighlight from "../card/CardHighlight";

import type { BasicContentProps } from "./BasicContent";
import BasicContent from "./BasicContent";

const MotionBox = motion(Box);

interface LearnContentProps extends BasicContentProps {
  highlightedResources: ResourceItf[];
}

function LearnContent({
  highlightedResources,
  resources,
  keyword = "",
  observe,
}: LearnContentProps) {
  return (
    <VStack w="full" align="flex-start" spacing={8}>
      {highlightedResources && highlightedResources.length > 0 && (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          w="full"
        >
          <Box mb={4}>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                background: "linear-gradient(to right, white, rgba(255, 255, 255, 0.8))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Featured Resources
            </motion.h2>
          </Box>
          <SimpleGrid
            columns={{ sm: 1, lg: 2, "2xl": 4 }}
            spacing={{ base: 4, md: 6 }}
            w="full"
            mb={8}
          >
            {highlightedResources.slice(0, 4).map((highlightedResource, index) => {
              const { name, description, link, network } = highlightedResource;
              const { github, twitter, website } = network;
              
              return (
                <MotionBox
                  key={`highlighted-learn-${highlightedResource.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Box h="full">
                    <CardHighlight
                      color="white"
                      bgHover="flat.100"
                      icon={<FontAwesomeIcon icon={faHome} fontSize="24px" />}
                      title={name}
                      content={description}
                      link={link || website || github || twitter}
                      linkCover
                      bg="flat.100"
                    />
                  </Box>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </MotionBox>
      )}
      
      <Box w="full">
        <Box mb={6}>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              background: "linear-gradient(to right, white, rgba(255, 255, 255, 0.8))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            All Resources
          </motion.h2>
        </Box>
        <BasicContent resources={resources} observe={observe} keyword={keyword} />
      </Box>
    </VStack>
  );
}

export default LearnContent;
