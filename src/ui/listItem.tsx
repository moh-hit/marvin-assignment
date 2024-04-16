import Image from "next/image";
import React from "react";
import { useDrag } from "react-dnd";

import listImg from "../../public/listImg.jpeg";

import type { ListItemType } from "@/app/page";
import type { StaticImageData } from "next/image";
import type { FC } from "react";
import type { DragSourceMonitor } from "react-dnd";

const collaboratorImages = [
  require("../../public/collab1.jpg"),
  require("../../public/collab2.jpg"),
];

type Props = ListItemType & {
  onDrop: (item: ListItemType, dropResult: DropResult) => void;
};

export interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  id: string;
}

const Item: FC<Props> = ({
  id,
  name,
  description,
  picture,
  updatedAt,
  collaborators,
  onDrop,
}) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "box",
      item: { id, name, collaborators, updatedAt, description, picture },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult() as DropResult;
        if (dropResult) {
          onDrop(item, dropResult);
        }
      },
    }),
    [id, name],
  );

  return (
    <div
      key={id}
      className="flex flex-row gap-4 items-center justify-between p-2 px-4 w-full rounded-xl bg-white"
      style={{ opacity }}
      ref={drag}
    >
      <div className="flex flex-row gap-4 items-center">
        <div className="relative w-12 h-12 rounded-md overflow-hidden">
          <Image fill src={listImg} alt="folder" layout="fill" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-black">{name}</h1>
          <p className="text-gray-400 text-xs">{description}</p>
        </div>
      </div>
      <p className="text-gray-400 text-[8px]">Updated at: {updatedAt}</p>
      <div className="relative flex flex-row items-center w-20 h-10">
        {collaborators.map((collaborator, i) => {
          const picture = collaboratorImages[i] as StaticImageData;

          return (
            <div
              key={collaborator}
              className="absolute"
              style={{
                left: `${i * 1}rem`,
                zIndex: collaborators.length - i,
              }}
            >
              <div className="relative w-8 h-8 overflow-hidden rounded-full">
                <Image fill src={picture} alt="folder" layout="fill" />
              </div>
            </div>
          );
        })}
        <div className="absolute w-8 h-8 flex justify-center items-center bg-gray-400 rounded-full left-[2rem] -z-2">
          <p className="text-white text-xs">+ 7</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
