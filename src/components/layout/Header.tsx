import { Box, Flex } from "@chakra-ui/layout";
import { Button, Hide } from "@chakra-ui/react";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import { useTranslate } from "../../context/TranslateProvider";

import Drawer from "./Drawer";
import LanguageChooser from "./LanguageChooser";
import Link from "./Link";
import Logo from "./Logo";

const addProjectUrl =
  "https://github.com/419Labs/starknet-ecosystem.com/blob/main/docs/add-project.md";
const bridgeUrl = "https://starkgate.starknet.io/";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

function Header() {
  const { locale, t } = useTranslate();
  const { pathname } = useRouter();
  const router = useRouter();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { href: `/${locale}`, label: t.common.ecosystem || "Ecosystem", path: "/" },
    { href: `/${locale}/academy`, label: t.common.academy || "Academy", path: "/academy" },
    { href: `/${locale}/jobs`, label: t.common.job || "Jobs", path: "/jobs" },
    { href: `/${locale}/metrics`, label: t.common.metrics || "Metrics", path: "/metrics" },
  ];

  return (
    <Box
      w="full"
      position="relative"
      py={6}
      borderBottom="1px solid"
      borderColor="rgba(255,255,255,0.08)"
      bg="rgba(8, 5, 4, 0.95)"
      backdropFilter="blur(12px)"
      boxShadow="0 14px 40px rgba(5, 4, 3, 0.75)"
    >
      <Flex
        w="full"
        direction="row"
        justify="space-between"
        align="center"
        px={0}
        maxW="1400px"
        mx="auto"
      >
        <Logo
          icon={
            router && router.pathname.startsWith("/projects")
              ? faArrowLeft
              : undefined
          }
        />
        
        <Hide below="md">
          <Flex direction="row" align="center" gap={6}>
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;
              const isHovered = hoveredLink === link.path;
              
              return (
                <MotionBox
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onHoverStart={() => setHoveredLink(link.path)}
                  onHoverEnd={() => setHoveredLink(null)}
                  position="relative"
                >
                  <Link
                    href={link.href}
                    active={isActive}
                    fontWeight={isActive ? "600" : "500"}
                    fontSize="sm"
                    letterSpacing="0.01em"
                    position="relative"
                  >
                    {link.label}
                    {isActive && (
                      <MotionBox
                        layoutId="activeNavIndicator"
                        position="absolute"
                        bottom="-8px"
                        left={0}
                        right={0}
                        height="2px"
                        bgGradient="linear(to-r, accent.400, accent.600)"
                        borderRadius="full"
                        initial={false}
                      />
                    )}
                    {isHovered && !isActive && (
                      <MotionBox
                        position="absolute"
                        bottom="-8px"
                        left={0}
                        right={0}
                        height="1px"
                        bg="whiteAlpha.400"
                        borderRadius="full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </MotionBox>
              );
            })}
            
            <Box
              mx={2}
              h="20px"
              w="1px"
              bg="primary.700"
            />
            
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                isExternal
                href={addProjectUrl}
                fontWeight="500"
                fontSize="sm"
              >
                {t.common.apply || "Apply"}
              </Link>
            </MotionBox>
            
            <Box mx={2} h="20px" w="1px" bg="primary.700" />
            
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                isExternal
                href={bridgeUrl}
                fontWeight="500"
                fontSize="sm"
              >
                {t.common.bridge || "Bridge"}
              </Link>
            </MotionBox>
            
            <Box ml={4}>
              <LanguageChooser />
            </Box>
          </Flex>
        </Hide>
        
        <Hide above="md">
          <Flex justify="flex-end">
            <Button
              onClick={() => setDrawerOpen(true)}
              variant="ghost"
              _hover={{ bg: "primary.800" }}
              borderRadius="md"
            >
              <FontAwesomeIcon fontSize="20px" icon={faBars} />
            </Button>
            <Drawer
              headerAction={<LanguageChooser />}
              links={[
                {
                  href: `/${locale}`,
                  label: t.common.ecosystem || "Ecosystem",
                },
                {
                  href: `/${locale}/academy`,
                  label: t.common.academy || "Academy",
                },
                {
                  href: `/${locale}/jobs`,
                  label: t.common.job || "Jobs",
                },
                {
                  href: `/${locale}/metrics`,
                  label: t.common.metrics || "Metrics",
                },
                {
                  isExternal: true,
                  href: bridgeUrl,
                  label: t.common.bridge || "Bridge",
                },
                {
                  isExternal: true,
                  href: addProjectUrl,
                  label: t.common.apply || "Apply",
                },
              ]}
              isOpen={isDrawerOpen}
              onClose={() => setDrawerOpen(false)}
            />
          </Flex>
        </Hide>
      </Flex>
    </Box>
  );
}

export default Header;
