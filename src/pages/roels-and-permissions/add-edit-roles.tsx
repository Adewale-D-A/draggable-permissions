import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { arrayMoveImmutable } from "array-move";
import { useEffect, useState } from "react";

interface props {
  index: number;
  setState: Function;
  type: string;
  available_resources: string[];
  assigned_resources: string[];
  available_label: string;
  assigned_label: string;
}

export default function AddEditRoles({
  index,
  setState,
  type,
  available_resources,
  assigned_resources,
  available_label,
  assigned_label,
}: props) {
  const [dataSource, setDataSource] = useState([]);
  const [dataDestination, setDataDestination] = useState([]);

  useEffect(() => {
    try {
      const results = available_resources.filter(
        (sourceItem) =>
          !assigned_resources.some(
            (destinationItem) => destinationItem === sourceItem
          )
      );
      setDataSource(results ? results : ([] as any));
      setDataDestination(assigned_resources ? assigned_resources : ([] as any));
    } catch (error) {}
  }, [available_resources, assigned_resources]);

  //on chips drag handler
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    try {
      //check if an item is dragged and dropped into same container,
      // if yes, then reorder
      if (source.droppableId === destination.droppableId) {
        //check which container the items is dragged and dropped
        //to reorder that container's items
        if (source.droppableId === "originalList") {
          setDataSource((prevState) => {
            const updatedArray = arrayMoveImmutable(
              prevState,
              source.index,
              destination.index
            );
            return updatedArray;
          });
        } else {
          setDataDestination((prevState) => {
            const updatedArray = arrayMoveImmutable(
              prevState,
              source.index,
              destination.index
            );
            return updatedArray;
          });
        }
      } else {
        //item moved from destination back to source
        if (source.droppableId === "addToList") {
          //update source state
          setDataSource((prevState) => {
            const newArray = [...dataDestination][source.index];
            const updatedArray = [...prevState, newArray];
            return updatedArray;
          });
          //remove from destination array
          setDataDestination((prevState) => {
            let newArray = [...prevState];
            newArray.splice(source.index, 1);
            return newArray;
          });
          //remove from final payload state
          const newArray = [...dataDestination];
          newArray.splice(source.index, 1);
          setState((preState: any) => {
            const deepCopyArray = [...preState];
            const prevArrayPosition = preState[index];
            if (type === "permissions") {
              deepCopyArray.splice(index, 1, {
                id: prevArrayPosition?.id,
                name: prevArrayPosition.name,
                permissions: newArray,
                resources: prevArrayPosition.resources,
                // status: prevArrayPosition?.status,
              });
              return deepCopyArray;
            } else if (type === "resources") {
              deepCopyArray.splice(index, 1, {
                id: prevArrayPosition?.id,
                name: prevArrayPosition.name,
                permissions: prevArrayPosition?.permissions,
                resources: newArray,
                // status: prevArrayPosition?.status,
              });
              return deepCopyArray;
            } else {
              return preState;
            }
          });
          //update payload states
        } else {
          setDataDestination((prevState) => {
            const newArray = [...dataSource][source.index];
            const updatedArray = [...prevState, newArray];
            return updatedArray;
          });
          setDataSource((prevState) => {
            let newArray = [...prevState];
            newArray.splice(source.index, 1);
            return newArray;
          });

          const newArray = [...dataSource][source.index];
          const updatedArray = [...dataDestination, newArray];
          setState((preState: any) => {
            const deepCopyArray = [...preState];
            const prevArrayPosition = preState[index];

            if (type === "permissions") {
              deepCopyArray.splice(index, 1, {
                id: prevArrayPosition?.id,
                name: prevArrayPosition.name,
                permissions: updatedArray,
                resources: prevArrayPosition.resources,
              });
              return deepCopyArray;
            } else if (type === "resources") {
              deepCopyArray.splice(index, 1, {
                id: prevArrayPosition?.id,
                name: prevArrayPosition?.name,
                permissions: prevArrayPosition?.permissions,
                resources: updatedArray,
              });
              return deepCopyArray;
            } else {
              return preState;
            }
          });
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="w-full flex items-start gap-10">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="originalList">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className=" my-5">
              <h5 className=" font-semibold text-2xl pb-3">
                {available_label}
              </h5>
              <div className="bg-gray-400/20 h-36 w-96 overflow-auto flex gap-5 flex-wrap rounded-3xl p-5">
                {dataSource.map((value: any, index: number) => (
                  <Draggable key={value} draggableId={value} index={index}>
                    {(provided, snapshot) => (
                      <span
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={index}
                        className=" text-white bg-primary_green-500 rounded-full px-4 p-2 h-fit"
                      >
                        {value}
                      </span>
                    )}
                  </Draggable>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="addToList">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className=" w-full my-5">
              <h5 className=" font-semibold text-2xl pb-3">{assigned_label}</h5>
              <div className=" bg-gray-400/20 h-36 p-5 rounded-3xl overflow-auto flex gap-5">
                {dataDestination.map((addedItems: any, index: number) => (
                  <Draggable
                    key={addedItems}
                    draggableId={addedItems}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <span
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className=" text-white bg-primary_green-500 rounded-full px-4 p-2 h-fit"
                      >
                        {addedItems}
                      </span>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
