import React from "react";
import { Link, Box } from "@chakra-ui/react";

const ForgotPasswordLink: React.FC = () => {
  return (
    <Box
      mb="5%">
      <Link color="cyan.800" href="/forgot-password" fontSize="lg">Elfelejtette a jelszavát?</Link>
    </Box>
  );
};

export default ForgotPasswordLink;
