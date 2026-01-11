// src/components/ItemInfoModal.jsx
import React from "react";

export default function ItemInfoModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-60 w-96 shadow-lg">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <button onClick={onClose} className="text-gray-500">✖</button>
        </div>
        <div className="mt-4 flex gap-4">
          {item.img ? <img src={item.img} className="w-24 h-24 object-contain" alt={item.name} /> : <div className="w-24 h-24 bg-gray-100" />}
          <div>
            <p className="text-sm text-gray-700">{item.info}</p>
            <p className="mt-2 text-xs text-gray-500">Cost: {item.cost}</p>
            {item.endangered && <p className="mt-2 text-sm text-red-600 font-semibold">Endangered species — special item</p>}
          </div>
        </div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-200">Close</button>
        </div>
      </div>
    </div>
  );
}
