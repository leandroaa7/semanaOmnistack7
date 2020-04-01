import React, { useState, useEffect } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

export default function Feed() {
    /*     state = {
            feed: [],
        }; */

    let [feed, setFeed] = useState([]);


    useEffect(() => {
        api.get('posts').then(response => {
            setFeed(response.data);
        });
    })

    useEffect(()=>{
        registerToSocket();
    })

    const registerToSocket = () => {
        const socket = io('http://localhost:3333');

        // messages post, like

        socket.on('post', newPost => {
            console.log('post');
            console.log(feed);
            feed.unshift(newPost)
            console.log(feed);
            setFeed(feed);
        })
    }

    const handleLike = id => {
        api.post(`/posts/${id}/like`)
    }


    return (
        <section id="post-list">
            {feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}r</span>
                            <span className="place">{post.place}</span>
                        </div>

                        <img src={more} alt="Mais" />
                    </header>

                    <img src={`http://localhost:3333/files/${post.image}`} alt="" />

                    <footer>
                        <div className="actions">
                            <button type="button"
                                onClick={() => handleLike(post._id)}

                            >
                                <img src={like} alt="" />
                            </button>
                            <img src={comment} alt="" />
                            <img src={send} alt="" />

                        </div>

                        <strong>{post.likes} curtidas</strong>

                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>

            ))}
        </section>
    )

}