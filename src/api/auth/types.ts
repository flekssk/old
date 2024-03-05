export type RegistrationRequest = {
  email: string;
  plainPassword: string;
  name: string;
};

export type RegistrationResponse = {
  message: string;
};

export type ResetPasswordRequest = {
  email: string;
};

export type ResetPasswordResponse = {
  message: string;
};

export type ResetPasswordByTokenRequest = {
  token: string;
  plainPassword: {
    first: string;
    second: string;
  };
};

export type ResetPasswordByTokenResponse = {
  message: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};
