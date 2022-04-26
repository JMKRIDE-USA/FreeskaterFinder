export const headerHeight = {xs: '55px', md: '70px'}

export const maxBlurbLength = 80;
export const maxBioLength = 200;

export const unauthLocations = [
  '/create-account',
  '/setup-account',
  '/terms-of-service',
  '/privacy-policy',
  '/safety',
  '/rules',
  '/faq',
  '/reset-password/'
]

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