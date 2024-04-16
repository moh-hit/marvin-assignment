import Image from "next/image";
import React, { memo } from "react";
import { useDrop } from "react-dnd";

import type { FolderType } from "@/app/page";
import type { StaticImageData } from "next/image";
import type { FC } from "react";
import type { DropTargetMonitor } from "react-dnd";

const folderImages = [
  require("../../public/folder-close.svg"),
  require("../../public/folder-open.svg"),
];

type Props = FolderType & {
  isActive: boolean;
  onOpenFolder: (id: string) => void;
};

const Folder: FC<Props> = ({ id, name, onOpenFolder, isActive }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({
      id,
    }),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: !isActive && monitor.canDrop(),
    }),
  }));

  const icon = (
    isActive ? folderImages[1] : folderImages[0]
  ) as StaticImageData;

  console.log({ canDrop, id });
  return (
    <div
      ref={drop}
      className={`flex flex-row gap-4 items-center cursor-pointer p-2 px-4 w-full rounded-md ${isActive ? "text-black bg-slate-200" : "text-gray-400 "} ${canDrop ? "bg-green-400 text-white" : "text-black bg-slate-200"}`}
      onClick={() => onOpenFolder(id)}
      role="button"
      onKeyDown={() => onOpenFolder(id)}
      tabIndex={0}
    >
      <div className="relative w-6 h-6">
        <Image fill src={icon} alt="folder" layout="fill" />
      </div>
      <h1 className="font-semibold">{name}</h1>
    </div>
  );
};

const areEqual = (prevProps: Props, nextProps: Props) =>
  prevProps.isActive === nextProps.isActive;

export default memo(Folder, areEqual);
