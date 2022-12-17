import { Box } from "@mui/system";

const FlexBetween = ({ children, ...args }) => {
  return (
    <Box
      justifyContent={"space-between"}
      display="flex"
      alignItems={"center"}
      sx={args}
    >
      {children}
    </Box>
  );
};

export default FlexBetween;
