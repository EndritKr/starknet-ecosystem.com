import { Box, Flex, Text } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";

import type { Tag } from "../../../data/tag";
import { useTranslate } from "../../context/TranslateProvider";
import menuIcons from "./icons";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface CategoryFilterProps {
  tags: Tag[];
  selectedTag: Tag;
  onSelect: (tag: Tag) => void;
  projectCount?: number;
}

function CategoryFilter({
  tags,
  selectedTag,
  onSelect,
  projectCount,
}: CategoryFilterProps) {
  const { t } = useTranslate();
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  return (
    <Flex
      direction="row"
      wrap="wrap"
      gap={3}
      justify="flex-start"
      align="center"
      w="full"
      py={4}
    >
      {tags.map((tag, index) => {
        const isSelected = selectedTag.value === tag.value;
        const isHovered = hoveredTag === tag.value;

        return (
          <MotionBox
            key={tag.value}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flex
              onClick={() => onSelect(tag)}
              onMouseEnter={() => setHoveredTag(tag.value)}
              onMouseLeave={() => setHoveredTag(null)}
              align="center"
              px={5}
              py={3}
              borderRadius="full"
              cursor="pointer"
              position="relative"
              overflow="hidden"
              bg={isSelected ? "accent.500" : "primary.800"}
              border="2px solid"
              borderColor={
                isSelected
                  ? "accent.400"
                  : isHovered
                    ? "accent.500"
                    : "primary.700"
              }
              color={isSelected ? "white" : "whiteAlpha.700"}
              fontWeight={isSelected ? "bold" : "medium"}
              fontSize="sm"
              transition="all 0.2s"
              _hover={{
                color: "white",
                borderColor: "accent.400",
              }}
            >
              {/* Animated background on hover */}
              {isHovered && !isSelected && (
                <MotionBox
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="accent.500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* Icon */}
              <Box mr={2}>
                <motion.div
                  animate={{
                    rotate: isSelected ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <FontAwesomeIcon
                    fontSize="16px"
                    icon={
                      menuIcons[tag.icon as keyof typeof menuIcons] ||
                      menuIcons.home
                    }
                  />
                </motion.div>
              </Box>

              {/* Label */}
              <Text>{t.tags[tag.value] || tag.label}</Text>

              {/* Count badge */}
              {isSelected && projectCount !== undefined && projectCount >= 0 && (
                <MotionBox
                  ml={2}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    minW="24px"
                    h="24px"
                    px={2}
                    borderRadius="full"
                    bg="whiteAlpha.200"
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    {projectCount > 100 ? "100+" : projectCount}
                  </Flex>
                </MotionBox>
              )}
            </Flex>
          </MotionBox>
        );
      })}
    </Flex>
  );
}

export default CategoryFilter;

