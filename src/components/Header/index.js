import React from "react";
import { AppBar, Toolbar, Typography, styled, InputBase } from "@mui/material";
import { useSnackbar } from "notistack";
import { alpha } from "@mui/system";
import { List, Queue } from "@mui/icons-material";

// 搜索框样式
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

/**
 * @param props DOM 标签属性
 * @returns 标题部件
 */
const Header = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  // 检查并转换字符串至数组
  const applyData = (str) => {
    if (!props.apply) {
      enqueueSnackbar("未定义 apply 方法.", {
        variant: "error",
      });

      return;
    }

    const array = str.split(",");

    if (array.length <= 2) {
      enqueueSnackbar("该数组元素过少.", {
        variant: "error",
      });

      return;
    }

    const nums =
      str.length === 0
        ? props.array
        : array.map((val) => {
            const num = Number(val);

            if (isNaN(num)) {
              throw console.error();
            }

            return num;
          });

    props.apply(nums);
  };

  // 回车后将字符串转换为数组
  const keyDown = (e) => {
    if (e.key !== "Enter") {
      return;
    }

    try {
      applyData(e.target.value);
    } catch {
      enqueueSnackbar("该字符串无法转换为数组.", {
        variant: "error",
      });
    }
  };

  return (
    <AppBar component='nav'>
      <Toolbar>
        <Queue sx={{ mr: 1 }} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          选择排序 | 算法演示
        </Typography>
        <Search>
          <SearchIconWrapper>
            <List />
          </SearchIconWrapper>
          <StyledInputBase
            id='filled-textarea'
            label='当前数组'
            variant='filled'
            placeholder={props.array.toString()}
            onKeyDown={(e) => keyDown(e)}
          ></StyledInputBase>
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
