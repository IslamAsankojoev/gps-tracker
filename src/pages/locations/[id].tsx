import { ILocation, LocationService } from '@/api/location.service';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Map from '@/components/Map';
import { toast } from 'react-toastify';

const Location = () => {
  const router = useRouter();
  const [locationState, setLocationState] = useState({
    latitude: 74.610189,
    longitude: 42.856748,
  });

  const { data: location } = useQuery(
    ['location', router.query.id],
    () => LocationService.findOne(router.query.id as string),
    {
      enabled: !!router.query.id,
      refetchInterval: 3000,
      select: (data: ILocation) => data,
      onSuccess: (data) => {
        toast.success(`Пользователь ${data.user} сменил геолокацию`);
      },
    },
  );

  useEffect(() => {
    setLocationState({
      latitude: Number(location?.latitude),
      longitude: Number(location?.longitude),
    });
  }, [location]);

  return (
    <Layout
      sidebarContent={
        <div>
          <h1>Location</h1>
          <p>{locationState?.latitude}</p>
          <p>{locationState?.longitude}</p>
        </div>
      }
    >
      <Map lat={locationState.latitude} lng={locationState.longitude} zoom={16} marker />
    </Layout>
  );
};

export default Location;
