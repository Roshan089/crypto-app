import React from 'react'
import { Box, Spinner } from '@chakra-ui/react';

function Loader() {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Spinner size="xl" color="blue.500" />
  </Box>
  )
}

export default Loader
