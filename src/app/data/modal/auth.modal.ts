export interface LoginFormValue {
  email: string;
  password: string;
  keepMeLoggedIn: boolean;
}

export interface Credentials {
  token: string;
  tokenExpiryTime: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  newConfirmPassword: string;
  passwordResetToken: string;
}

export interface AuthState {
  credentials: Credentials | undefined;
  permissions: string[] | undefined;
}

