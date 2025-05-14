export const supportedLanguages = [
  {
    code: 'en',
    label: 'English',
    default: true,
  },
  {
    code: 'ja',
    label: '日本語',
  },
  {
    code: 'vi',
    label: 'Tiếng Việt',
  },
];
export const i18n = {
  locales: supportedLanguages.map(({ code }) => code),

  defaultLocale:
    supportedLanguages.find(({ default: isDefault }) => isDefault)?.code ??
    'en',
} as const;
