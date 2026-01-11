// src/components/VirtualCity.jsx
import React, { useEffect, useState } from "react";
import cityItems from "../data/cityItems";
import Shop from "./Shop";
import ItemInfoModal from "./ItemInfoModal";

/**
 * VirtualCity component:
 * - shows an isometric-ish grid
 * - supports dragging from inventory (dataTransfer) or selecting & clicking tile
 * - clicking placed item opens info modal
 * - coins + localStorage persistence
 */

const STORAGE_KEY = "greenpath_city_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(s) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
}

export default function VirtualCity({ gridSize = 5 }) {
  // grid: array length gridSize*gridSize, each slot: null or placed item {id, placedAt, meta}
  const [coins, setCoins] = useState(500);
  const [catalog] = useState(cityItems);
  const [inventory, setInventory] = useState([]); // actual item objects
  const [grid, setGrid] = useState(Array(gridSize * gridSize).fill(null));
  const [selectedItem, setSelectedItem] = useState(null);
  const [infoItem, setInfoItem] = useState(null);
  const [placingItem, setPlacingItem] = useState(null); // for click-to-place

  useEffect(() => {
    const s = loadState();
    if (s) {
      setCoins(s.coins ?? 500);
      setInventory(s.inventory ?? []);
      setGrid(s.grid ?? Array(gridSize * gridSize).fill(null));
    }
  }, [gridSize]);

  useEffect(() => {
    saveState({ coins, inventory, grid });
  }, [coins, inventory, grid]);

  function handleBuy(item) {
    if (coins < item.cost) return alert("Not enough coins");
    setCoins(c => c - item.cost);
    // push a copy into inventory
    setInventory(inv => [...inv, { ...item, uuid: Date.now() + "-" + Math.random() }]);
  }

  function handleSelectInventoryItem(item) {
    // click preview opens modal
    setInfoItem(item);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleTileDrop(index, e) {
    e.preventDefault();
    // first check dataTransfer (drag from inventory)
    let dt = e.dataTransfer.getData("text/plain");
    let itemObj = null;
    try {
      itemObj = dt ? JSON.parse(dt) : null;
    } catch {}
    // If none via drag, maybe placingItem is set (click-to-place)
    if (!itemObj && placingItem) {
      itemObj = placingItem;
      setPlacingItem(null);
      // remove one from inventory by uuid
      setInventory(inv => {
        const idx = inv.findIndex(i => i.uuid === itemObj.uuid);
        if (idx === -1) return inv;
        const newInv = [...inv];
        newInv.splice(idx, 1);
        return newInv;
      });
    } else if (itemObj) {
      // remove from inventory
      setInventory(inv => {
        const idx = inv.findIndex(i => i.uuid === itemObj.uuid);
        if (idx === -1) return inv;
        const newInv = [...inv];
        newInv.splice(idx, 1);
        return newInv;
      });
    } else {
      return;
    }

    // place on grid
    setGrid(g => {
      const ng = [...g];
      ng[index] = { ...itemObj, placedAt: Date.now() };
      return ng;
    });
  }

  function handleTileClick(index) {
    // if placingItem set => place
    if (placingItem) {
      handlePlaceByClick(index, placingItem);
      return;
    }
    // if tile has item => open info
    const slot = grid[index];
    if (slot) setInfoItem(slot);
  }

  function handlePlaceByClick(index, itemObj) {
    // remove item from inventory
    setInventory(inv => {
      const idx = inv.findIndex(i => i.uuid === itemObj.uuid);
      if (idx === -1) return inv;
      const newInv = [...inv];
      newInv.splice(idx, 1);
      return newInv;
    });
    setGrid(g => {
      const ng = [...g];
      ng[index] = { ...itemObj, placedAt: Date.now() };
      return ng;
    });
    setPlacingItem(null);
  }

  function removeItemFromTile(index) {
    setGrid(g => {
      const ng = [...g];
      const it = ng[index];
      if (!it) return ng;
      // return item back to inventory
      setInventory(inv => [...inv, { ...it, uuid: Date.now() + "-" + Math.random() }]);
      ng[index] = null;
      return ng;
    });
  }

  // small helper to render isometric tile
  function renderTile(index) {
    const slot = grid[index];
    return (
      <div
        key={index}
        onDragOver={handleDragOver}
        onDrop={(e) => handleTileDrop(index, e)}
        onClick={() => handleTileClick(index)}
        className="iso-tile"
        role="button"
      >
        <div className="iso-top" />
        <div className="iso-surface">
          {slot ? (
            <div className="placed-item">
              {slot.img ? <img src={slot.img} alt={slot.name} className="w-16 h-16 object-contain" /> : <div className="w-12 h-12 bg-yellow-200" />}
              <div className="text-xs mt-1">{slot.name}</div>
              <button className="text-xs mt-1 underline text-red-600" onClick={(e) => { e.stopPropagation(); removeItemFromTile(index); }}>Remove</button>
            </div>
          ) : (
            <div className="tile-empty text-xs text-gray-400">Empty</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="virtual-city grid gap-6 grid-cols-1 md:grid-cols-3">
      {/* Left: City */}
      <div className="city-panel p-4 bg-white rounded-xl shadow">
        <h3 className="font-semibold mb-3">Virtual City</h3>
        <p className="text-xs text-gray-500 mb-3">Drag items from inventory or click an inventory item then click a tile to place.</p>
        <div className="city-grid">
          {Array.from({ length: grid.length }).map((_, i) => renderTile(i))}
        </div>
      </div>

      {/* Middle: Shop */}
      <div className="p-4">
        <Shop
          catalog={catalog}
          coins={coins}
          onBuy={handleBuy}
          inventory={inventory}
          onSelectInventoryItem={handleSelectInventoryItem}
        />
      </div>

      {/* Right: status & actions */}
      <div className="p-4 bg-white rounded-xl shadow space-y-4">
        <div>
          <h4 className="font-semibold">Coins</h4>
          <div className="text-2xl font-bold">{coins}</div>
          <div className="text-xs text-gray-500 mt-1">Earn coins from quizzes / quests (stubbed)</div>
        </div>

        <div>
          <h4 className="font-semibold">Selected / Place</h4>
          <div className="mt-2">
            <button className="px-3 py-1 bg-blue-600 text-white rounded mr-2" onClick={() => {
              if (!inventory.length) return alert("Buy an item first");
              setPlacingItem(inventory[0]);
              alert(`Click a tile to place: ${inventory[0].name}`);
            }}>Click-to-Place (uses first inventory)</button>

            <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => { setPlacingItem(null); }}>Cancel Place</button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Inventory (click to preview)</h4>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {inventory.length ? inventory.map((it, i) => (
              <div key={it.uuid} role="button" onClick={() => setInfoItem(it)} className="p-2 border rounded flex items-center gap-2 cursor-pointer">
                {it.img ? <img src={it.img} className="w-10 h-10 object-contain" /> : <div className="w-10 h-10 bg-gray-100" />}
                <div className="text-sm">{it.name}</div>
              </div>
            )) : <div className="text-xs text-gray-500">Inventory empty</div>}
          </div>
        </div>

      </div>

      <ItemInfoModal item={infoItem} onClose={() => setInfoItem(null)} />
    </div>
  );
}
