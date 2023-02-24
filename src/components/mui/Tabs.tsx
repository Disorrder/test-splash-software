import { styled, Tab as MuiTab, Tabs as MuiTabs } from "@mui/material";

// @ts-expect-error seems overflowY is not very valid
export const Tabs = styled(MuiTabs)(({ theme }) => ({
  // It's a bit challenging to work with shadow in overflow: hidden container. I guess it's a chromium bug
  overflowY: "visible !important",
  padding: "0 16px",
  position: "relative",

  "& .MuiTabs-scroller": {
    overflowY: "visible !important",
  },

  "& .MuiTabs-indicator": {
    height: "4px",
    borderRadius: "2px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 4px rgba(255, 255, 255, 0.9)",
  },

  "&:after": {
    content: '""',
    position: "absolute",
    bottom: "1.5px",
    left: "0",
    right: "0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },
}));

export const Tab = styled(MuiTab)(({ theme }) => ({
  flex: "1",
  paddingLeft: "6px",
  paddingRight: "6px",

  color: "rgba(255, 255, 255, 0.5)",
  fontFamily: "Saira",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "20px",
  letterSpacing: "0",
  textTransform: "capitalize",

  "&.Mui-selected": {
    color: "#FFFFFF",
    fontWeight: 900,
    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.25)",
    WebkitTextStroke: "0.5px rgba(0, 0, 0)",
  },
}));
