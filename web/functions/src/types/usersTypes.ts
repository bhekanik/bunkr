import { program, notification } from "./programsTypes";

export type signupUser = {
  email: string;
  password: string;
  confirmPassword: string;
  handle: string;
};

export type signupValidationObject = {
  errors: signupUser;
  valid: boolean;
};

export type loginUser = {
  email: string;
  password: string;
};

export type loginValidationObject = {
  errors: loginUser;
  valid: boolean;
};

export type user = {
  userId?: string;
  email: string;
  handle: string;
  createdAt: string;
  imageUrl: string;
  bio: string;
  website: string;
  location: string;
};

export type userDetails = {
  user: user;
  programs: program[];
};

export type scream = {
  body: string;
  createdAt: string;
  userHandle: string;
  userImage: string;
  likeCount: number;
  commentCount: number;
  comments?: comment[];
  screamId?: string;
};

export type comment = {
  body: string;
  createdAt: string;
  screamId: string;
  userHandle: string;
  userImage: string;
  commentId?: string;
};

export type like = {
  userHandle: string;
  programId: string;
  likeId?: string;
};

export type credentials = {
  handle: string;
  email: string;
  createAt: string;
  imageUrl: string;
  userId: string;
};

export type userData = {
  credentials: credentials;
  likes: like[];
  notifications: notification[];
};

export type userImage = {
  filepath: string;
  mimetype: string;
};
