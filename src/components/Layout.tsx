import { FC, ReactNode } from 'react';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
  sidebarContent?: ReactNode;
}

const Layout: FC<Props> = ({ children, sidebarContent }) => {
  return (
    <div className="flex w-full flex-wrap">
      <div className="w-full md:w-1/3 flex flex-col p-10">
        <Sidebar>{sidebarContent}</Sidebar>
      </div>
      <div className="w-full md:w-2/3 h-full">{children}</div>
    </div>
  );
};

export default Layout;
