export const SET_COMPANY_NAME = "SET_COMPANY_NAME";
export const SET_FILE = "SET_FILE";

export const setCompanyName = (name: string) => ({
  type: SET_COMPANY_NAME,
  payload: name,
});

export const setFile = (file: File) => ({
  type: SET_FILE,
  payload: file,
});
