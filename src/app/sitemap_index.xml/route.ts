import { routes } from '@/routes';

const generateSitemapLink = (url: string) => `<sitemap><loc>${url}/sitemap.xml</loc></sitemap>`;
export function GET() {
  const url = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${generateSitemapLink(`${url}`)}
    ${generateSitemapLink(`${url}${routes.blog.getRedirectPath()}`)}
    ${generateSitemapLink(`${url}${routes.resources.getRedirectPath()}`)}
    ${generateSitemapLink(`${url}${routes.invest.getRedirectPath()}`)}
    ${generateSitemapLink(`${url}${routes.faq.getRedirectPath()}`)}
     </sitemapindex>
    `;

  return new Response(sitemapIndexXML, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
