"use client";

import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Folder from "@/ui/folder";
import Item from "@/ui/listItem";

import type { DropResult } from "@/ui/listItem";

export type ListItemType = {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  picture: string;
  collaborators: string[];
};

export type FolderType = {
  id: string;
  name: string;
  description: string;
  items: ListItemType[];
};

const Home = () => {
  const [data, setData] = useState<FolderType[]>([]);

  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  useEffect(() => {
    setData([
      {
        id: "1",
        name: "List 1",
        description: "Description 1",
        items: [
          {
            id: "11",
            name: "Item 11",
            description: "Description 1",
            updatedAt: "2021-10-10",
            picture: "https://via.placeholder.com/150",
            collaborators: ["Collaborator 1", "Collaborator 2"],
          },
          {
            id: "12",
            name: "Item 12",
            description: "Description 2",
            updatedAt: "2021-10-10",
            picture: "https://via.placeholder.com/150",
            collaborators: ["Collaborator 1", "Collaborator 2"],
          },
          {
            id: "13",
            name: "Item 13",
            description: "Description 3",
            updatedAt: "2021-10-10",
            picture: "https://via.placeholder.com/150",
            collaborators: ["Collaborator 1", "Collaborator 2"],
          },
          {
            id: "14",
            name: "Item 14",
            description: "Description 4",
            updatedAt: "2021-10-10",
            picture: "https://via.placeholder.com/150",
            collaborators: ["Collaborator 1", "Collaborator 2"],
          },
        ],
      },
      {
        id: "2",
        name: "List 2",
        description: "Description 2",
        items: [
          {
            id: "21",
            name: "Item 21",
            description: "Description 1",
            updatedAt: "2021-10-10",
            picture: "https://via.placeholder.com/150",
            collaborators: ["Collaborator 1", "Collaborator 2"],
          },
          {
            id: "22",
            name: "Item 22",
            description: "Description 2",
            updatedAt: "2021-10-10",
            picture: "https://via.placeholder.com/150",
            collaborators: ["Collaborator 1", "Collaborator 2"],
          },
          {
            id: "23",
            name: "Item 23",
            description: "Description 3",
            updatedAt: "2021-10-10",
            picture: "https://via.placeholder.com/150",
            collaborators: ["Collaborator 1", "Collaborator 2"],
          },
          {
            id: "24",
            name: "Item 24",
            description: "Description 4",
            updatedAt: "2021-10-10",
            picture: "https://via.placeholder.com/150",
            collaborators: ["Collaborator 1", "Collaborator 2"],
          },
        ],
      },
    ]);
  }, []);

  const onOpenFolder = (id: string) => {
    setActiveFolder(id);
  };

  const onDropItem = (item: ListItemType, dropResult: DropResult) => {
    // move item to folder and remove from previous folder

    const newData = [...data];

    const sourceFolder = newData.find((folder) =>
      folder.items.some((i) => i.id === item.id),
    );

    const targetFolder = newData.find((folder) => folder.id === dropResult.id);

    if (sourceFolder && targetFolder) {
      const itemIndex = sourceFolder.items.findIndex((i) => i.id === item.id);

      const [removedItem] = sourceFolder.items.splice(itemIndex, 1);

      targetFolder.items.push(removedItem);

      setData(newData);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="flex w-screen h-screen flex-col items-center bg-hero bg-center bg-no-repeat bg-cover">
        <div className="flex flex-1 flex-row lg:gap-20 z-10 max-w-5xl w-full h-screen justify-start pt-8 lg:pt-24">
          <div className="w-1/4 flex flex-col gap-4">
            {data.map((folder) => {
              const isActive = activeFolder === folder.id;

              return (
                <Folder
                  key={folder.id}
                  {...folder}
                  isActive={isActive}
                  onOpenFolder={onOpenFolder}
                />
              );
            })}
          </div>
          <div className="w-3/4 flex flex-col gap-4">
            {data
              .find((folder) => folder.id === activeFolder)
              ?.items.map((item) => (
                <Item key={item.id} {...item} onDrop={onDropItem} />
              ))}
          </div>
        </div>
      </main>
    </DndProvider>
  );
};

export default Home;
