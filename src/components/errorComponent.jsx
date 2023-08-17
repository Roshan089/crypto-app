import React from 'react'
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';

function ErrorComponent() {
  return (
    <Box
    bg="red.100"
    border="1px"
    borderColor="red.200"
    borderRadius="md"
    p={4}
    mb={4}
  >
    <Alert status="error">
      <AlertIcon as={FaExclamationTriangle} boxSize={4} />
      <AlertDescription>errror</AlertDescription>
    </Alert>
  </Box>
  )
}

export default ErrorComponent
