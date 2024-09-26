import { Layout as CustomLayout } from './_components';

export const metadata = {
  robots: {
    index: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CustomLayout>{children}</CustomLayout>;
}
