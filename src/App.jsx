import { useState } from 'react'
import './App.css'

function App() {

  const [textareaValue, setValue] = useState("Przykładowe imię lub wiadomość");

  let comments = [
    {
      id: 1,
      name: "Zbigniew",
      replies: [
        {
          id: 1,
          name: "Karol",
          replies: [],
        },
        {
          id: 2,
          name: "Andrzej",
          replies: [],
        }
      ],
    }
  ]

  // ścieżka komentarza 1 1 => path = [1, 1]

  // 1. znajdź obiekt o id = 1 (path[0])

  // 2. przemapuj dzieci w poszukiwaniu obiektu o id = path[1] czyli 1

  // 3. zwróć zmienioną wartość dla znalezionego obiektu.
  // Niech zmieni wartość klucza "name" na pełne imię, czyli Andrzej Morozowski

  const editValue = (arr, id, path, repeated, key, newValue, iterator) => {
    arr.map((obj) => {
      if(obj[id] == path[iterator]){
        if(path.length-1 == iterator){
          obj[key] = newValue;
        } 
        else editValue(obj[repeated], id, path, repeated, key, newValue, ++iterator);
      }
      return obj;
    })
    return arr;;
  }

  const addValue = (arr, path, toThisArray, newObj, id, iterator) => {
    arr.map((obj) => {
      if(obj[id] == path[iterator]){
        if(path.length-1 == iterator) 
          obj[toThisArray].push(newObj); 
        else addValue(obj[toThisArray], path, toThisArray, newObj, id, ++iterator)
      }
      return obj;
    })
    return arr;
  } 

  comments = editValue(comments, "id", [1, 2], "replies", "name", "Andrzej Morozowski", 0)
  return <form
    className='form'
    onSubmit={(e) => {
      e.preventDefault();
      comments = addValue(comments, [1, 2], "replies", {comment: 1, name: e.target[0].value, replies: []}, "id", 0);
      console.dir(comments);
    }}
  >
    <h1 className='form-title'>
      {"Dodaj odpowiedź do komentarza o ścieżce: [1, 2]. "}
    </h1>
    <p className='form-desc'>
      {"Po wykonaniu zadania otwórz konsole. Znajdziesz w niej tablice o komentarzy. Nawiguj przy pomocy ścieżki po id obiektów, aż na trafisz na obiekt o tej ścieżce (czyli obiekt o id 2 w tablicy obiektu o id 1). Następnie rozwiń wartość klucza 'replies' - tam powinna się znaleźć twoja wiadomość."}
    </p>
    <textarea 
      className='form-textarea'
      placeholder='Twoje imię lub wiadomość'
      value = {textareaValue}
      onChange = {(e) => {
          setValue(e.target.value);
        }
      }
    ></textarea>
    <button
      className='form-submit'
      type='submit'
    >
      Submit
    </button>
  </form>;
}

export default App
