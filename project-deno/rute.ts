import { Router } from 'https://deno.land/x/oak/mod.ts';
import { home, signup, saveuser } from './controllers/blog.ts';

const router = new Router();

router
    .get("/", home)
    .get("/daftar", signup)
    .post("/simpanuser", saveuser)
    .get("/kategori", (ctx) => {
        ctx.response.body = "Kategori";
    })
    .get("/Tentang", (ctx) => {
        ctx.response.body = "Tentang";
    });
export default router;