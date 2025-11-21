import { Flex } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";

function CardProjectSkeleton() {
  return (
    <Flex
      direction="column"
      borderRadius="3xl"
      overflow="hidden"
      p={6}
      bg="rgba(20, 20, 28, 0.75)"
      border="1px solid"
      borderColor="whiteAlpha.100"
      boxShadow="0 18px 40px rgba(8, 8, 16, 0.45)"
      gap={4}
    >
      <Skeleton w="full" h="140px" borderRadius="2xl" />
      <SkeletonCircle mt={-10} mx="auto" w="72px" h="72px" />
      <Skeleton w="60%" h="18px" borderRadius="full" mx="auto" />
      <Skeleton w="full" h="36px" borderRadius="xl" />
      <Skeleton w="40%" h="14px" borderRadius="full" />
    </Flex>
  );
}

export default CardProjectSkeleton;
