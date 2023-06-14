import Layout from '@/components/Layout';
import { Box, Button, Switch, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Link from 'next/link';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { NextPageAuth } from '@/types/auth.types';
import { useRouter } from 'next/router';
import { AuthService } from '@/api/auth.service';
import Map from '@/components/Map';
import { LocationService } from '@/api/location.service';

const Register: NextPageAuth = () => {
  useAuthRedirect();
  const { handleSubmit, control } = useForm({
    mode: 'onChange',
  });
  const { push } = useRouter();

  const { mutate, isLoading } = useMutation(
    'register',
    ({
      username,
      email,
      password,
      is_author,
    }: {
      username: string;
      email: string;
      password: string;
      is_author: boolean;
    }) => AuthService.register(username, email, password, is_author),
  );

  const { mutate: createLocation } = useMutation(
    'createLocation',
    (data: any) => LocationService.create(data?.latitude, data?.longitude, data?.user),
    {
      onSuccess: () => {
        push('/login');
      },
    },
  );

  const onSubmit = async (data: any) => {
    mutate(
      { ...data, is_author: data?.is_author },
      {
        onSuccess: (data) => {
          createLocation({
            latitude: '0',
            longitude: '0',
            user: data?.id,
          });
        },
      },
    );
  };

  return (
    <Layout
      sidebarContent={
        <Box>
          <Typography variant="h5">Зарегистрироваться</Typography>
          <br />
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              width: '340px',
              maxWidth: '90%',
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
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="email" variant="filled" fullWidth />
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

            <Button variant="contained" type="submit" fullWidth>
              Регистрация
            </Button>
          </form>
          <br />
          <Link
            href="/login"
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography color="secondary.main">Войти</Typography>
          </Link>
        </Box>
      }
    >
      <Map lat={42.86742} lng={74.596818} />
    </Layout>
  );
};

export default Register;

Register.is_not_auth = true;
