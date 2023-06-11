import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Sidebar: FC<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          router.reload();
        }}
      >
        Обновить
      </Button>
      <Box>{children}</Box>
    </div>
  );
};

export default Sidebar;
