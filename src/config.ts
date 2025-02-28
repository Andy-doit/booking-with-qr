import { z } from "zod";

const configschema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
    NEXT_PUBLIC_API_KEY: z.string(),
})

const configProject = configschema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
})
if (!configProject.success) {
    console.error(configProject.error.errors);
    throw new Error("Biến môi trường không hợp lệ");
}
const envConfig = configProject.data;

export default envConfig;