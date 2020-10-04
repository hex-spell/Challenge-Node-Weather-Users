import React from "react";
import { Box, IconButton, Code } from "@chakra-ui/core";

interface IKeyProps {
  apiKey: string;
  onDeleteClick: () => void;
  onCopyClick: () => void;
}

const Key: React.FC<IKeyProps> = ({ apiKey, onDeleteClick, onCopyClick }) => {
  return (
    <Box display="flex" alignItems="center" padding="5px">
      <Code mr="5px">{apiKey} </Code>
      <IconButton
        onClick={() => onCopyClick()}
        aria-label="delete api key"
        icon="copy"
        variant="ghost"
        variantColor="teal"
      />
      <IconButton
        onClick={() => onDeleteClick()}
        aria-label="delete api key"
        icon="delete"
        variant="ghost"
        variantColor="red"
      />
    </Box>
  );
};

export default Key;
