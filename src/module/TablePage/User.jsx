import BlogList from "@/src/components/BlogList";
import classes from"@/src/pages/TablePage/tablePage.module.scss";
import { AppContext } from '@/src/pages/TablePage/TablePage';
import {useContext } from 'react';
const User = () => {
    const {posts} = useContext(AppContext);
    return ( 	
    <div className = {classes.tableWrapper}>
    <table className={classes.table}>
        <thead style={{textAlign:"left"}}>
            <tr className={classes.tabletitle}>
                <th >ID</th>
                <th>дата</th>
                <th>продукт</th>
                <th>имя</th>
                <th>email</th>
                <th>телефон</th>
                <th>статус</th>
                <th></th>
            </tr>
        </thead>
{posts ?  <BlogList /> : <tbody><tr><td >Ожидаем загрузку заявок...</td></tr></tbody>}
    </table> 
    </div>
    );
}

export default User;