// src/components/Shop.jsx
import React from "react";

export default function Shop({ catalog = [], coins, onBuy, inventory, onSelectInventoryItem }) {
  return (
    <div className="shop p-4 bg-white rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3">Shop</h3>
      <div className="space-y-3 max-h-64 overflow-auto">
        {catalog.map(item => (
          <div key={item.id} className="flex items-center justify-between border rounded p-2">
            <div className="flex items-center gap-3">
              {item.img ? (
                <img src={item.img} alt={item.name} className="w-12 h-12 object-contain" />
              ) : (
                <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-xs">{item.name.split(" ")[0]}</div>
              )}
              <div>
                <div className="font-medium">{item.name} {item.endangered && <span className="text-xs px-1 bg-red-200 text-red-800 rounded">Endangered</span>}</div>
                <div className="text-xs text-gray-500">Cost: {item.cost} • Effect: {item.footprintEffect}</div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                className={`px-3 py-1 rounded ${coins >= item.cost ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"}`}
                onClick={() => onBuy(item)}
                disabled={coins < item.cost}
              >
                Buy
              </button>

              <button
                className="text-xs text-blue-600 underline"
                onClick={() => onSelectInventoryItem && onSelectInventoryItem(item)}
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-semibold">Inventory</h4>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {inventory.length ? inventory.map((it, idx) => (
            <div key={idx}
                 draggable
                 onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify(it))}
                 className="inventory-item p-2 border rounded flex flex-col items-center text-xs cursor-grab"
                 title={`Drag to place: ${it.name}`}
            >
              {it.img ? <img src={it.img} alt={it.name} className="w-14 h-14 object-contain" /> : <div className="w-12 h-12 bg-gray-100 rounded" />}
              <div className="mt-1">{it.name}</div>
            </div>
          )) : <div className="text-xs text-gray-500">No items yet</div>}
        </div>
      </div>
    </div>
  );
}
