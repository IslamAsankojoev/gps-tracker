import { FC, ReactNode } from 'react';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

interface Props {
  children: ReactNode;
  sidebarContent?: ReactNode;
}

const Layout: FC<Props> = ({ children, sidebarContent }) => {
  return (
    <div className={`flex w-full`}>
      <Box className="h-screen flex flex-col p-10">
        <Sidebar>{sidebarContent}</Sidebar>
      </Box>
      <Box className="h-full">{children}</Box>
    </div>
  );
};

export default Layout;
