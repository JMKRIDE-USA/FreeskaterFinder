import React from 'react';

import { TextField } from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';

import TikTokSVG from '../assets/tiktok_icon.svg';


class GenericLink {
  constructor(value){
    this.value = value;

    this.label = null;

    this.icon = null;
    this.prefix = null;
    this.regex = null;
    console.log({t: this})
  }

  getName(){
    return this.label.toLowerCase();
  }

  getLink(){
    const match = this.value.match(this.regex)
    return this.prefix + match[match.length - 1];
  }

  getTextField({register, errors, key}){
    return (
      <TextField label={this.label} margin="normal" key={key} inputProps={
          register(this.getName(), {
            validate: value => (
              !value || (value && value.toLowerCase().match(this.regex)?.length) > 1
            ) || 'Invalid URL'
          })
        } error={!!errors[this.getName()]} helperText={errors[this.getName()]?.message}
      />
    )
  }
}

export class FacebookLink extends GenericLink {
  constructor(value){
    super(value);
    this.label = "Facebook";
    this.icon = FacebookIcon;
    this.prefix = "https://facebook.com/";
    this.regex = /(http[s]?:\/\/)?(www\.)?facebook\.com\/([a-zA-Z0-9-]{1,})/;
  }
}

export class InstagramLink extends GenericLink {
  constructor(value){
    super(value);
    this.label = "Instagram";
    this.icon = InstagramIcon;
    this.prefix = "https://instagram.com/";
    this.regex = /(http[s]?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9-]{1,})/
  }
}

export class RedditLink extends GenericLink {
  constructor(value){
    super(value);
    this.label = "Reddit";
    this.icon = RedditIcon;
    this.prefix = "https://reddit.com/user/";
    this.regex = /(http[s]?:\/\/)?(www\.)?reddit\.com\/user\/([a-zA-Z0-9-]{1,})/
  }
}

export class TwitterLink extends GenericLink {
  constructor(value){
    super(value);
    this.label = "Twitter";
    this.icon = TwitterIcon;
    this.prefix = "https://twitter.com/";
    this.regex = /(http[s]?:\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9-]{1,})/;
  }
}

export class TikTokLink extends GenericLink {
  constructor(value){
    super(value);
    this.label = "TikTok";
    this.icon = () => <img src={TikTokSVG} height={20} alt="TikTok Logo"/>;
    this.prefix = "https://tiktok.com/@";
    this.regex = /(http[s]?:\/\/)?(www\.)?tiktok\.com\/@([a-zA-Z0-9-]{1,})/;
  }
}

export const allLinkTypes = {
  "facebook": FacebookLink,
  "instagram": InstagramLink,
  "reddit": RedditLink,
  "twitter": TwitterLink,
  "tiktok": TikTokLink,
}