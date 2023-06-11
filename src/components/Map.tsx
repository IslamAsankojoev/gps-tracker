import React, { FC, useState, useEffect, useCallback, useMemo, memo } from 'react';
//@ts-ignore
import GoogleMapReact from 'google-map-react';

const Map: FC<{
  lat?: number;
  lng?: number;
  zoom?: number;
  marker?: boolean;
}> = ({ lat, lng, zoom = 10, marker }) => {
  const [center, setCenter] = useState<{
    lat?: number;
    lng?: number;
  }>({
    lat,
    lng,
  });

  useEffect(() => {
    setCenter({ lat, lng });
  }, [lat, lng]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyCadH0BHZnnXHVRri8WoQYbtI65BTZyMnM',
          libraries: ['visualization'],
        }}
        center={{
          lat: center.lng,
          lng: center.lat,
        }}
        defaultZoom={zoom}
      >
        {marker && (
          <div
            //@ts-ignore
            lat={center.lng}
            //@ts-ignore
            lng={center.lat}
            style={{
              transition: 'all 0.3s ease-in-out!important',
              width: '10px',
              height: '10px',
              backgroundColor: 'red',
              borderRadius: '50%',
            }}
          ></div>
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
