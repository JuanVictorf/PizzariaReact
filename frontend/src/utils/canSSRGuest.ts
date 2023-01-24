import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

// funcao para páginas que só podem ser acessadas por visitantes

export function canSSRGuest<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        
        const cookies = parseCookies(ctx);

        // Se a pessoa tentar acessar a pagina de login e ter um login salvo, redirecionamos
        // para a página de dashboard

        if(cookies['@nextauth.token']){
            return{
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }

        return await fn(ctx);
    }
}