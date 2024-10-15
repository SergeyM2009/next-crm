'use client'
import classes from"./../../pages/HomePage/HomePage.module.scss";
import { useState } from "react";
import * as friend from './../../friends';
import { serverAdress } from "./../../friends";
import { useMediaQuery } from "@/src/hooks/UseMediaQuery";
import { mailes, names, phones, products } from "@/src/helpers/const";
import { randomValue } from "@/src/helpers/lib";

const Form = () => {
 
  //для блокировки кнопки отправки на то время, пока уже отправленный пост не будет записан на сервер
const [isPending, setPending] = useState(false);//тут  будет false или true
const [personName, setName] = useState(randomValue(names));
const [phone, setPhone] = useState(randomValue(phones));
const [mail, setMail] = useState(randomValue(mailes));
const [product, setProduct] = useState(randomValue(products));
const [state] = useState('new');
const [date, setDate] = useState(friend.makeDate(friend.currentDate));
const [time, setTime] = useState(friend.makeTime(friend.currentTimeMoscow));

const  handleSubmit = (event) => {
   event.preventDefault();

const blog = {personName, phone, mail, product, state, date, time};

if (blog.personName) {
setPending(true);
fetch(serverAdress, {
method:'POST',
headers: {"Content-Type": "application/json"}, 
body: JSON.stringify(blog)
}).then((res)=> {
if (res.ok){
    setProduct(randomValue(products));
    setMail(randomValue(mailes));
    setPhone(randomValue(phones));
    setName(randomValue(names));
    setProduct(randomValue(products));
    setDate(friend.makeDate(friend.currentDate));
    setTime(friend.makeTime(friend.currentTimeMoscow));
    setPending(false)
}

}).catch(error => {
console.error("Ошибка при выполнении отправки на сервер: ", error);
});
}}
  
    // применение кастомного хука для ширины экрана:
const mobileMediaQuery = useMediaQuery("(max-width: 370px)");

    return (    <form onSubmit={handleSubmit} id="form" method="POST" action="">
        <label>Ваши данные:</label>
        <div className={classes.form__group}>
            <input id="name" type="text" name="name" autoComplete="on" className = {classes.form__control} placeholder="Имя и Фамилия" required
            value={personName} onChange={(e) =>{setName(e.target.value)}}
            />
        </div>
         <div className={classes.form__group}>
            <input id="phone" type="text" name="phone" autoComplete="on" className = {classes.form__control} placeholder="Телефон"
            value={phone}  onChange={(e) =>{setPhone(e.target.value)}}
            />
        </div>
         <div className={classes.form__group}>
            <input id="email" type="email" name="email" autoComplete="on" className = {classes.form__control} placeholder="Email" required
            value={mail} onChange={(e) =>{setMail(e.target.value)}} 
            />
        </div>
         <div className={classes.form__group}>
            <label htmlFor="exampleFormControlSelect1">Продукт:</label>
            <select id="product" name="product" className = {classes.form__control}
             value={product} onChange={(e) =>{setProduct(e.target.value)}}>
               {!mobileMediaQuery ? <option value="course__html">Курс по верстке</option> : <option value="course__html">Верстка</option>}
               {!mobileMediaQuery ? <option value="course__js">Курс по JavaScript</option>  : <option value="course__js">JavaScript</option>}
               {!mobileMediaQuery ? <option value="course__vue">Курс по VUE JS</option> : <option value="course__vue">VUE JS</option> }
               {!mobileMediaQuery ? <option value="course__php">Курс по PHP</option> : <option value="course__php">PHP</option> }
               {!mobileMediaQuery ? <option value="course__wordpress">Курс по WordPress</option> : <option value="course__wordpress">WordPress</option> }
            </select>
        </div>
     <div className={classes.form__group + ' ' + classes.text__center} >
          {isPending && <button type="submit" disabled className={classes.submitbtn}>Заявка оформляется</button>}  
          {!isPending && <button type="submit"         className={classes.submitbtn}>Оформить заявку</button>}  
        </div>
    </form> );
}
 
export default Form;