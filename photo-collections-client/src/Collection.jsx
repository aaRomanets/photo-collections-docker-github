import React from 'react'

//компонент показа коллекции фотографий
export const Collection = ({
    //все фотографии в представляемой коллекции
    images, 
    //название представляемой коллекции фотографий 
    name
}) => {
    return (
        <div className="collection">
            {/*Ключевое изображение представляемой коллекции фотографий*/}
            <img className="collection__big" src={images[0]} alt="Item" />
            <div className="collection_bottom">
                {/*Первое малое изображение представляемой коллекции фотографий*/}
                <img className="collection__mini" src={images[1]} alt="Item" />
                {/*Второе малое изображение представляемой коллекции фотографий*/}
                <img className="collection__mini" src={images[2]} alt="Item" />
                {/*Третье малое изображение представляемой коллекции фотографий*/}
                <img className="collection__mini" src={images[3]} alt="Item" />
            </div>
            <h4>{name}</h4>
        </div>
    )
}

export default Collection;