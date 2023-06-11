import { ILocation, LocationService } from '@/api/location.service';
import useTypedSession from '@/hooks/useTypedSession';
import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

interface IGeolocationProviderProps {
  children: React.ReactNode;
}
const GeolocationProvider: FC<IGeolocationProviderProps> = ({ children }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const { data: session, status } = useTypedSession();

  const { data: location } = useQuery('locations', LocationService.findAll, {
    select: (data: ILocation[]) => {
      return data.filter((item) => item.user === session?.user?.id)[0];
    },
  });

  const { mutateAsync } = useMutation(
    'update location',
    (data: ILocation) =>
      // @ts-ignore
      LocationService.update(location?.id, data.user, data.longitude, data.latitude),
    {
      onSuccess: () => {
        toast.info('Геолокация обновлена');
      },
    },
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          //@ts-ignore
          setLatitude(position?.coords?.latitude);
          //@ts-ignore
          setLongitude(position?.coords?.longitude);
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 2000,
        },
      );
    } else {
      console.error('Геолокация не поддерживается в этом браузере');
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude && location?.id) {
      (async () => {
        await mutateAsync({
          user: session?.user?.id,
          latitude,
          longitude,
        });
      })();
    }
  }, [location, mutateAsync, session, latitude, longitude]);

  return <div>{children}</div>;
};

export default GeolocationProvider;
