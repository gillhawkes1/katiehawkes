import { NextApiResponse } from "next";

export const setCorsHeaders = (res: NextApiResponse, types: Uppercase<string>) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://katiehawkes.com');
  res.setHeader('Access-Control-Allow-Methods', types);
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
}