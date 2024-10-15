'use client'
import Link from "next/link";
import classes from "./navigation.module.scss";
import { useRef } from "react";
let res;

const Navigation = ({ opensans }) => {
    res = useRef(null);
    return (
        <nav ref={res} className={classes.project__nav} id="head">
            <div className={classes.project__nav__links__wrapper}>
                <Link className={classes.links} href="/">
                    <p className={opensans.className}>форма добавления заявок</p>
                </Link>
                <Link className={classes.links} href="/table">
                    <p className={opensans.className}>таблица с заявками</p>
                </Link>
            </div>
        </nav>
    );
};

export default Navigation;
export {res};