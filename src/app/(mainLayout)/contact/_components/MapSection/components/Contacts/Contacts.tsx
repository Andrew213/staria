import { data } from './constants';
import { ContactItem } from '../ContactItem/ContactItem';

export function Contacts() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 xl:items-start xl:gap-8">
      {data.map((item, index) => (
        <ContactItem
          key={index}
          title={item.title}
          description={item.description}
          linkHref={item.linkHref}
          linkText={item.linkText}
        />
      ))}
    </div>
  );
}
