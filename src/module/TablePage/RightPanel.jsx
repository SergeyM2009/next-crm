import { statusArr } from "@/src/helpers/const";
import classes from"@/src/pages/TablePage/tablePage.module.scss";
import User from "./User";
import { AppContext } from '@/src/pages/TablePage/TablePage';
import {useContext, useRef} from 'react';
let productSelect;

const RightPanel = () => {
	productSelect = useRef(null)
    const {isMistake, isLoading, flag, setFilter, setFlag, settingProdStat, setActive, blur, handleLeftPanel} = useContext(AppContext);
	function handleInputChange () {
		setFlag(true);	
		setActive('')
	}
	
    return ( 
        <div className={`${classes.main__wrapper}${blur&!handleLeftPanel ? ` ${classes.main__wrapper__blur}` : ''}`}>
			<div className={classes.container__fluid}>
				<div className={classes.admin__heading__1}>Список заявок</div>
				{isMistake && isLoading && <p>Загрузка...</p>}
				{!isMistake && isLoading && <p>Ошибка запроса на сервер</p>}
				
					<div className={classes.filter__wrapper}>
						<div className={classes.col}>
									<div id="topStatusBar" className={classes.btn__group} role="group" aria-label="...">
     {statusArr.map((el) => {
                        return (
 <a key={el.name}  className={ flag ? `${classes.btn} ${classes.btn__light} `: `${classes.btn} ${classes.opacity} `} data__value={el.active} onClick={()=>{{settingProdStat(el.active )  }}
  } >{el.name}</a>
)
                    })}
									</div> 
						</div>
						<div className={classes.col}>
							<select className={classes.custom__select}  ref={productSelect} onFocus={()=>{setFilter((prev)=> ({...prev, product: 'All'})) , handleInputChange()   }} onChange={(event)=>{setFilter((prev)=> ({...prev, product: event.target.value}))}}>
								<option value="All" id="all" >Все продукты</option>
								<option value="course__html">Курс по верстке</option>
								<option value="course__js">Курс по JavaScript</option>
								<option value="course__vue">Курс по VUE JS</option>
								<option value="course__php">Курс по PHP</option>
								<option value="course__wordpress">Курс по WordPress</option>
							</select>
						</div>
					</div>
				<User />
			</div>
		</div>
     );
}
 
export default RightPanel;
export {productSelect};