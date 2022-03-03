import React from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';

import TikTokSVG from './assets/tiktok_icon.svg';

export const headerHeight = {xs: '55px', md: '70px'}
const windowHeight = window.innerHeight;
export const bodyHeight = {md: 'calc(' + windowHeight + 'px - ' + headerHeight.md + ')', xs: 'calc(' + windowHeight + 'px - ' + headerHeight.xs + ')'}

export const maxBlurbLength = 55;

export const socialLinkTypes = [
  {
    name: "facebook",
    label: "Facebook",
    icon: FacebookIcon,
    validationRegex: /(http[s]?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9-]+.*/,
  },
  {
    name: "instagram",
    label: "Instagram",
    icon: InstagramIcon,
    validationRegex: /(http[s]?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9-]+.*/,
  },
  {
    name: "reddit",
    label: "Reddit",
    icon: RedditIcon,
    validationRegex: /(http[s]?:\/\/)?(www\.)?reddit\.com\/user\/[a-zA-Z0-9-]+.*/
  },
  {
    name: "twitter",
    label: "Twitter",
    icon: TwitterIcon,
    validationRegex: /(http[s]?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9-]+.*/,
  },
  {
    name: "tiktok",
    label: "TikTok",
    icon: () => <img src={TikTokSVG} height={20} alt="TikTok Logo"/>,
    validationRegex: /(http[s]?:\/\/)?(www\.)?tiktok\.com\/@[a-zA-Z0-9-]+.*/,
  },
]

export const getSocialLinkTypeByName = (name) => {
  let result;
  socialLinkTypes.forEach(type => {if(type.name === name) result = type});
  return result;
}

export const FFMapVisibility = {
  visible: "VISIBLE",
  hidden: "HIDDEN",
}
export const FFUserPrivacy = {
  private: "PRIVATE",
  public: "PUBLIC",
}
export const defaultUserSettings = {
  FFMapVisibility: FFMapVisibility.visible,
  FFUserPrivacy: FFUserPrivacy.private,
}

export const notificationReasons = {
  friendRequestCreated: 'FRIEND_REQUEST_CREATED',
  friendAdded: 'FRIEND_ADDED',
  challengeStatusChanged: 'CHALLENGE_STATUS_CHANGED',
  referralCodeUsed: 'REFERRAL_CODE_USED'
}