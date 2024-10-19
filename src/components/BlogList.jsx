'use client'
import Link from 'next/link.js';
import * as friend from '@/src/friends';
import classes from './navigation.module.scss';
import { AppContext } from '@/src/pages/TablePage/TablePage';
import {useContext } from 'react';

   const BlogList = ()=>{
    const {posts} = useContext(AppContext);
        return (

         <tbody id="tbody" className={classes.tbody}>
                {posts.map((post) =>
                    <tr key={post.id} className={classes.lines}> 
                        <th scope="row" style={{textAlign:"left"}}>{post.id}</th>
                        <td>{post.date}</td>
                        <td>{friend.renderPriduct[post.product]}</td>
                        <td> {post.personName}</td>
                        <td>{post.mail}</td>
                        <td>{post.phone}</td>
                        <td>
                            <div className={`${friend.badgeColor[post.state]}`} >{friend.renderState[post.state]}</div>
                        </td>
                        <td>
                            <Link href= {`/editor/${post.id}`} style={{marginTop:'0'}}> Редактировать</Link>
                        </td>
                    </tr>
    )}
                </tbody>
        )
   }
   export default BlogList;