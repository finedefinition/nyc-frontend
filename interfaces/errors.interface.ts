type ErrorsKeys = {
  [key: string]: string | undefined;
};

export interface Errors extends ErrorsKeys {
  name?: string;
  userEmail?: string;
  message?: string;
}
