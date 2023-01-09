export const appname = "GreenDC";

export const dbURI = process.env.DBURI || `mongodb://mongo:27017/${appname.toLowerCase()}`;
export const port = process.env.PORT || 3000;