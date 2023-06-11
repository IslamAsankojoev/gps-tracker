import { AuthService, ILogin } from '@/api/auth.service';
import Layout from '@/components/Layout';
import { LoadingButton } from '@mui/lab';
import { Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Map from '@/components/Map';
import { signIn } from 'next-auth/react';
import { NextPageAuth } from '@/types/auth.types';

const login: NextPageAuth = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate, isLoading } = useMutation(
    'login',
    (data: ILogin) => AuthService.login(data.email, data.password),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data: any) => {
    await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });
  };

  return (
    <Layout
      sidebarContent={
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              width: '340px',
            }}
          >
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Логин" variant="filled" fullWidth />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Пароль" variant="filled" fullWidth />
              )}
            />

            <LoadingButton
              sx={{
                backgroundColor: '#4675CE!important',
              }}
              variant="contained"
              type="submit"
              fullWidth
              loading={isLoading}
            >
              Войти
            </LoadingButton>
          </form>
          <br />
          <Link
            href="/register"
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography color="secondary.main">Регистрация</Typography>
          </Link>
        </>
      }
    >
      <Map lat={42.86742} lng={74.596818} />
    </Layout>
  );
};

export default login;

login.is_not_auth = true;
