'use client'
import classes from"./HomePage.module.scss";
import Form from "@/src/module/HomePage/Form";
import { useEffect, useState } from "react";
import { UseHeightQuery } from "@/src/hooks/UseHeightQuery";


const HomePage = () => {
    const height = UseHeightQuery();
    const [isClient, setisClient]= useState(false);
	useEffect(()=> {document.body.className=classes.bodyblue;
                    setisClient(true);
        return () => {document.body.className = ''};
                }, [])
    
return ( isClient &&
    <div className={classes.wrapper} style={{marginTop:height+25}}>
    <div className={classes.white__plate} >
        <div className={classes.container__fluid}>
            <div className= {classes.white__plate__header + " " +  classes.text__center}>
                <p className={classes.white__plate__logo}>
                    <span>Форма</span> заявок
                </p>
            </div>
         <Form/>
        </div>
    </div>
 </div>
    );
}
 
export default HomePage;
