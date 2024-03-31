import React from 'react';
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';

const ProfileMenu = () => {
  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="tania andrew"
          className="cursor-pointer ml-auto mt-2 mr-10 mb-2"
          style={{ width: '45px', height: '45px' }}
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
      </MenuHandler>
      <MenuList>
        <MenuItem className="flex items-center gap-2">
          {/* SVG and Typography */}
        </MenuItem>
        {/* More Menu Items */}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
