'use client'
import classes from"./tablePage.module.scss";
import { serverAdress } from "@/src/friends";
import {useState, useEffect, useRef} from 'react';
import { useMediaQuery } from "@/src/hooks/UseMediaQuery";
import { UseHeightQuery } from "@/src/hooks/UseHeightQuery";
import LeftPanel from "@/src/module/TablePage/LeftPanel";
import RightPanel from "@/src/module/TablePage/RightPanel";
import { createContext } from 'react';


const TablePage = () => {
	const isMediaQuery = useMediaQuery("(max-width: 1300px)");
	const height = UseHeightQuery();
	const [posts, setPosts] = useState(null);
	const [product, setProduct] = useState(null);
	const [active, setActive] = useState('All');
    const [isLoading, setLoading] = useState(true);
    const [isMistake, setMistake]= useState(true);6
    const [flag, setFlag]= useState(true);
    const [blur, setBlur] = useState(false); 
	const ref = useRef (null)
	const [handleLeftPanel, sethandleLeftPanel] = useState("");
	
	 useEffect (()=> {
		document.body.className=classes.bodygrey;
		sethandleLeftPanel(isMediaQuery);
		setBlur(isMediaQuery);
		return () => {document.body.className = ''};
	 },[isMediaQuery])

	 function panelControl() {
		const element = ref.current; 
 	if (element) { 
        element.className = classes.overLeftPanel;
		setBlur(true)
	}	
	sethandleLeftPanel(false);
}

const [filter, setFilter] = useState({
    product: "All",
    state: "All"
})

function settingProdStat (prodstatVariant) {
	setActive('');
	if (flag == true) {
		 prodstatVariant!=="All"? setPosts(product.filter((cart) => cart.state == prodstatVariant)): setPosts(product)
	} else return
	}	

useEffect (() => {

    fetch(filter.product!=="All"? serverAdress+`/?product=${filter.product}`: serverAdress).then((res) =>{
       return  res.json()
    }).then(data =>{
		setPosts(data);
		setProduct(data);
		setLoading(false)
    }).catch((err)=>{
		if (err.name == "AbortError") {
			console.log("запрос прерван");
		} else {
			 setMistake(err.message)
			 setLoading(false)
		}
	});
	
}, [filter] 
)

    return (  <AppContext.Provider value={{ 
        posts: posts,
		setPosts: setPosts,
		isMistake: isMistake,
		setMistake: setMistake,
		isLoading: isLoading,
		setLoading: setLoading,
		flag: flag,
		setFlag: setFlag, 
		filter: filter,
		setFilter: setFilter,
		settingProdStat: settingProdStat,
		active: active,
		setActive: setActive,
		height: height,
		blur: blur,
		setBlur: setBlur,
		handleLeftPanel: handleLeftPanel,
		sethandleLeftPanel: sethandleLeftPanel
   }}>

        {/* // левая панель */}
<div className={`${classes.total} ${isMediaQuery  && classes.total__small}`} style={{marginTop:height + 25}}>

<LeftPanel ref={ref}/>
{handleLeftPanel && <button onClick={() => panelControl()} className= {classes.filterbtn} style={{marginTop:height + 110}} >Фильтр</button>}

		  {/* // Таблица  */}
		<RightPanel />
		</div>
 </AppContext.Provider>	);
	} 
export const AppContext = createContext(null);
export default TablePage;

