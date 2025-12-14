import { Flex, Link } from "@chakra-ui/layout";
import {
  faTelegram,
  faDiscord,
  faMedium,
  faGithub,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";

import type { Network } from "../../models/company";

interface Props {
  network: Network;
  justifyContent?: "flex-start" | "flex-end";
}

const NetworkLogos: FC<Props> = ({
  network: { website, telegram, twitter, medium, github, discord },
  justifyContent = "flex-start",
}) => {
  const hoverColor = "accent.400";
  return (
    <Flex
      justifyContent={justifyContent}
      align="center"
      wrap="wrap"
      columnGap={3}
      rowGap={2}
      fontSize="18px"
      color="whiteAlpha.700"
      onClick={(e) => e.stopPropagation()}
    >
      {website && (
        <Link
          isExternal
          href={website}
          _hover={{
            color: hoverColor,
          }}
        >
          <FontAwesomeIcon icon={faGlobe} />
        </Link>
      )}
      {twitter && (
        <Link
          isExternal
          href={twitter}
          _hover={{
            color: hoverColor,
          }}
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </Link>
      )}
      {telegram && (
        <Link
          isExternal
          href={telegram}
          _hover={{
            color: hoverColor,
          }}
        >
          <FontAwesomeIcon icon={faTelegram} />
        </Link>
      )}
      {discord && (
        <Link
          isExternal
          href={discord}
          _hover={{
            color: hoverColor,
          }}
        >
          <FontAwesomeIcon icon={faDiscord} />
        </Link>
      )}
      {medium && (
        <Link
          isExternal
          href={medium}
          _hover={{
            color: hoverColor,
          }}
        >
          <FontAwesomeIcon icon={faMedium} />
        </Link>
      )}
      {github && (
        <Link
          isExternal
          href={github}
          _hover={{
            color: hoverColor,
          }}
        >
          <FontAwesomeIcon icon={faGithub} />
        </Link>
      )}
    </Flex>
  );
};
export default NetworkLogos;
