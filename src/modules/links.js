import React from 'react';

import { TextField, IconButton } from '@mui/material';

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
    this.prefixRegex = null;
  }

  getRegex(){
    return new RegExp("(http[s]?:\/\/)?(www\.)?" + this.prefixRegex + "(?<handle>[^\/\?&%]{1,})");
  }

  getName(){
    return this.label.toLowerCase();
  }

  getIconLink({key}){
    return <IconButton key={key} href={this.getLink()} target="_blank" color="primary">{this.icon}</IconButton>
  }

  getLink(){
    const match = this.value.match(this.getRegex())
    if(match && match.groups?.handle) 
      return "https://" + this.prefix + match.groups.handle;
  }

  validateValue(value){
    if(!value) return true; //optional

    const match = value.toLowerCase().match(this.getRegex())
    if(!match) return false;
    if(!match.length) return false;
    if(!match.groups?.handle) return false;

    return true;
  }

  getExampleValue(){
    return "https://" + this.prefix + "your_username"
  }

  getTextField({register, errors, key}){
    return (
      <TextField label={this.label} margin="normal" key={key} inputProps={
          register(this.getName(), {
            validate: value => this.validateValue(value) || 'Invalid URL: Please follow the format: "' + this.getExampleValue() + '"'
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
    this.icon = <FacebookIcon/>;
    this.prefix = "facebook.com/";
    this.prefixRegex = "facebook\.com\/"
  }
}

export class InstagramLink extends GenericLink {
  constructor(value){
    super(value);
    this.label = "Instagram";
    this.icon = <InstagramIcon/>;
    this.prefix = "instagram.com/";
    this.prefixRegex = "instagram\.com\/"
  }
}

export class RedditLink extends GenericLink {
  constructor(value){
    super(value);
    this.label = "Reddit";
    this.icon = <RedditIcon/>;
    this.prefix = "reddit.com/user/";
    this.prefixRegex = "reddit\.com\/user\/";
  }
}

export class TwitterLink extends GenericLink {
  constructor(value){
    super(value);
    this.label = "Twitter";
    this.icon = <TwitterIcon/>;
    this.prefix = "twitter.com/";
    this.prefixRegex = "twitter\.com\/";
  }
}

export class TikTokLink extends GenericLink {
  constructor(value){
    super(value);
    this.label = "TikTok";
    this.icon = <img src={TikTokSVG} height={20} alt="TikTok Logo"/>;
    this.prefix = "tiktok.com/@";
    this.prefixRegex = "tiktok\.com\/@";
  }
}

export const allLinkTypes = {
  "facebook": FacebookLink,
  "instagram": InstagramLink,
  "reddit": RedditLink,
  "twitter": TwitterLink,
  "tiktok": TikTokLink,
}

export const getSocialLinkObject = (socialLinkData, {includeBlank = false} = {}) => {
  const socialLinkObject = {}
  if(socialLinkData) {
    socialLinkData.forEach(({type, link}) => {
      if(!(type && link)){
        console.log("[!] Encountered Incomplete Social Link Data Object:", {socialLinkData})
        return
      }
      socialLinkObject[type] = new allLinkTypes[type](link) // populate existing data
    })
  }
  if(includeBlank){
    Object.entries(allLinkTypes).forEach(([type, obj]) => { // fill in the rest
      if(!socialLinkObject[type]) socialLinkObject[type] = new obj("");
    });
  }
  return socialLinkObject;
}