import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { LegacyRef } from "react";

import type { ResourceItf } from "../../../data/academy";
import { useTranslate } from "../../context/TranslateProvider";
import { filterResources } from "../../services/resource.service";
import CardResource from "../card/CardResource";
import CardResourceSkeleton from "../card/CardResourceSkeleton";
import DifficultyIcon from "../layout/DifficultyIcon";
import NetworkLogos from "../layout/NetworkLogos";

const MotionBox = motion(Box);

export interface BasicContentProps {
  resources: ResourceItf[];
  keyword?: string;
  observe: LegacyRef<HTMLDivElement>;
  isLoading?: boolean;
}

function BasicContent({
  resources,
  keyword = "",
  observe,
  isLoading,
}: BasicContentProps) {
  const { t } = useTranslate();
  const filteredResources = filterResources(resources, keyword);

  const renderData = () => {
    return filteredResources.map((resource: ResourceItf, index: number) => {
      const { network, difficulty, image } = resource;
      return (
        <Box
          ref={index === filteredResources.length - 1 ? observe : null}
          key={`resource-${resource.name}`}
          flex={1}
        >
          <CardResource
            index={index}
            resource={resource}
            cardContent={image ? <Image maxW="64px" src={image} /> : undefined}
            indication={
              difficulty ? (
                <DifficultyIcon difficultyLabel={difficulty} />
              ) : (
                <NetworkLogos network={network} />
              )
            }
          />
        </Box>
      );
    });
  };

  const renderLoadingState = () => {
    const skeletonIds = Array.from({ length: 12 }, (_, i) => `skeleton-${i}`);

    return skeletonIds.map((id) => (
      <Box key={id} flex={1}>
        <CardResourceSkeleton />
      </Box>
    ));
  };

  return isLoading || (filteredResources && filteredResources.length > 0) ? (
    <SimpleGrid
      columns={{ sm: 1, lg: 2, xl: 3 }}
      spacing={{ base: 6, md: 8 }}
      w="full"
    >
      {isLoading ? renderLoadingState() : renderData()}
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
        {t.common.no_resource}
      </Text>
      <Text fontSize="lg" color="whiteAlpha.600">
        Try a different search term
      </Text>
    </Flex>
  );
}

export default BasicContent;
