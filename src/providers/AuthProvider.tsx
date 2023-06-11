import { signOut, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import GeolocationProvider from './GeolocationProvider';
import { ToastContainer, toast } from 'react-toastify';

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false });

const AuthProvider: FC<any> = ({ children, Component: { is_auth, is_author, is_not_auth } }) => {
  const { pathname, asPath } = useRouter();

  const { data: session, status } = useSession();

  const isAuth = status === 'authenticated';

  useEffect(() => {
    if ('loading' === 'loading') return;
    (async () => {
      try {
        if (is_auth && !isAuth) signOut();
        // if (
        // 	(is_auth && !!isAuth) ||
        // 	(is_author && !!isAuth)
        // ) {

        // }
      } catch (e) {
        signOut();
      }
    })();
  }, [pathname, asPath]);

  return !is_auth && !is_author && !is_not_auth ? (
    <>{children}</>
  ) : (
    <>
      <DynamicCheckRole Component={{ is_auth, is_author, is_not_auth }}>
        {children}
      </DynamicCheckRole>
    </>
  );
};

export default AuthProvider;
