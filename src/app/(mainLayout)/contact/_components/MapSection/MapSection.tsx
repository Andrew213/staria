import { Contacts } from './components/Contacts/Contacts';
import { Map } from './components/Map/Map';
import { MapTitle } from './components/MapTitle/MapTitle';

export function MapSection() {
  return (
    <div className="flex flex-col items-center px-4 pb-16 xl:pb-24">
      <MapTitle />
      <Map />
      <Contacts />
    </div>
  );
}
