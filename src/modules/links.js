import React from 'react';

import { TextField, IconButton } from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';

import TikTokSVG from '../assets/tiktok_icon.svg';


class GenericLink {
  constructor(value, {label, icon, prefix, prefixRegex}){
    this.value = value;

    this.label = label;
    this.icon = icon;
    this.name = label.toLowerCase();
    this.regex = new RegExp("(http[s]?:\/\/)?(www\.)?" + prefixRegex + "(?<handle>[^\/\?&%\'\"]{1,})"); 
    this.exampleValue = "https://" + prefix + "your_username";

    this.link = (() => {
      const match = this.value.match(this.regex)
      if(match && match.groups?.handle) 
        return "https://" + prefix + match.groups.handle;
    })();
  }

  getIcon({key} = {}){
    return <IconButton key={key} href={this.link} target="_blank" color="primary">{this.icon}</IconButton>
  }

  validateValue(value){
    if(!value) return true; //optional

    const match = value.toLowerCase().match(this.regex)
    if(!match) return false;
    if(!match.length) return false;
    if(!match.groups?.handle) return false;

    return true;
  }

  getTextField({register, errors, key}){
    return (
      <TextField label={this.label} margin="normal" key={key} inputProps={
          register(this.name, {
            validate: value => this.validateValue(value) || 'Invalid URL: Please follow the format: "' + this.exampleValue + '"'
          })
        } error={!!errors[this.name]} helperText={errors[this.name]?.message}
      />
    )
  }
}

export class FacebookLink extends GenericLink {
  constructor(value){
    super(
      value,
      {
        label: "Facebook",
        icon: <FacebookIcon/>,
        prefix: "facebook.com/",
        prefixRegex: "facebook\.com\/",
      }
    );
  }
}

export class InstagramLink extends GenericLink {
  constructor(value){
    super(
      value,
      {
        label: "Instagram",
        icon: <InstagramIcon/>,
        prefix: "instagram.com/",
        prefixRegex: "instagram\.com\/",
      }
    );
  }
}

export class RedditLink extends GenericLink {
  constructor(value){
    super(
      value,
      {
        label: "Reddit",
        icon: <RedditIcon/>,
        prefix: "reddit.com/user/",
        prefixRegex: "reddit\.com\/user\/",
      }
    );
  }
}

export class TwitterLink extends GenericLink {
  constructor(value){
    super(
      value,
      {
        label: "Twitter",
        icon: <TwitterIcon/>,
        prefix: "twitter.com/",
        prefixRegex: "twitter\.com\/",
      }
    );
  }
}

export class TikTokLink extends GenericLink {
  constructor(value){
    super(
      value,
      {
        label: "TikTok",
        icon: <img src={TikTokSVG} height={20} alt="TikTok Logo"/>,
        prefix: "tiktok.com/@",
        prefixRegex: "tiktok\.com\/@",
      }
    );
  }
}

export const allLinkTypes = {
  "facebook": FacebookLink,
  "instagram": InstagramLink,
  "reddit": RedditLink,
  "twitter": TwitterLink,
  "tiktok": TikTokLink,
}

/*
 * getSocialLinkObject 
 *  input: socialLinkData (user.socialLinks) 
 *  output: Map<socialLinkType, socialLinkObject>
 */
export const getSocialLinkObject = (socialLinkData, {includeBlank = false} = {}) => {
  const result = {}
  if(socialLinkData) {
    socialLinkData.forEach(({type, link}) => { // populate existing data
      if(!(type && link)){
        console.log("[!] Encountered Incomplete Social Link Data Object:", {socialLinkData})
      } else {
        result[type] = new allLinkTypes[type](link)
      }
    })
  }
  if(includeBlank){
    Object.entries(allLinkTypes).forEach(([type, socialLink]) => { // fill in the rest
      if(!result[type]) result[type] = new socialLink("");
    });
  }
  return result;
}