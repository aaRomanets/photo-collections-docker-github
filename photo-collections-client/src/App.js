import React from 'react';
import {Collection} from './Collection';
import './index.scss';

//список категорий коллекций фотографий
const cats = [
  { "name": "All" },
  { "name": "Sea" },
  { "name": "Mountains" },
  { "name": "Architecture" },
  { "name": "Cities" }
];

//компонент показа коллекций фотографий
function App() {
  //текущая категория коллекций фотографий
  const [categoryId,   setCategoryId] = React.useState(0);
  //станица показа коллекций фотографий
  const [page,               setPage] = React.useState(0);
  //флаг скачивания коллекций фотографий с json-server
  const [isLoading,     setIsLoading] = React.useState(true);
  //текстовая метка поиска коллекции фотографий среди скаченных и 
  //представленных на странице коллекций фотографий по заданной категории
  const [searchValue, setSearchValue] = React.useState('');
  //список выводимых с сервера коллекций фотографий, который отображается на отдельной странице
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    //активируем флаг загрузки коллекций фотографий с сервера
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : ``;

    //скачиваем заданную категорию коллекций фотографий
    fetch(`http://localhost:4007/collections?${category}`)
    .then((res) => res.json())
    .then((json) => {
      //максимум три коллекции фотографий по выбранной категории коллекций
      const limit = 3;
      if (json.length < page*limit)
      {
        //коллекций фотографий по нужной категории для страницы с номером page нет
        setCollections([]);
      }
      else
      {
        //требуемые коллекции фотографий по выбранной категории коллекций фотографий собираем в массив paginationJson 
        //для страницы с номером page
        let paginationJson = [];
        let numElem = 1;
        json.forEach((obj, i) => {
          if (i >= page*limit && numElem <=limit)
          {
            numElem++
            paginationJson.push(obj)
          }
        })
        //определили коллекции фотографий по нужной категории для страницы с номером page
        setCollections(paginationJson);
      }
    })
    .catch((err) => {
      console.warn(err);
      alert('Error receiving data');
    })
    .finally(() => {
      //нужная категория коллекций фотографий скачена
      setIsLoading(false)
    })
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>My Photo Collections</h1>
      <div className="top">
        <ul className="tags">
          {/*Представляем все категории коллекций фотографий */}
          {cats.map((obj, i) => (
            <li 
              //предоставляем возможность изменения текущей категории коллекций фотографий
              onClick={() => setCategoryId(i)} 
              className={categoryId === i ? 'active' : ''} 
              key={obj.name}
            >
              {/*Название категории коллекций фотографий */}
              {obj.name}
            </li>
          ))}
        </ul>
        {/*Метка поиска нужной колекции фотографий по ее названию */} 
        <input 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input" 
          placeholder="Search by name" 
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>The download is in progress...</h2> 
        ) : (
          //показываем загруженные коллекции фотографий
          collections.filter(obj =>  obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj, index) => (
            <Collection key={index} name={obj.name} images={obj.photos} />
          ))
        )}
      </div>
      <ul className="pagination">
        {/*Страницы показа коллекций фотографий */}
        {[...Array(5)].map((_, i) => (
          //страница показа коллекций фотографий может быть активной
          <li onClick={() => setPage(i)} className={page === i  ? 'active' : ''}>
            {/*номер страницы показа выбранной категории коллекций фотографий */}
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;