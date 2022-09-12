import React, { useState, useEffect } from "react";
import sanityClient from "../client.js"; 
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import { Link } from "react-router-dom";
import "./about.css"



const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source)
}

export default function About(){
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type== "author"]{
            name,
             bio,
            "authorImage": image.asset->url
        }`).then((data) => setAuthor(data[0]))
            .catch(console.error);
    }, [])

    if (!author) return <div>Loading...</div>;

    return (
        <main className="background1">
        
            <div >
                
                <section>
                    <div className="author_info">
                        <img className="author_image" src={urlFor(author.authorImage).url()} alt={author.name} />
                   
                        <h1> Hey! I'm {""}
                            <Link to="/post" className="author-posts">{author.name}</Link></h1>
                    </div>
                   
                    <div className="author_bio">
                        <BlockContent blocks={author.bio} projectId="o9taovno" dataset="production" className="author_bio_content"/>
                    </div>
                   
                </section>
                
            </div>
           
        </main>
    );
}