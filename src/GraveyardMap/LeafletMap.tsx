import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet"
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

function MapPlaceholder() {
    return (
        <p>
            Temető térképe.
            <noscript> Be kell kapcsolnia a Javascript-et, hogy megnézze ezt a térképet</noscript>
        </p>
    )
}

export default function LeafletMap() {
    const _created = (e: any) => console.log(e.layerType);

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
                <EditControl
                    position="topright"
                    draw={{
                        rectangle: false,
                        polyline: false,
                        polygon: true,
                        circle: false,
                        marker: false,
                        circlemarker: false
                    }}
                    onCreated={_created}
                />
            </FeatureGroup>
            <TileLayer
                minNativeZoom={0}
                maxNativeZoom={3}
                noWrap
                attribution=''
                url='/temeto/{z}/{x}/{y}.png'
            />
        </MapContainer>
    );
}