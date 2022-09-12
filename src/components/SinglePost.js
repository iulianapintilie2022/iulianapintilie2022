import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder  from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import "./singlepost.css";
import { Link } from "react-router-dom";


const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source)
}

export default function SinglePost() {
    const [singlePost, setSinglePost] = useState(null);
    const {slug}=useParams();
    useEffect(()=> {
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                         }
                     },
            body,
            "name": author->name,
            "authorImage":author->image,
        }`).then((data) => setSinglePost(data[0]))
           .catch(console.error);
    }, [slug]);
    if(!singlePost) return <div>Loading...</div>;

    return ( 
        <main className="single-post-page">
            <article>
                <div class='box'>
                    <div class='wave -one'></div>
                    <div class='wave -two'></div>
                    <div class='wave -three'></div>
                </div>
                <div className="info_single_page">
                <h1>{singlePost.title}</h1> 
                <div className="info">
                    <BlockContent blocks={singlePost.body} projectId="o9taovno" dataset="production" />
                </div>
                <div className="mainImage">
                    <img src={singlePost.mainImage.asset.url} alt={singlePost.title} /> </div>

                <div className="author">
                        <img src={urlFor(singlePost.authorImage).url()} alt={singlePost.name} />
                        <Link to="/about" className="author-link">{singlePost.name}</Link>
                    </div>
                
            </div>
               
            </article>
           
        </main>
    );
}