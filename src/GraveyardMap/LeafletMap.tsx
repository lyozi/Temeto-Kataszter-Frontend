// LeafletMap.tsx
import React, { useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { DrawEvents, LatLngLiteral } from "leaflet";
import { GraveUIPolygon, User } from '../types';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

function MapPlaceholder() {
  return (
    <p>
      Temető térképe.
      <noscript> Be kell kapcsolnia a Javascript-et, hogy megnézze ezt a térképet</noscript>
    </p>
  );
}

interface Layer {
  id: number;
  latLngs: LatLngLiteral[];
}

interface MapProps {
  user: User
}

/**useEffect(() => {
    if (fetchPolygonsQuery.isSuccess) {
      setLayers(fetchPolygonsQuery.data.map(polygon => ({
        id: polygon.id,
        latlngs: polygon.points.map(point => ({ lat: point.latitude, lng: point.longitude }))
      })));
    }
  }, [fetchPolygonsQuery.isSuccess, fetchPolygonsQuery.data]); */

const LeafletMap: React.FC<MapProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [layers, setLayers] = useState<Layer[]>([]);

  const postPolygon = async (newPolygon: Layer) => {
    const response = await axios.post('https://localhost:7191/api/GraveUIPolygons', newPolygon);
    return response.data;
  };

  const mutation = useMutation((newPolygon: Layer) => postPolygon(newPolygon), {
    onSuccess: (data: any) => {
      toast({
        title: data.id + '-es számú Poligon hozzáadva',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      const newLayer: Layer = { id: data.id, latLngs: data.latLngs }
      setLayers((prevLayers) => [...prevLayers, newLayer]);
    },
    onError: () => {
      toast({
        title: 'Hiba történt a poligon hozzáadása során',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const _onCreate = (e: DrawEvents.Created) => {
    const layer: any = e.layer;

    e.layer.remove()

    const newLayer: Layer = {
      id: 0,
      latLngs: layer.getLatLngs()[0]
    };

    mutation.mutate(newLayer);
  };

  return (
    <MapContainer
      center={[0, 0]}
      zoom={3}
      scrollWheelZoom={true}
      placeholder={<MapPlaceholder />}
      maxZoom={10}
      minZoom={3}
      boundsOptions={{ padding: [0, 0] }}
      maxBounds={[[-50, -80], [49, 80]]}
      maxBoundsViscosity={100}
    >
      <FeatureGroup>
        {layers.map(layer => (
          <Polygon key={layer.id} positions={layer.latLngs} />
        ))}

        {user && user.role === "Admin" && (
          <EditControl
            position="topright"
            draw={{
              rectangle: false,
              polyline: false,
              polygon: true,
              circle: false,
              marker: false,
              circlemarker: false,
            }}
            onCreated={_onCreate}
          />
        )}

      </FeatureGroup>
      <TileLayer
        minNativeZoom={0}
        maxNativeZoom={3}
        noWrap
        attribution=""
        url="/temeto/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default LeafletMap;
