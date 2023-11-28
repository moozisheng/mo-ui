import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core/dist/types/index';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { useMemoizedFn } from 'ahooks';
import { Tag } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import React, { useEffect, useState } from 'react';
import { DragTagProps, DraggableTagProps, Item } from './interface';

const DraggableTag: React.FC<DraggableTagProps> = (props) => {
  const { tag, ...rest } = props;
  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: tag.id });

  const commonStyle = {
    cursor: 'move',
    transition: 'unset', // Prevent element from shaking after drag
  };

  const style = transform
    ? {
        ...commonStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging ? 'unset' : transition, // Improve performance/visual effect when dragging
      }
    : commonStyle;

  return (
    <Tag style={style} ref={setNodeRef} {...listeners} {...rest}>
      {tag.text}
    </Tag>
  );
};

const DragTag: React.FC<DragTagProps> = (props: DragTagProps) => {
  // 排除掉 onClose , closeIcon , closable 三个属性
  const {
    className,
    style,
    items: itemDatas,
    onChange,
    onClose,
    closeIcon,
    closable,
    ...rest
  } = props as any;

  useEffect(() => {
    setItems(itemDatas);
  }, []);

  const [items, setItems] = useState<Item[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = useMemoizedFn((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const tempData = cloneDeep(items);
      const oldIndex = tempData.findIndex((item) => item.id === active.id);
      const newIndex = tempData.findIndex((item) => item.id === over.id);
      const newData = arrayMove(tempData, oldIndex, newIndex);

      setItems(newData);
      onChange?.(newData);
    }
  });

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        {items.map((item) => (
          <DraggableTag tag={item} key={item.id} {...rest} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DragTag;
