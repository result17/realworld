// https://bobbyhadz.com/blog/typescript-process-env-type
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_CONSTANTS_SECRET: string;
    }
  }
}
