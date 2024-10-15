const renderPriduct = {
    'course__php': 'Курс по PHP',
    "course__js":'Курс по JavaScript',
    "course__vue":'Курс по VUE JS',
    "course__wordpress":'Курс по WordPress',
    "course__html": 'Курс по верстке',
};

const renderState = {
    "new":     'Новая',
    "inwork":  'В работе',
    "complete":'Завершена'
}
//фон надписи статус
const badgeColor = {
    "new":      'badge__danger',
    "inwork":   'badge__warning',
    "complete": 'badge__success'
}

let currentDate, currentTimeMoscow;     
const  makeDate = ()=> {
   const options = {day: '2-digit', month: '2-digit',year: 'numeric'};
   return  currentDate = new Date().toLocaleDateString('ru-RU', options);  
    };

const  makeTime = ()=>  currentTimeMoscow = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

// const serverAdress = "https://grizzly-boiled-broccoli.glitch.me/posts";
// const serverAdress = "https://market.teplo-best.ru/posts";
// const serverAdress = "http://localhost:5000/posts";
const serverAddress = "https://github.com/SergeyM2009/next-crm/posts";


export {renderPriduct, renderState,badgeColor, makeDate, makeTime,currentDate,currentTimeMoscow, serverAdress}

