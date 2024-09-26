export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export type Tags = Tag[];

export interface Author {
  id: string;
  name: string;
  slug: string;
  url: string;
  profileImage: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
}

export interface PostShortInfo {
  excerpt: string;
  image: string;
  imageAlt: string;
  id: string;
  published: number | null;
  slug: string;
  title: string;
  tags: Tag[];
}

export type PostsShortInfo = PostShortInfo[];

export type PostShortInfoWithTags = PostShortInfo & {
  tags: Tag[];
};

export interface Post {
  excerpt: string;
  image: string;
  imageAlt: string;
  id: string;
  published: number | null;
  slug: string;
  title: string;
  readingTime: number;
  tags: Tag[];
  primaryTag: Tag | null;
  author: Author;
  html: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

export interface FaqQuestion {
  id: number;
  order: number | null;
  title: string;
  text: FaqTextChild[];
  category: string | null;
  slug: string | null;
}

export interface FaqDetail {
  id: number;
  title: string;
  subtitle: string;
  textDetailed: FaqTextChild[] | string;
  textPreview: FaqTextChild[] | string;
  questions: FaqQuestion[];
}

export interface TextChild {
  text: string;
  type: 'text';
}

interface QuoteChild {
  type: 'quote';
  children: FaqTextChild[];
}

interface ImageChild {
  type: 'image';
  url: string;
  alternativeText: string;
  width: number;
  height: number;
  children?: TextChild[];
}

interface ParagraphChild {
  type: 'paragraph';
  title: 'string';
  children: TextChild[];
}

export interface ListChild {
  format: 'unordered' | 'ordered';
  type: 'list';
  children: ListItemChild[];
}

interface ListItemChild {
  format: 'unordered';
  type: 'list-item';
  children: TextChild[];
}

export interface HeadingChild {
  type: 'heading';
  level: number;
  children: TextChild[];
}

export type FaqTextChild =
  | ImageChild
  | QuoteChild
  | TextChild
  | ParagraphChild
  | ListChild
  | ListItemChild
  | HeadingChild;

export interface Faq {
  id: number;
  faqSlug: string | null;
  title: string;
  textPreview: FaqTextChild[] | string;
  category: string | null;
}

export interface PopulateFaq {
  id: number;
  slug: string | null;
  title: string;
  textPreview: FaqTextChild[] | string;
  category: string | null;
}

export interface PopulateFaqWithOrder {
  id: number;
  slug: string | null;
  title: string;
  textPreview: FaqTextChild[] | string;
  category: string | null;
  order: number;
}

export interface HeroFaq {
  id: number;
  url: string | null;
  title: string;
  textPreview: FaqTextChild[] | string;
}

export type Faqs = Faq[];

export interface CustomError {
  message: string | string[];
  statusCode: number;
}

export type Plan = 'test' | 'genesis' | 'genesis-plus' | 'basic';

export interface OffersData {
  genesis: {
    total: number;
    remaining: number;
  };
  'genesis-plus': {
    total: number;
    remaining: number;
  };
}

export type BillingHistory = {
  id: string;
  sessionId: string;
  type: 'fiat' | 'crypto';
  amount: number;
  status: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  subscription: {
    id: string;
    plan: Plan;
    isActive: boolean;
    createdAt: Date;
  };
}[];

export type SignInErrors = 'Unauthorized' | 'Email address is not verified';

export interface Subscription {
  plan: 'basic' | 'genesis' | 'genesis-plus';
  isVerified: boolean;
  isActive: boolean;
  userId: string;
  createdAt: string;
  id: string;
  updatedAt: string;
}

export type Roles = 'user';

export interface User {
  email: string;
  password: string;
  subscriptions: Subscription[];
  verifyToken: string;
  avatarUrl: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  referralCode: string;
  referralCoupon: string | null;
  referralWallet: string | null;
  resetToken: string | null;
  updatedAt: number;
  id: string;
  refferals: number;
  roles: Roles[];
  premissions: ['all'];
  isVerified: boolean;
  legalType: string;
  createdAt: number;
  deletedAt: number | null;
}
export type Extension = 'SVG' | 'PNG' | 'JPG' | 'GIF' | 'CSV' | 'TXT' | 'DOC';
