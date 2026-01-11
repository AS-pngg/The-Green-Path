/*
GreenPath — Starter App (single-file React component)

WHAT THIS FILE IS
- A beginner-friendly, single-file React starter (default export) you can paste into src/App.jsx
- Demonstrates core MVP features for a 24-hour build: Carbon Meter, Quiz engine, Shop & items, simple Virtual City placement, Tier settings, Points & Achievements.
- Uses localStorage for persistence so you can run without a backend immediately.
- Includes commented notes showing how to replace localStorage with Supabase (auth, DB, storage) and a small SQL schema example for Supabase.

HOW TO USE (quick summary)
1. Create a new Vite React app: (see README in this canvas for full commands)
   - `npm create vite@latest green-path -- --template react`
   - `cd green-path`
   - Install deps: `npm install` and set up Tailwind (instructions in comments below)
2. Replace src/App.jsx with the contents of this file.
3. Start: `npm run dev` and open http://localhost:5173
4. When ready, follow the Supabase comments to wire up authentication and persistence.

NOTES
- Pixel style tips: include a pixel font like "Press Start 2P" from Google Fonts in index.html, and set images' CSS to `image-rendering: pixelated`.
- The code is deliberately simple: state logic is visible and easy to change. Replace localStorage bits with Supabase calls when comfortable.

--------------------
*/

import React, { useEffect, useState } from 'react'
export default function Game({ user }) {
  const [name, setName] = useState(user?.name || 'Player')
  // ... rest of your game state
}

// ---------- Tier configuration (matches your spec) ----------
const tierConfigs = {
  Easy: { age: '8-11', footprintThreshold: 50, correctDelta: -5, wrongDelta: +3, levelPoints: 100 },
  Medium: { age: '12-14', footprintThreshold: 50, correctDelta: -7, wrongDelta: +5, levelPoints: 150 },
  Hard: { age: '15-18', footprintThreshold: 40, correctDelta: -10, wrongDelta: +7, levelPoints: 200 },
  Expert: { age: '19-22', footprintThreshold: 30, correctDelta: -12, wrongDelta: +10, levelPoints: 250 },
}

// ---------- Sample quiz data (starter) ----------
const sampleQuizzes = {
  Easy: [
    { id: 1, q: 'Which item can you recycle?', options: ['Glass bottle', 'Banana peel', 'Plastic bag with food'], answer: 0 },
    { id: 2, q: 'Planting trees helps by:', options: ['Increasing carbon', 'Absorbing CO2', 'Making soil worse'], answer: 1 },
  ],
  Medium: [
    { id: 1, q: 'What reduces water waste?', options: ['Leaving tap on', 'Fixing leaks', 'Washing full loads only sometimes'], answer: 1 },
  ],
  Hard: [
    { id: 1, q: 'Which energy is renewable?', options: ['Coal', 'Solar', 'Natural gas'], answer: 1 },
  ],
  Expert: [
    { id: 1, q: 'Carbon capture units primarily:', options: ['Increase emissions', 'Store CO2', 'Create methane'], answer: 1 },
  ],
}

// ---------- Starter shop items ----------
const starterItems = [
  { id: 'tree', name: 'Tree', cost: 50, footprintEffect: -2, img: null },
  { id: 'solar', name: 'Solar Panel', cost: 150, footprintEffect: -6, img: null },
  { id: 'wind', name: 'Wind Turbine', cost: 200, footprintEffect: -8, img: null },
  { id: 'panda', name: 'Panda Statue', cost: 300, footprintEffect: 0, img: null },
]

// ---------- Utilities for persistence ----------
const STORAGE_KEY = 'greenpath_user_v1'
function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}
function saveStored(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
}

// ---------- Main App ----------
export default function App() {
  // Basic user/profile state
  const [name, setName] = useState('Player')
  const [tier, setTier] = useState('Easy')
  const [footprint, setFootprint] = useState(60) // higher is worse
  const [points, setPoints] = useState(0)
  const [inventory, setInventory] = useState([])
  const [cityTiles, setCityTiles] = useState(createEmptyCity())
  const [achievements, setAchievements] = useState([])
  const [quizIndex, setQuizIndex] = useState(0)
  const [message, setMessage] = useState('Welcome to The Green Path!')

  useEffect(() => {
    // Load saved state if present
    const stored = loadStored()
    if (stored) {
      setName(stored.name || 'Player')
      setTier(stored.tier || 'Easy')
      setFootprint(stored.footprint ?? 60)
      setPoints(stored.points ?? 0)
      setInventory(stored.inventory ?? [])
      setCityTiles(stored.cityTiles ?? createEmptyCity())
      setAchievements(stored.achievements ?? [])
    }
  }, [])

  useEffect(() => {
    // Persist whenever important bits change
    saveStored({ name, tier, footprint, points, inventory, cityTiles, achievements })
  }, [name, tier, footprint, points, inventory, cityTiles, achievements])

  // Tier config
  const cfg = tierConfigs[tier]

  // Answer a quiz question
  function answerQuestion(isCorrect) {
    const delta = isCorrect ? cfg.correctDelta : cfg.wrongDelta
    const newFoot = Math.max(0, footprint + delta)
    setFootprint(newFoot)

    // Award points when correct
    if (isCorrect) {
      const pts = Math.round(cfg.levelPoints / 5)
      setPoints(p => p + pts)
      setMessage(`Nice! ${isCorrect ? 'Correct' : 'Oops'} — ${delta} to footprint.`)
    } else {
      setMessage(`Oops! That added ${Math.abs(delta)} to your footprint.`)
    }

    // Achievement: first correct
    if (isCorrect && !achievements.includes('Eco Starter')) {
      setAchievements(a => [...a, 'Eco Starter'])
    }

    // Next quiz
    setQuizIndex(i => i + 1)
  }

  // Buy item from shop
  function buyItem(item) {
    if (points < item.cost) {
      setMessage('Not enough points — try quizzes or quests!')
      return
    }
    setPoints(p => p - item.cost)
    setInventory(inv => [...inv, item.id])
    setFootprint(f => Math.max(0, f + item.footprintEffect))
    setMessage(`${item.name} purchased!`)
  }

  // Place item in city grid by index
  function placeItem(tileIndex, itemId) {
    if (!inventory.includes(itemId)) {
      setMessage('You do not own that item. Buy it first.')
      return
    }
    const tile = cityTiles[tileIndex]
    if (tile) {
      setMessage('Tile already occupied — try another one.')
      return
    }
    const newTiles = [...cityTiles]
    newTiles[tileIndex] = itemId
    setCityTiles(newTiles)
    // Remove one from inventory
    const invCopy = [...inventory]
    const idx = invCopy.indexOf(itemId)
    invCopy.splice(idx, 1)
    setInventory(invCopy)
    setMessage(`Placed ${itemId} on the map.`)
  }

  // Check level clear (footprint below threshold)
  const levelClear = footprint <= cfg.footprintThreshold

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 font-sans p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">🌿 The Green Path — Starter</h1>
          <div className="text-sm">
            <div>Player: <input className="border px-2 py-1 rounded ml-2" value={name} onChange={e=>setName(e.target.value)} /></div>
            <div className="mt-1">Tier:
              <select className="ml-2 border px-2 py-1 rounded" value={tier} onChange={e=>setTier(e.target.value)}>
                {Object.keys(tierConfigs).map(t=> <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Carbon Meter & Quiz */}
        <section className="col-span-2 bg-white rounded-2xl p-4 shadow">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-semibold">Carbon Footprint</h2>
              <p className="text-xs text-gray-600">Lower is better. Threshold for {tier}: {cfg.footprintThreshold}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-mono">Footprint: {footprint}</div>
              <div className="text-sm">Points: {points}</div>
            </div>
          </div>

          <CarbonMeter value={footprint} threshold={cfg.footprintThreshold} />

          <div className="mt-4">
            <QuizSection
              tier={tier}
              index={quizIndex}
              onAnswer={answerQuestion}
            />
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Virtual City</h3>
            <p className="text-xs text-gray-600">Click a shop item, then click a tile to place it.</p>
            <VirtualCity tiles={cityTiles} onPlace={placeItem} />
          </div>

          <div className="mt-4">
            {levelClear ? (
              <div className="rounded p-3 bg-green-50 border border-green-200">Level cleared! You kept the footprint below the threshold — reward: {cfg.levelPoints} points.</div>
            ) : (
              <div className="rounded p-3 bg-yellow-50 border border-yellow-200">Keep going — lower the footprint to reach the threshold.</div>
            )}
          </div>

        </section>

        {/* Right: Shop and Achievements */}
        <aside className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-semibold">Shop</h3>
          <div className="mt-2 grid grid-cols-1 gap-2">
            {starterItems.map(it => (
              <div key={it.id} className="flex items-center justify-between border rounded p-2">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs text-gray-600">Cost: {it.cost} • Effect: {it.footprintEffect}</div>
                </div>
                <button className="px-3 py-1 rounded bg-green-600 text-white" onClick={()=>buyItem(it)}>Buy</button>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Inventory</h4>
            <div className="text-xs text-gray-600">Owned items: {inventory.length}</div>
            <ul className="mt-2 list-disc pl-6 text-sm">
              {inventory.map((id, i) => <li key={i}>{id}</li>)}
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Achievements</h4>
            <ul className="mt-2 list-disc pl-6 text-sm">
              {achievements.length ? achievements.map((a,i)=><li key={i}>{a}</li>) : <li className="text-xs text-gray-500">No achievements yet</li>}
            </ul>
          </div>

          <div className="mt-6 text-sm text-gray-700">Message:
            <div className="mt-2 p-2 bg-gray-50 border rounded">{message}</div>
          </div>

        </aside>

      </main>

      <footer className="max-w-6xl mx-auto mt-6 text-center text-xs text-gray-500">Starter app — replace localStorage with Supabase for persistence, and add auth/teacher tools when ready.</footer>
    </div>
  )
}

// ---------- Helper components ----------
function CarbonMeter({ value, threshold }) {
  const pct = Math.max(0, Math.min(100, 100 - (value / Math.max(1, threshold)) * 100))
  const colorClass = value <= threshold ? 'from-green-400 to-green-600' : 'from-red-400 to-yellow-400'
  return (
    <div className="w-full mt-2">
      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
        <div className={`h-6 rounded-full bg-gradient-to-r ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  )
}

function QuizSection({ tier, index, onAnswer }) {
  const quizzes = sampleQuizzes[tier] || []
  const q = quizzes[index % Math.max(1, quizzes.length)]
  if (!q) return <div>No quizzes for this tier yet.</div>
  return (
    <div className="mt-4 border rounded p-3 bg-gray-50">
      <div className="font-medium">Quiz: {q.q}</div>
      <div className="mt-2 grid gap-2">
        {q.options.map((opt, i) => (
          <button key={i} className="text-left border rounded p-2" onClick={() => onAnswer(i === q.answer)}>{opt}</button>
        ))}
      </div>
    </div>
  )
}

function VirtualCity({ tiles, onPlace }) {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-5 gap-2">
        {tiles.map((t, idx) => (
          <div key={idx} onClick={() => onPlace(idx, window.__selectedShopItem)} className="h-20 bg-white border rounded flex items-center justify-center text-xs cursor-pointer">
            {t ? <div>{t}</div> : <div className="text-gray-400">Empty</div>}
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-600">Tip: Click a shop item (Buy) then click a tile to place it.</div>
    </div>
  )
}

function createEmptyCity() {
  return new Array(10).fill(null)
}

/*
-----------------------------
SUPABASE INTEGRATION (COMMENTED GUIDE)
-----------------------------
- Install: `npm i @supabase/supabase-js`
- Create client at top of file:

import { createClient } from '@supabase/supabase-js'
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

- Replace localStorage read/write with supabase.from('profiles').select/upsert to persist per-user state.
- Use supabase.auth for sign-up/login flows (teacher accounts vs student accounts can be flagged in profiles table).

SAMPLE SUPABASE TABLES (run in SQL editor):

-- Profiles: stores per-user game state
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  tier text,
  footprint int,
  points int,
  inventory jsonb,
  city_state jsonb,
  achievements jsonb,
  created_at timestamptz default now()
);

-- Items (shop catalog)
create table items (
  id text primary key,
  name text,
  cost int,
  footprint_effect int,
  metadata jsonb
);

-- Quests table, submissions stored as rows, teacher verifies
create table quests (
  id serial primary key,
  title text,
  description text,
  tier text,
  points int,
  footprint_change int
);

create table quest_submissions (
  id serial primary key,
  quest_id int references quests(id),
  user_id uuid references auth.users,
  proof_url text,
  status text default 'pending',
  created_at timestamptz default now()
);

-----------------------------
NEXT STEPS YOU CAN DO IMMEDIATELY
-----------------------------
1. Run the starter app locally. Explore the code and tweak numbers (footprint deltas, points, shop items).
2. Add more quizzes to sampleQuizzes and more items to starterItems.
3. When comfortable, wire up Supabase for auth and persistence (follow commented guide above).
4. Swap local pixel art placeholders for real sprites and add CSS `image-rendering: pixelated` and pixel font.

Have fun! Open this file in the canvas editor to copy-paste into your project. If you'd like, I can:
- Turn this into a multi-file repo scaffold (index.html, src/App.jsx, src/components/*, tailwind.config.js)
- Add Supabase-auth wiring and SQL that you can paste into the Supabase SQL editor
- Generate pixel art placeholders for specific animals or items
*/

