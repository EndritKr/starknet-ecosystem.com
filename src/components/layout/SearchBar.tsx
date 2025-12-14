import { Box, Flex, Text } from "@chakra-ui/layout";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { motion } from "framer-motion";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);

interface SearchBarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  debounce?: number;
}

function SearchBar({
  value,
  onChange,
  placeholder = "Search projects, wallets, tools...",
  debounce = 200,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = _.debounce((event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  }, debounce);

  const handleLocalChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
    handleChange(event);
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      w={{ base: "full", md: "300px" }}
    >
      <InputGroup
        size="md"
        position="relative"
      >
        <InputLeftElement
          pointerEvents="none"
          height="100%"
          pl={3}
        >
          <FontAwesomeIcon
            icon={faSearch}
            color="rgba(255, 255, 255, 0.5)"
            fontSize="14px"
          />
        </InputLeftElement>
        <Input
          value={localValue}
          onChange={handleLocalChange}
          placeholder={placeholder}
          bg="primary.800"
          border="1px solid"
          borderColor="primary.700"
          borderRadius="lg"
          fontSize="sm"
          pl={10}
          py={4}
          color="white"
          _placeholder={{
            color: "whiteAlpha.500",
          }}
          _hover={{
            borderColor: "primary.600",
          }}
          _focus={{
            borderColor: "accent.500",
            boxShadow: "0 0 0 2px rgba(14, 165, 233, 0.1)",
          }}
          transition="all 0.3s"
        />
      </InputGroup>
    </MotionBox>
  );
}

export default SearchBar;

