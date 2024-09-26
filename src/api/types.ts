import type { Pagination, Params, PostOrPage } from '@tryghost/content-api';
import type { NullableFlat } from 'ts-toolbelt/out/Object/Nullable';
import type { Address } from 'viem';

import type { Community } from '@/app/_shared/types';

export type { Tags } from '@tryghost/content-api';

export type PostRaw = PostOrPage;

type PostShortInfoRaw = Pick<
  PostOrPage,
  'id' | 'title' | 'slug' | 'excerpt' | 'published_at' | 'feature_image' | 'feature_image_alt' | 'tags'
>;

type PostShortInfoWithTagsRaw = PostShortInfoRaw & Pick<PostOrPage, 'tags'>;

export type PostsShortInfoWithTagsRaw = PostShortInfoWithTagsRaw[];

export interface PostsShortInfoWithMetaRaw {
  posts: PostShortInfoRaw[];
  meta: { pagination: Pagination };
}

export type PostsParams = Pick<Params, 'page' | 'limit'> & {
  tagSlug?: string;
  sort?: 'oldest' | 'recent' | 'a-z';
  include?: 'tags';
};

export interface SubscribeRequestOptions {
  email: string;
}

export interface SubscribeResponse {
  errors?: { message: string; id: string; context: string }[];
  members: { id: string; email: string }[];
}

export interface PostContactOptions {
  email: string;
  text: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  subject: string;
}

export interface PostContactResponseSuccessful {
  id: string;
  message: string;
}
// TODO: add error response type
export type PostContactResponse = PostContactResponseSuccessful | undefined;

export interface FaqQuestion {
  id: number;
  order: number | null;
  title: string;
  text: FaqTextChild[];
  category: string | null;
  slug: string | null;
}

export type CMSKnowledgeBasesData = {
  id: number;
  attributes: NullableFlat<{
    title: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    subtitle: string;
    text_detailed: FaqTextChild[] | string;
    text_preview: FaqTextChild[] | string;
    slug: string | null;
    questions: FaqQuestion[];
    order: number;
  }>;
}[];

interface TextChild {
  text: string;
  type: 'text';
}

interface ParagraphChild {
  type: 'paragraph';
  title: 'string';
  children: TextChild[];
}

interface ListChild {
  format: 'unordered' | 'ordered';
  type: 'list';
  children: ListItemChild[];
}

interface ListItemChild {
  format: 'unordered';
  type: 'list-item';
  children: TextChild[];
}

type FaqTextChild = TextChild | ParagraphChild | ListChild | ListItemChild;

export interface CMSByPageData {
  id: number;
  attributes: NullableFlat<{
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    FAQ: {
      id: number;
      title: string | null;
      text: FaqTextChild[] | null;
      category: string | null;
      slug: string | null;
    }[];
  }>;
}

export interface CMSFaqHeroData {
  id: number;
  attributes: NullableFlat<{
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    FAQ_hero: {
      id: number;
      title: string | null;
      text: FaqTextChild[] | null;
      url: string | null;
    }[];
  }>;
}

export type CMSResponse<T> =
  | {
      data: T;
      meta: {
        pagination: {
          page: number;
          pageSize: number;
          pageCount: number;
          total: number;
        };
      };
    }
  | {
      data: null;
      error: {
        status: number;
        name: string;
        message: string;
        details: unknown;
      };
    };

// TODO add response types and improve request types
export interface SignInRequestPayload {
  email: string;
  password: string;
}

export interface setNewPasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface Subscription {
  plan: 'basic' | 'genesis' | 'genesis-plus';
  isVerified: boolean;
  isActive: boolean;
  userId: string;
  createdAt: string;
  id: string;
  updatedAt: string;
}

type Roles = 'user' | 'manager';

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
  referralWallet: Address | null;
  resetToken: string | null;
  updatedAt: number;
  id: string;
  refferals: number;
  roles: Roles[];
  premissions: ['all'];
  isVerified: boolean;
  legalType: string;
  createdAt: number;
  deletedAt: string | null;
  sumInvested: number;
  communities: {
    id: string;
    createdAt: string;
    role: string;
    community: Community;
  }[];
  verification: {
    id: string;
    sessionId: string;
    stepper: {
      liveness: {
        status: string;
        reason: string | null;
        isCompleted: boolean;
      };
      documentId: {
        status: string;
        reason: string | null;
        isCompleted: boolean;
      };
      proofAddress: {
        status: string;
        reason: string | null;
        isCompleted: boolean;
      };
    };
    currentStep: string;
    currentLevel: 0 | 1 | 2 | 3;
    userId: string;
  };
}

enum userVerifcationStep {
  LIVENESS = 'LIVENESS',
  ID_DOCUMENT = 'ID_DOCUMENT',
  PROOF_OF_ADDRESS = 'PROOF_OF_ADDRESS',
}

enum userVerifcationStatus {
  APPROVED = 'APPROVED',
  SUBMISSION_REQUIRED = 'SUBMISSION_REQUIRED',
  RESUBMISSION_REQUIRED = 'RESUBMISSION_REQUIRED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  REJECTED = 'rejected',
}

export interface VerifyResponse {
  id: string;
  sessionId: string;
  isVerified: boolean;
  step: userVerifcationStep;
  status: userVerifcationStatus;
  metadata: null;
  updatedAt: string;
  createdAt: string;
}

type Permission = 'all';

export interface JWTDecode {
  sub: string;
  email: string;
  roles: Roles[];
  premission: Permission[];
  refreshToken: string;
  accessToken: null;
  verifyToken: string;
  iat: number;
  expiresIn: number;
}

export interface SignInResponse {
  tokenType: string;
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpRequestPayload {
  email: string;
  password: string;
  signupCode?: string;
}

export interface VerifyRequestPayload {
  verifyToken: string;
}

export interface RefreshResponse {
  tokenType: string;
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}

export interface ResetPasswordRequestPayload {
  token: string;
  password: string;
}

export interface OffersResponse {
  genesis: {
    total: number;
    remaining: number;
  };
  'genesis-plus': {
    total: number;
    remaining: number;
  };
}

export type BillingHistoryResponse = {
  id: string;
  sessionId: string;
  type: 'fiat' | 'crypto';
  amount: number;
  status: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  subscription: {
    id: string;
    plan: 'genesis' | 'genesis-plus';
    isActive: boolean;
    createdAt: string;
  };
}[];

export type NotificationMessageCode =
  | 'EMAIL_SEND'
  | 'AUTH_REGISTER'
  | 'AUTH_VERIFY'
  | 'AUTH_RESET_PASSWORD'
  | 'AUTH_CHANGE_PASSWORD'
  | 'AUTH_INCORRECT'
  | 'AUTH_DUPLICATE'
  | 'AUTH_SUCCESS'
  | 'AFFILIATE_SUCCESS'
  | 'CHECKOUT_CREATED'
  | 'CHECKOUT_INCOMPLETE'
  | 'CHECKOUT_COMPLETED'
  | 'CHECKOUT_CANCELLED'
  | 'SUBSCRIPTION_ACTIVATED'
  | 'SUBSCRIPTION_DEACTIVATED'
  | 'VERIFY_CREATED'
  | 'VERIFY_LIVENESS_APPROVED'
  | 'VERIFY_DOCUMENT_APPROVED'
  | 'VERIFY_ADDRESS_APPROVED'
  | 'VERIFY_LIVENESS_REJECTED'
  | 'VERIFY_DOCUMENT_REJECTED'
  | 'VERIFY_ADDRESS_REJECTED'
  | 'VERIFY_LIVENESS_RESUBMISSION'
  | 'VERIFY_DOCUMENT_RESUBMISSION'
  | 'VERIFY_ADDRESS_RESUBMISSION'
  | 'VERIFY_LIVENESS_PENDING'
  | 'VERIFY_DOCUMENT_PENDING'
  | 'VERIFY_ADDRESS_PENDING'
  | 'VERIFY_LIVENESS_SUBMISSION'
  | 'VERIFY_DOCUMENT_SUBMISSION'
  | 'VERIFY_ADDRESS_SUBMISSION';

export interface Notification {
  createdAt: string;
  entityId: null;
  id: string;
  isDelivered: boolean;
  isSeen: boolean;
  level: 'info';
  messageCode: NotificationMessageCode;
  type: 'user';
}
