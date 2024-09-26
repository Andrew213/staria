import { cookies } from 'next/headers';

import { Community } from '../_components/Community/Community';

async function getCookieData() {
  const cookieData = cookies().getAll();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000),
  );
}

export default async function Page() {
  await getCookieData();
  return <Community />;
}
