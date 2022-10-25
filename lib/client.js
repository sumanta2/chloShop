import sanityClient from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";
export const client=sanityClient({
    projectId:"c3lmkihf",
    dataset:'production',
    apiVersion:"2022-10-03",
    useCdn:true,
    token:"sklO1LgaPMs4cIMT3iAkNccx5GWPEW2kgLryaQwkTwqc3ChCjMPbazNBe3pOZ4cd2a9Ee3p7KleSaYvGCB0hqFs11jbFfJMa9slqpd6JUbbkY7rsb5OgE6bSf9IwImJ9XLlSlkNGlSevliDgSFTWiHza2kRKu24n4iZNZPh0ZkDudpWfPNfW"
})

const builder= ImageUrlBuilder(client);

export const urlFor= (source)=> builder.image(source)