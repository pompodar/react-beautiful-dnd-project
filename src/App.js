import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const LOCAL_STORAGE_KEY = 'dndApp.dragAndDrop'

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: 'https://www.womenontopp.com/wp-content/uploads/2018/09/joshua-rawson-harris-vFiBgWnk2x0-unsplash.jpg'
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: 'https://i.pinimg.com/564x/59/39/77/59397761fc67d89dd448c74bce0e7061.jpg'
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEM4UMbwC6Xwu1B79cd-OUVNGE1bIfZlgCBA&usqp=CAU'
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: 'https://buzzly.info/upload/1769/5705d4c005efeff0ce92ec1ec57ac130.jpg'
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: 'https://media.istockphoto.com/photos/perfect-skin-closeup-of-an-attractive-girl-picture-id510019534?b=1&k=20&m=510019534&s=170667a&w=0&h=ZVGormyVyj7X5L20w3XXkEpmotsiD0RdYxm0IFJsu0c='
  }
]

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  useEffect(() => {
    const storedDND = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedDND) updateCharacters(storedDND)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(characters))
  }, [characters])

  function handleOnDragEnd(result) {
    console.log(result)
    
    if (!result.destination) return;

    const items = Array.from(characters);

    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log(reorderedItem)
    console.log(items)

    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
      <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name, thumb}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <p>
        Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
      </p>
    </div>
  );
}

export default App;