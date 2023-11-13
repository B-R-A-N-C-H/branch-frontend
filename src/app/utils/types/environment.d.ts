declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;

            BACKEND_URL: string;
        }
    }
}