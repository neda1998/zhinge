let inDevEnvironment = false;

if (process.env.NODE_ENV === "development") {
  inDevEnvironment = true;
}

const mainUrl = "http://185.231.115.236:3000/api/V1";

export { inDevEnvironment, mainUrl };
