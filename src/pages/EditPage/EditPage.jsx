'use client'
import classes from"./EditPage.module.scss";
import {useEffect, useState} from 'react';
import {Delete} from '@/src/components/DeleteCard';
import { serverAdress } from '@/src/friends';
import { useRouter } from 'next/navigation';
import { UseHeightQuery } from "@/src/hooks/UseHeightQuery";

const EditPage = ( {id}) => {

    const [posts, setPosts] = useState(null);
    const height = UseHeightQuery(); 
    
    useEffect (() => {
    document.body.className=classes.bodygrey
        fetch( serverAdress+`/${id}`).then((res) =>{
           return  res.json()
        }).then(data =>{
         setPosts(data)
        });
        return () => {document.body.className = ''};
         }, [id] 
    );
   
function saving() {
    fetch( serverAdress+`/${id}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(posts)
      })
      .then(response => response.json())
      .catch((error) => {
        console.error('Ошибка при обновлении содержания поста:', error);
      });
}

const router = useRouter();

if (posts) {     

return(
<div className={classes.form__wrapper} style={{marginTop: height + 25}}>
    <div className={classes.container__fluid}>

        <div className={classes.row__justify__content__between__align__items__center}>
            <div className={classes.col}>
                <div className={classes.admin__heading__1}>Работа с заявкой</div>
            </div>
                <div className={classes.col__text__right}>
                <button  className={classes.btn__btn__warning} onClick= {() => {Delete(id);  router.push('/table');}}>Удалить заявку</button> 
            </div>
        </div>
        <div className={classes.row}>
            <div className={classes.col}>
                <form id="form">
                    <div className={classes.card__mb__4}>
                        <div className={classes.card__header}>Данные о заявке</div>
                        <div className={classes.card__body}>
                            <div className={classes.row__mb__3}>
                                <div className={classes.col__md__2}>
                                    <strong>ID:</strong>
                                </div>
                                <div className={classes.col}>Заявка № <span id="number">{posts.id}</span></div>
                                <input name="id" type="hidden" id="id"/>
                            </div>

                            <div className={classes.row__mb__3}>
                                <div className={classes.col__md__2}>
                                    <strong>Дата создания:</strong>
                                </div>
                                <div className={classes.col} id="date">{posts.time} </div>
                            </div>

                            <div className={classes.row__mb__3}>
                                <div className={classes.col__md__2}>
                                    <strong>Продукт:</strong>
                                </div>
                                <div className={classes.col}>
                                <select id="product" name="product" className={classes.custom__select} value={posts.product}  onChange={(e)=>{setPosts({...posts, product: e.target.value})}}>
                                    <option value="course__html">     Курс по верстке</option>
                                    <option value="course__js">       Курс по JavaScript</option>
                                    <option value="course__vue">      Курс по VUE JS</option>
                                    <option value="course__php">      Курс по PHP</option>
                                    <option value="course__wordpress">Курс по WordPress</option>
                                </select>
                                </div>
                            </div>
                    
                            <div className={classes.row__mb__3}>
                                <div className={classes.col__md__2}>
                                    <strong>Имя:</strong>
                                </div>
                                <div className={classes.col}>
                                    <input
                                        type="text"
                                        className={classes.form__control}
                                        value={posts.personName}
                                        id="name"
                                        name="name"
                                        onChange={(e)=>{setPosts({...posts, personName: e.target.value})}}
                                        readOnly //если закоментить или стереть это, то поле будет изменяемым
                                    
                                    />
                                </div>
                            </div>

                            <div className={classes.row__mb__3}>
                                <div className={classes.col__md__2}>
                                    <strong>Email:</strong>
                                </div>
                                <div className={classes.col}>
                                    <input
                                        type="text"
                                        className={classes.form__control}
                                        value={posts.mail}
                                        id="email"
                                        name="email"
                                        onChange={(e)=>{setPosts({...posts, mail: e.target.value})}}
                                        readOnly //если закоментить или стереть это, то поле будет изменяемым
                                        />
                                </div>
                            </div>

                            <div className={classes.row__mb__3}>
                                <div className={classes.col__md__2}>
                                    <strong>Телефон:</strong>
                                </div>
                                <div className={classes.col}>
                                    <input
                                        type="text"
                                        className={classes.form__control}
                                        value={posts.phone}
                                        id="phone"
                                        name="phone"
                                        onChange={(e)=>{setPosts({...posts, phone: e.target.value})}}
                                        readOnly //если закоментить или стереть это, то поле будет изменяемым
                                        />
                                </div>
                            </div>

                            <div className={classes.row__mb__3}>
                                <div className={classes.col__md__2}>
                                    <strong>Статус заявки:</strong>
                                </div>
                                <div className={classes.col}>
                                    <select className={classes.custom__select} id="status" name="status" value={posts.state}  onChange={(e)=>{setPosts({...posts, state: e.target.value})}}>
                                                <option value="new">     Новая</option>
                                                <option value="inwork">  В работе</option>
                                                <option value="complete">Завершена</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.row__justify__content__between}>
                        <div className={classes.col__text__right}>
                            <button  className={classes.btn__btn__primary} onClick= {() => {saving() }}>Сохранить изменения</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
 );
}
}

export  default EditPage;