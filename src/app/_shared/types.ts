import type { Address } from 'viem';

export interface PropsWithClassName {
  className?: string;
}

export type SocialType =
  | 'website'
  | 'linkedin'
  | 'facebook'
  | 'discord'
  | 'telegram'
  | 'instagram'
  | 'github'
  | 'medium'
  | 'tiktok'
  | 'x';

export type DealRound = 'public' | 'private' | 'seed';
export interface DealBadge {
  id: string;
  order: number;
  type: 'seen' | 'backed';
  name: string;
  iconUrl: string;
  url: string;
}
export type DealInvestmentPhaseName = 'guaranteed' | 'fcfs' | 'lottery';
export interface DealInvestmentPhase {
  id: string;
  type: DealInvestmentPhaseName;
  isActive: boolean;
  availableAmount: number;
  minAmount: number;
  maxAmount: number | null;
  startDate: string | null;
  endDate: string | null;
}
type DealNetwork = 'ETH' | 'BNB';
export interface DealMember {
  id: string;
  name: string;
  order: number;
  role: string;
  position: string;
  avatarUrl: string | null;
  socials?: {
    url: string;
    type: SocialType;
    title: string;
  }[];
}

export interface DealShortInfo {
  order: number;
  name: string;
  slug: string;
  type: DealRound;
  isFeatured: boolean;
  logoUrl: string;
  bannerUrl: string;
  categories: string[];
  excerpt: string;
  badges: DealBadge[];
  totalAllocation: number;
  currentPhase: DealInvestmentPhaseName;
  phases: DealInvestmentPhase[];
  network: DealNetwork;
}

export interface Deal {
  name: string;
  slug: string;
  type: DealRound;
  ticker: string;
  logoUrl: string;
  bannerUrl: string;
  videoUrl: string;
  gallery: string[];
  categories: string[];
  score: `${number}`;
  totalSupply: number | `${number}` | 'TBA';
  dilutedValuation: number | `${number}` | 'TBA';
  tokenPrice: number | `${number}` | 'TBA';
  platformRaise: number | `${number}` | 'TBA';
  marketCap: number | `${number}` | 'TBA';
  softCap: string;
  listingDate: string;
  unlockTerms: string;
  socials: {
    id: string;
    type: SocialType;
    url: string;
  }[];
  badges: DealBadge[];
  members: DealMember[];
  aboutText: string;
  mediaText: string;
  mainText: string;
  totalAllocation: number;
  currentPhase: DealInvestmentPhaseName;
  phases: DealInvestmentPhase[];
  network: DealNetwork;
  contractAddress: Address | '';
  fundingId: null;
}

export interface Community {
  id: string;
  order: number;
  name: string;
  slug: string;
  description: string;
  contactEmail: string;
  contactTelegram: string;
  nftContract: null;
  isActive: boolean;
  isFeatured: boolean;
  whitelistReferrals: boolean;
  logoUrl: string;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
  socials: {
    id: string;
    type: SocialType;
    url: string;
  }[];
}

export interface CommunityPost {
  name?: string;
  slug?: string;
  description?: string;
  contactEmail?: string;
  contactTelegram?: string;
  nftContract?: string;
  id?: string;
  whitelistReferrals?: boolean;
  socials: {
    type: SocialType;
    url: string;
  }[];
}
