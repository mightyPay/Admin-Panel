import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

type TableProps = {
  data: { id: string; name: string }[];
};

export default function TableWithDraggableRows({ data }: TableProps) {
  const [rows, setRows] = useState(data);

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    console.log({ result });
    const items = Array.from(rows);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRows(items);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Name</th>
          </tr>
        </thead>
        <Droppable droppableId="table">
          {(provided) => (
            <tbody {...provided.droppableProps} ref={provided.innerRef}>
              {rows.map((row, index) => (
                <Draggable key={row.id} draggableId={row.id} index={index}>
                  {(provided) => (
                    <tr
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="bg-white text-gray-700 border-b hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="py-3 px-6 text-left">{row.name}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
}
