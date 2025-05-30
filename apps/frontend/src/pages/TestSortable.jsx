import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";

export default function TestSortable() {
  const [items, setItems] = useState(["1", "2", "3", "4"]);
  const listRef = useRef(null);

  useEffect(() => {
    const sortable = Sortable.create(listRef.current, {
      animation: 150,
      onEnd: (evt) => {
        const newItems = [...items];
        const [movedItem] = newItems.splice(evt.oldIndex, 1);
        newItems.splice(evt.newIndex, 0, movedItem);
        setItems(newItems);
      },
    });

    return () => sortable.destroy();
  }, [items]);

  return (
    <div style={{ padding: 20 }}>
      <div ref={listRef}>
        {items.map((item, index) => (
          <div
            key={item}
            style={{
              padding: "15px",
              marginBottom: "8px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "#f4f4f4",
              textAlign: "center",
              cursor: "grab",
            }}
          >
            Élément {item}
          </div>
        ))}
      </div>
    </div>
  );
}
