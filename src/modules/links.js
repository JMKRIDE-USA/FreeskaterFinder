import React from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';

import TikTokSVG from './assets/tiktok_icon.svg';


class GenericLink {
  constructor(value){
    this.value = value;

    this.label = null;
    this.name = this.label.toLowerCase();

    this.icon = null;
    this.prefix = null;
    this.regex = null;
  }

  static getLink(){
    const match = this.value.match(this.regex)
    return this.prefix + match[match.length - 1];
  }

  static getTextField({register, errors}){
    return (
      <TextField label={this.label} margin="normal" inputProps={
          register(this.name, {
            validate: value => (
              !value || (value && value.toLowerCase().match(this.regex).length) > 1
            ) || 'Invalid URL'
          })
        } error={!!errors[this.name]} helperText={errors[this.name]?.message}
      />
    )
  }
}

export class FacebookLink extends GenericLink {
  constructor(value){
    this.label = "Facebook";
    this.icon = FacebookIcon;
    this.prefix = "https://facebook.com/";
    this.regex = /(http[s]?:\/\/)?(www\.)?facebook\.com\/([a-zA-Z0-9-]{1,})/;
    super(value);
  }
}

export class InstagramLink extends GenericLink {
  constructor(value){
    this.label = "Instagram";
    this.icon = InstagramIcon;
    this.prefix = "https://instagram.com/";
    this.regex = /(http[s]?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9-]{1,})/
    super(value);
  }
}

export class RedditLink extends GenericLink {
  constructor(value){
    this.label = "Reddit";
    this.icon = RedditIcon;
    this.prefix = "https://reddit.com/user/";
    this.regex = /(http[s]?:\/\/)?(www\.)?reddit\.com\/user\/([a-zA-Z0-9-]{1,})/
    super(value);
  }
}

export class TwitterLink extends GenericLink {
  constructor(value){
    this.label = "Twitter";
    this.icon = TwitterIcon;
    this.prefix = "https://twitter.com/";
    this.regex = /(http[s]?:\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9-]{1,})/;
    super(value);
  }
}

export class TikTokLink extends GenericLink {
  constructor(value){
    this.label = "TikTok";
    this.icon = () => <img src={TikTokSVG} height={20} alt="TikTok Logo"/>;
    this.prefix = "https://tiktok.com/@";
    this.regex = /(http[s]?:\/\/)?(www\.)?tiktok\.com\/@([a-zA-Z0-9-]{1,})/;
    super(value);
  }
}

export const allLinkTypes = {
  "facebook": FacebookLink,
  "instagram": InstagramLink,
  "reddit": RedditLink,
  "twitter": TwitterLink,
  "tiktok": TikTokLink,
}