import { serverAdress } from "../friends";
const Delete = (id) => { 
    const test= window.confirm("Удалить?");
  
    if (test) {
           fetch( serverAdress+`/${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json()) 
        .catch((error) => console.error('Ошибка при удалении:', error));
  }
    }
  export { Delete };
  