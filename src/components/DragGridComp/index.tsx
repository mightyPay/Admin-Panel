import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

export type Item = {
  id: string;
  content: string;
};

export type GridProps = {
  items: Item[];
};

export default function DragGridComp({ items }: GridProps) {
  const [grid, setGrid] = useState(items);

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const newGrid = Array.from(grid);
    const [reorderedItem] = newGrid.splice(result.source.index, 1);
    newGrid.splice(result.destination.index, 0, reorderedItem);

    setGrid(newGrid);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="grid" type="GRID" direction="horizontal">
        {(provided) => (
          <div
            className="grid grid-cols-3 gap-4 w-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {grid.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className="bg-white shadow rounded-lg p-4 border border-black"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ gridArea: `${index + 1} / 1 / span 1 / span 1` }}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
