export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DATABASE_URL: string;
      ENCRYPTION_SECRET: string;
      ANOTHER_ENCRYPTION_SECRET: string;
      YET_ANOTHER_ENCRYPTION_SECRET: string;
    }
  }
}
