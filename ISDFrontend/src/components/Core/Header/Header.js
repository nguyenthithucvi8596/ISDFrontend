import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material";
import {
  Menu as MenuIcon,
  Person as AccountIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import classNames from "classnames";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

//images
// import profile from '../../images/main-profile.png';
// import config from '../../config';

// styles
import useStyles from "./styles";

// components
import { Typography, Avatar } from "../Wrappers/Wrappers";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../context/LayoutContext";
// import {
//   useManagementDispatch,
//   useManagementState,
// } from '../../context/ManagementContext';

// import { actions } from '../../context/ManagementContext';
import { useUserDispatch, signOut } from "../context/UserContext";

export default function Header(props) {
  let classes = useStyles();
  let theme = useTheme();

  // global
  let layoutState = useLayoutState();
  let layoutDispatch = useLayoutDispatch();
  let userDispatch = useUserDispatch();
  // const managementDispatch = useManagementDispatch();

  // local
  const [profileMenu, setProfileMenu] = useState(null);
  const [currentUser, setCurrentUser] = useState();
  const [isSmall, setSmall] = useState(false);

  // const managementValue = useManagementState();

  // useEffect(() => {
  //   actions.doFind(sessionStorage.getItem('user_id'))(managementDispatch);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (config.isBackend) {
  //     setCurrentUser(managementValue.currentUser);
  //   }
  // }, [managementValue]);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  function handleWindowWidthChange() {
    let windowWidth = window.innerWidth;
    let breakpointWidth = theme.breakpoints.values.md;
    let isSmallScreen = windowWidth < breakpointWidth;
    setSmall(isSmallScreen);
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse
          )}
        >
          {(!layoutState.isSidebarOpened && isSmall) ||
          (layoutState.isSidebarOpened && !isSmall) ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          )}
        </IconButton>
        {/* <Typography variant="h6" weight="medium" className={classes.logotype}>
          React Material Admin Full
        </Typography> */}
        <div className={classes.grow} />
        <div className={classes.menuUser}>
          <div className={classes.menuProfileUser}>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              className={classes.headerMenuButton}
              aria-controls="profile-menu"
            >
              <AccountCircleIcon />
              <span style={{ fontSize: "15px" }}>SysAdmin</span>
            </IconButton>
          </div>
          <div className={classes.nofitication}>
            <NotificationsIcon />
          </div>
          <div className={classes.menuProfile}>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              className={classes.headerMenuButton}
              aria-controls="profile-menu"
              onClick={(e) => setProfileMenu(e.currentTarget)}
            >
              <PersonIcon />
              <span style={{ fontSize: "15px" }}>(sysadmin)</span>
              <ArrowDropDownIcon
                alt={currentUser?.firstName}
                // eslint-disable-next-line no-mixed-operators
                // src={
                //   (currentUser?.avatar?.length >= 1 &&
                //   currentUser?.avatar[currentUser.avatar.length - 1].publicUrl) || profile
                // }
                classes={{ root: classes.headerIcon }}
              >
                {/* {currentUser?.firstName?.[0]} */}
              </ArrowDropDownIcon>
            </IconButton>
          </div>
        </div>

        {/* <Typography
          block
          style={{ display: "flex", alignItems: "center", marginLeft: 8 }}
        >
          <div className={classes.profileLabel}>&nbsp;</div>
          <Typography weight={"bold"} className={classes.profileLabel}>
            {currentUser?.firstName}
          </Typography>
        </Typography> */}
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          {/* <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {currentUser?.firstName}
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="primary"
              href="https://flatlogic.com"
            >
              Flatlogic.com
            </Typography>
          </div> */}
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <VpnKeyIcon className={classes.profileMenuIcon} />
            {/* <Link to="/app/user/edit" style={{ textDecoration: "none" }}>
              Profile
            </Link> */}
            Đổi mật khẩu
          </MenuItem>
          <div className={classes.profileMenuItem}>
            <MenuItem
              className={classes.profileMenuLink}
              color="primary"
              // onClick={() => signOut(userDispatch, props.history)}
            >
              <ExitToAppIcon className={classes.profileMenuIcon} />
              Đăng xuất
            </MenuItem>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
