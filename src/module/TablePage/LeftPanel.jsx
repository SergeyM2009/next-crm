import classes from"@/src/pages/TablePage/tablePage.module.scss";
import { serverAdress } from "@/src/friends";
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";
import { statusArr  } from "@/src/helpers/const";
import { AppContext } from '@/src/pages/TablePage/TablePage';
import {useContext } from 'react';
import { productSelect } from "./RightPanel";

 const LeftPanel = forwardRef((_, ref) => {
 const {setMistake, setLoading, setFlag, setPosts, active, setActive, setBlur, sethandleLeftPanel} = useContext(AppContext);
 const [fresh, setFresh] = useState(null);
   
    useEffect (() => {
        fetch(serverAdress+"?state=new").then((res) =>{
           return  res.json()
        }).then(fresh =>{
            setFresh(fresh);
        }).catch((err)=>{
            if (err.name == "AbortError") {
                console.log("запрос прерван");
            } else {
                 setMistake(err.message)
                 setLoading(false)
            }
        });
    }, [setMistake, setLoading] 
    );
     function settingStatus (statusVariant) {
        fetch(statusVariant!=="All"? serverAdress+`?state=${statusVariant}`: serverAdress).then((res) =>{
            return  res.json()}).then(data =>{ setPosts(data); setLoading(false) }).catch((err)=>{
                if (err.name == "AbortError") {
                    console.log("запрос прерван");
                } else {
                     setMistake(err.message)
                     setLoading(false)
                };
            });
    setActive(statusVariant);
    const selectElement = productSelect.current;
    const optionToSelect = selectElement.querySelector('#all');
    optionToSelect.selected = true;
    selectElement.dispatchEvent(new Event('change'));  
     }
     
    return (
		<div ref={ref} className={classes.left__panel} >
			<div className={classes.left__panel__logo}>
				<button onClick={() => {ref.current.className = classes.left__panel; sethandleLeftPanel(true); setBlur(false)}} className={classes.closeBtn}> <span className={classes.cross}></span></button>
				<div className={classes.left__panel__logo__title}>CRM заявки</div>
				<div className={classes.left__panel__logo__subtitle}>учебный проект webcademy</div>
			</div>
			<div className={classes.left__panel__user +" "+  classes.clearfix}>
				<div className={classes.left__panel__user__photo}>
                <Image src="/tina.jpeg" width = '110' height ='110' alt="Аватар" />
				</div>
				<div className={classes.left__panel__user__name}>Tina <br />Turner</div>
			</div>
			<div className={classes.left__panel__navigation}>
				<div className={classes.left__panel__navigation__title}>Заявки</div>
				<ul>
                    {statusArr.map((el) => {
                        return (
 <li key={el.name}><a onClick={()=>{settingStatus(el.active), setFlag(false)}} className={active==el.active ? "active" : ""}>{el.name} {el.active=="new" && <div className={classes.badge} id="badge-new" >{fresh && fresh.length}</div>} </a></li>
)
                    })}
				</ul>
			</div>
		</div> 
			 );
}
)
LeftPanel.displayName = "LeftPanel";//это требует сборщик
export default LeftPanel;