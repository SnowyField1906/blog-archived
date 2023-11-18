const siteMetadata = {
  title: 'Blog | SnowyField',
  author: 'SnowyField',
  headerTitle: 'Blog | SnowyField',
  description: {
    0: 'My personal blog where I share my knowledge, experiences, thoughts and everything.',
    posts: 'I post about my knowledge and experiences here, I hope you find something useful.',
    stats:
      'I use this dashboard to track various metrics across platforms like Spotify, GitHub, and more.',
    projects: 'A list of projects I have been working on or built.',
    notes:
      'I save my important notes and reusable code snippets here, they might be not much useful for you.',
    about: 'I put technical details about me and this blog here.',
    checkin:
      "An artifact of the 90's webs. Leave a comment below for my future visitors. Feel free to write anything!",
    contact: 'All my contacts',
    journey: 'Trying not to compare myself to others. Taking baby steps everyday.',
    now: 'Where am I and what am I doing?',
    privacyPolicy: 'Privacy Policy for my website',
    recommended: 'A list of recommended movies, books and more',
  },
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://snowyfield.software',
  siteRepo: 'https://github.com/SnowyField1906/blog',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/banner.png',
  email: 'snowyfield1906@gmail.com',
  github: 'https://github.com/SnowyField1906',
  twitter: 'https://twitter.com/SnowyField1906',
  linkedin: 'https://www.linkedin.com/in/NHThuan/',
  website: 'https://snowyfield.software/',
  locale: 'en-US',
  facebookAppId: '666473352092910',
  analytics: {
    umamiWebsiteId: '8cdb28da-322d-4adf-b081-27e579f84252',
    googleAnalyticsId: 'G-KYY35T59NC',
  },
  newsletter: {
    provider: 'emailoctopus',
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      inputPosition: 'bottom',
      lang: 'en',
      darkTheme: 'dark',
      themeURL: '',
    },
  },
  socialAccount: {
    twitter: 'snowyfield1906',
  },
}

module.exports = siteMetadata
