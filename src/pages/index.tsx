import { CONFIG } from '@/api/config';
import { ILocation, LocationService } from '@/api/location.service';
import Layout from '@/components/Layout';
import Map from '@/components/Map';
import useTypedSession from '@/hooks/useTypedSession';
import { NextPageAuth } from '@/types/auth.types';
import { Button } from '@mui/material';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const Home: NextPageAuth = () => {
  const router = useRouter();
  const { data: session } = useTypedSession();
  const [marker, setMarker] = useState({
    lat: 74.610189,
    lng: 42.856748,
  });

  const { data } = useQuery(
    'gps coords',
    () => axios.get('http://api.open-notify.org/iss-now.json'),
    {
      select: (res) => {
        return res.data.iss_position;
      },
    },
  );

  const { data: locations } = useQuery('locations', () => LocationService.findAll());

  useEffect(() => {
    let locationCurrent = locations?.find((item: ILocation) => item.user === session.user.id);
    if (locations) {
      setMarker({
        lat: Number(locationCurrent.latitude),
        lng: Number(locationCurrent.longitude),
      });
    }
  }, [locations, session.user.id]);

  return (
    <Layout
      sidebarContent={
        <>
          <h2>Геолокации</h2>
          <br />
          {!!locations?.length &&
            locations.map((item: ILocation) => (
              <div key={item.id}>
                <p>Пользователь: {item.user}</p>
                <p>Широта: {item.latitude}</p>
                <p>Долгота: {item.longitude}</p>
                <Button
                  size="small"
                  onClick={() => {
                    router.push(`/locations/${item.id}`);
                  }}
                >
                  Следить
                </Button>
                <br />
                <br />
              </div>
            ))}

          <br />
          <Button
            color="error"
            onClick={async () => {
              await signOut({
                callbackUrl: CONFIG.BASE_URL,
              });
            }}
          >
            Выйти
          </Button>
        </>
      }
    >
      <Map lat={marker.lat} lng={marker.lng} zoom={16} marker />
    </Layout>
  );
};

export default Home;

Home.is_auth = true;
