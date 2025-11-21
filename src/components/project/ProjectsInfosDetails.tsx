import { Box, Flex, Text } from "@chakra-ui/layout";
import type { FC } from "react";

interface Props {
  title: string;
  value: any;
}

const ProjectsInfosDetails: FC<Props> = ({ title, value }) => {
  return (
    <Flex direction="column" mb={title ? 6 : 0}>
      {title && (
        <Text
          mb={3}
          fontSize="sm"
          fontWeight="600"
          color="whiteAlpha.700"
          letterSpacing="0.05em"
        >
          {title}
        </Text>
      )}
      <Box>{value}</Box>
    </Flex>
  );
};

export default ProjectsInfosDetails;
