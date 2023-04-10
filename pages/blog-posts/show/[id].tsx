import { HeadlessShowInferencer } from "@refinedev/inferencer/headless";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function BlogPostShow() {
    return <HeadlessShowInferencer 
fieldTransformer={(field: any) => {
  if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
    return false;
  }

  return field;
}}
/>;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    
    const { authenticated, redirectTo } = await authProvider.check(context);




    if (!authenticated) {
        return {
            props: {
            },
            redirect: {
                destination: `${redirectTo}?to=${encodeURIComponent(
          "/blog-posts"
        )}`,
                permanent: false,
            },
        };
    }

    return {
        props: {
        },
    };
};
