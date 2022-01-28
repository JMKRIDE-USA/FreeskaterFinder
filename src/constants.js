export const headerHeight = {xs: '55px', md: '70px'}
export const bodyHeight = {md: 'calc(100vh - ' + headerHeight.md + ')', xs: 'calc(100vh - ' + headerHeight.xs + ')'}

export const maxBlurbLength = 55;

export const socialLinkTypes = [
  {
    name: "facebook",
    label: "Facebook",
    validationRegex: /(http[s]?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9-]+.*/,
  },
  {
    name: "instagram",
    label: "Instagram",
    validationRegex: /(http[s]?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9-]+.*/,
  },
  {
    name: "reddit",
    label: "Reddit",
    validationRegex: /(http[s]?:\/\/)?(www\.)?reddit\.com\/user\/[a-zA-Z0-9-]+.*/
  },
  {
    name: "twitter",
    label: "Twitter",
    validationRegex: /(http[s]?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9-]+.*/,
  },
  {
    name: "tiktok",
    label: "TikTok",
    validationRegex: /(http[s]?:\/\/)?(www\.)?tiktok\.com\/[a-zA-Z0-9-]+.*/,
  },
]