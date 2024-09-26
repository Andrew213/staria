'use client';
import type { FormApi } from 'final-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { twJoin } from 'tailwind-merge';
import type { Address } from 'viem';

import CommunityApi from '@/api/CommunityApi';
import type { Community, CommunityPost, SocialType } from '@/app/_shared/types';
import { Button, Checkbox, FormInput, FormTextarea, QuestionMarkTooltip, UploadInput } from '@/lib/components';
import { routes } from '@/routes';
import { composeValidators, isEmail, isRequired } from '@/utils';

import { data, whitelisting } from './constants';
import type { FileData } from '../../manage/[communityName]/page';
import CreateADealModal from '../CreateADealModal/CreateADealModal';
import ResetModal from '../ResetModal/ResetModal';

interface FinalFormData {
  name: string;
  contactEmail: string;
  contactTelegram: string;
  slug: string;
  social_website: string;
  social_x: string;
  social_telegram: string;
  social_discord: string;
  social_linkedin: string;
  logoUrl: File | string;
  iconUrl: File | string;
  whitelistReferrals: boolean;
  whitelist_wallet: File;
  whitelist_email: File;
  nftContract: Address;
  checkbox_wallet: boolean;
  checkbox_nft: boolean;
  description: string;
}

interface Props {
  community?: Community;
  logo?: FileData;
  icon?: FileData;
}

export function Community({ community, logo, icon }: Props) {
  const [isResetModalShown, setIsResetModalShown] = useState(false);
  const [isSaveModalShown, setIsSaveModalShown] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [initialValues, setInitialValues] = useState<Partial<FinalFormData>>();
  const [mutatedSocials, setMutatedSocials] = useState(community?.socials);

  useEffect(() => {
    if (community?.socials) {
      setMutatedSocials(community.socials);
    }
  }, [community]);

  useEffect(() => {
    if (community) {
      const data: Record<string, unknown> = {
        name: community.name,
        description: community.description,
        slug: community.slug,
        checkbox_nft: community.nftContract,
        // nftContract: community.nftContract,
        contactEmail: community.contactEmail,
        contactTelegram: community.contactTelegram,
        whitelistReferrals: community.whitelistReferrals,
      };
      community.socials.forEach((el) => {
        data[`social_${el.type}`] = el.url;
      });
      setInitialValues(data);
    }
  }, [community]);

  useEffect(() => {
    if (searchParams.get('modal') && community) {
      setIsSaveModalShown(true);
      router.replace(routes.community.manage.communityName.getRedirectPath({ communityName: community.slug }));
    }
  }, [searchParams, community]);

  const handleSubmit = async (values: FinalFormData, form: FormApi<FinalFormData, Partial<FinalFormData>>) => {
    form.resumeValidation();

    try {
      const dataToSave: CommunityPost = {
        name: values.name,
        description: values.description,
        slug: values.slug,
        contactEmail: values.contactEmail,
        contactTelegram: values.contactTelegram,
        id: community ? community.id : undefined,
        socials: mutatedSocials?.length ? mutatedSocials : [],
        nftContract: values.nftContract,
        whitelistReferrals: values.whitelistReferrals,
      };

      Object.entries(values).forEach(([key, value]) => {
        if (key.startsWith('social_')) {
          const social = key.split('_')[1];
          if (mutatedSocials?.length) {
            const existsInCommunityIndex = dataToSave.socials.findIndex((el) => el.type === social);
            if (existsInCommunityIndex >= 0) {
              const currentSocial = { ...dataToSave.socials[existsInCommunityIndex] };
              dataToSave.socials[existsInCommunityIndex] = { ...currentSocial, url: value as string };
              return;
            }
          }
          dataToSave.socials.push({ type: social as SocialType, url: value as string });
        }
      });

      const response = await CommunityApi.createOrEditCommunity(
        dataToSave,
        community?.slug ? community.slug : undefined,
      );

      // #####################ICONS SAVING
      const fmData = new FormData();
      if (values.iconUrl) {
        fmData.append('iconUrl', values.iconUrl);
      }
      if (values.logoUrl) {
        fmData.append('logoUrl', values.logoUrl);
      }
      if (values.logoUrl || values.iconUrl) {
        await CommunityApi.changeImages(fmData, response?.slug ?? community?.slug);
      }

      // ####################WHITELISTING SAVING
      for (const [key] of Object.entries(values)) {
        if (key.startsWith('whitelist_')) {
          const whitelistType = key.split('_')[1];
          if (whitelistType === 'email' || whitelistType === 'wallet') {
            const whitelistForm = new FormData();
            whitelistForm.append('file', values.whitelist_email || values.whitelist_wallet);
            await CommunityApi.getOrEditWhitelist(whitelistType, whitelistForm, response?.slug ?? community?.slug);
          }
        }
      }
      if (response?.slug) {
        const comm = await CommunityApi.fetchCommunity(response.slug, true);
        setMutatedSocials(comm?.socials);
      }

      if (!community && path === routes.community.new.getRoutePath() && response?.slug) {
        router.push(
          `${routes.community.manage.communityName.getRedirectPath({ communityName: response.slug })}?modal=true`,
        );
      }
    } catch (err) {
      console.error(`err in community component when saving`, err);
    }
  };

  return (
    <div className="w-full text-white">
      <p className="mb-10 text-display-sm font-semibold">{data.title}</p>
      <Form<FinalFormData>
        onSubmit={handleSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, submitting, form, values }) => {
          const isDirty = form.getState().dirty;
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit();
              }}
            >
              <div className="mb-2 flex items-start justify-between max-lg:flex-col max-lg:gap-5">
                <div>
                  <p className="text-display-xs font-semibold">{data.subtitle.text}</p>
                  <span className="mt-1 font-rubik text-sm font-normal text-gray-blue-100">
                    {data.subtitle.subText}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setIsResetModalShown(true);
                    }}
                    disabled={!isDirty}
                    size="md"
                    color="secondary-gray"
                    content={data.subtitle.buttonCancel}
                    type="button"
                  />
                  <Button
                    size="md"
                    color="primary"
                    disabled={!isDirty}
                    type="submit"
                    loading={submitting}
                    content={data.subtitle.buttonSave}
                  />
                </div>
              </div>
              {data.fields.map(({ title, subtitle, inputs, tooltip, uploadInputs }, index) => {
                const even = (index + 1) % 2 === 0;
                const notLast = index !== data.fields.length - 1;
                return (
                  <div
                    key={index}
                    className={twJoin(
                      'flex gap-8 py-4 max-lg:flex-col max-lg:gap-4 max-lg:pb-5',
                      notLast && 'border-b border-gray-blue-800',
                      even && 'max-lg:gap-8',
                    )}
                  >
                    <div className="w-full max-w-70">
                      <div className="flex items-center gap-1">
                        <p className="text-lg font-semibold text-gray-blue-50">{title}</p>
                        {tooltip && (
                          <QuestionMarkTooltip
                            id={`slug-tooltip${title}`}
                            text={tooltip}
                            position="right-end"
                            color="secondary"
                            small
                          />
                        )}
                      </div>

                      <p className="font-rubik text-sm text-gray-blue-100">{subtitle}</p>
                    </div>
                    <div className="flex w-full max-w-[512px] flex-col justify-items-start gap-4">
                      {uploadInputs?.map(({ name, extensions, width, height, title }, i) => {
                        return (
                          <Field name={name} key={i}>
                            {({ input: { onChange }, meta: { dirty } }) => {
                              let file;
                              if (name === 'iconUrl' && icon) {
                                file = icon;
                              }

                              if (name === 'logoUrl' && logo) {
                                file = logo;
                              }
                              return (
                                <div className={i === 0 ? 'mb-4' : ''}>
                                  <div className="mb-2 text-sm text-gray-blue-50">{title}</div>
                                  <UploadInput
                                    fileFromOutside={file}
                                    extensions={extensions}
                                    maxWidth={width}
                                    maxHeight={height}
                                    isDirty={dirty}
                                    onChange={onChange}
                                  />
                                </div>
                              );
                            }}
                          </Field>
                        );
                      })}
                      {inputs?.map(({ placeholder, prefix, name, type, required, maxLength }, i) => {
                        const validators = [];
                        if (required) {
                          validators.push(isRequired(name));
                        }
                        if (type === 'email') {
                          validators.push(isEmail);
                        }

                        return (
                          <Field name={name} key={i} validate={composeValidators(...validators)}>
                            {({ input, meta }) => {
                              if (maxLength) {
                                return (
                                  <FormTextarea
                                    error={meta.touched && meta.error ? (meta.error as string) : undefined}
                                    maxLength={maxLength}
                                    isDirty={meta.dirty}
                                    textareaProps={{
                                      ...input,
                                      placeholder,
                                    }}
                                  />
                                );
                              }
                              return (
                                <FormInput
                                  error={meta.touched && meta.error ? (meta.error as string) : undefined}
                                  prefix={prefix}
                                  key={i}
                                  inputProps={{
                                    ...input,
                                    placeholder,
                                    autoComplete: type,
                                    disabled: name === 'slug' && !!community,
                                  }}
                                  type={type}
                                />
                              );
                            }}
                          </Field>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <div className="mt-7 border-t border-gray-blue-200 pt-8">
                <p className="text-display-xs font-semibold">{whitelisting.title}</p>
                <span className="mt-1 font-rubik text-sm font-normal text-gray-blue-100">{whitelisting.subtitle}</span>
              </div>
              <div className={twJoin('mt-6 flex gap-8 max-lg:flex-col max-lg:gap-4 max-lg:pb-5')}>
                <div className="w-full max-w-70">
                  <div className="flex items-center gap-1">
                    <p className="text-lg font-semibold text-gray-blue-50">{whitelisting.field.title}</p>
                  </div>
                  <p className="font-rubik text-sm text-gray-blue-100">{whitelisting.field.subtitle}</p>
                </div>
                <div className="flex w-full max-w-[512px] flex-col items-start justify-items-start gap-4">
                  {whitelisting.field.params.map(({ name, extensions, checkbox_name, title, subtitle, maxSize }, i) => {
                    if (extensions?.length) {
                      return (
                        <div key={i} className="w-full">
                          <div className="flex items-baseline gap-2" key={i}>
                            <Field name={checkbox_name} type="checkbox">
                              {({ input }) => {
                                return <Checkbox size="sm" inputProps={{ ...input }} />;
                              }}
                            </Field>
                            <div>
                              <p className="text-lg font-semibold text-gray-blue-50">{title}</p>
                              <p className="font-rubik text-sm text-gray-blue-100">{subtitle}</p>
                            </div>
                          </div>

                          {values[checkbox_name as keyof FinalFormData] && (
                            <div className="mt-4">
                              <Field
                                name={name}
                                // validate={
                                //   placeholder
                                //     ? (value) => {
                                //         return isAddress(value as Address) ? null : 'Invalid ERC20 Address.';
                                //       }
                                //     : undefined
                                // }
                              >
                                {({ input, meta }) => {
                                  return extensions ? (
                                    <UploadInput
                                      maxSizeInMB={maxSize}
                                      onChange={input.onChange}
                                      extensions={extensions}
                                    />
                                  ) : (
                                    <FormInput
                                      error={meta.touched && meta.error ? (meta.error as string) : undefined}
                                      // PrefixIcon={Icon}
                                      inputProps={{
                                        ...input,
                                        // placeholder,
                                      }}
                                    />
                                  );
                                }}
                              </Field>
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <div className="flex items-baseline gap-2" key={i}>
                        <Field name={name} type="checkbox">
                          {({ input }) => {
                            return <Checkbox size="sm" inputProps={{ ...input }} />;
                          }}
                        </Field>
                        <div>
                          <p className="text-lg font-semibold text-gray-blue-50">{title}</p>
                          <p className="font-rubik text-sm text-gray-blue-100">{subtitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3 max-lg:w-full max-lg:flex-col">
                <Button
                  onClick={() => {
                    setIsResetModalShown(true);
                  }}
                  disabled={!isDirty}
                  size="md"
                  color="secondary-gray"
                  content={data.subtitle.buttonCancel}
                  type="button"
                />
                <Button
                  size="md"
                  color="primary"
                  disabled={!isDirty}
                  type="submit"
                  loading={submitting}
                  content={data.subtitle.buttonSave}
                />
              </div>
              {isResetModalShown && (
                <ResetModal
                  onSave={() => {
                    void handleSubmit();
                  }}
                  communityName="test"
                  onClose={() => {
                    setIsResetModalShown(false);
                    form.restart();
                  }}
                />
              )}
              {isSaveModalShown && (
                <CreateADealModal
                  onClose={() => {
                    setIsSaveModalShown(false);
                  }}
                />
              )}
            </form>
          );
        }}
      />
    </div>
  );
}
