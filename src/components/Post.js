import React, {useState, useEffect} from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";
import "./post.css"


export default function Post() {
    const [postData, setPost] = useState(null);
    useEffect(()=> {
        sanityClient.fetch(`*[_type== "post"]{
            title,
            slug,
            mainImage{asset->{
                _id, 
                url
            }, alt 
            }
        }`).then((data) => setPost(data))
           .catch(console.error);
    }, [])



    return (
        <main>
            <div className="section1"> 
            <section >
            
                <div className="blog-page">
                <h1>Blog Posts Page</h1>
                    <h2>Welcome to the section where you can read recent posts.</h2></div>
                <div className="container">
                    {postData && postData.map((post, index)=>(
                    <article className="posts-container-article">
                        <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                        <div className="posts-card" key={index}>
                            <div className="posts-card-image">
                                <img src={post.mainImage.asset.url} alt={post.mainImage.alt} /> </div>
                            <div className="posts-card-info">
                                        <div className="posts-card-title">
                                <h3>{post.title}</h3>
                                        </div>
                                </div>
                        </div>
                        </Link>
                    </article>
                    )) }
                </div>
            
            </section>
               
            </div>
        </main>
    );
}