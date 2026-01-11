// src/data/cityItems.js
// small catalog of purchasable items (endangered included)
const cityItems = [
  {
    id: "tree_oak",
    name: "Oak Tree",
    cost: 50,
    footprintEffect: -2,
    type: "plant",
    endangered: false,
    info: "Oak trees support biodiversity: birds and insects depend on them.",
    img: "/assets/items/tree_oak.png" // optional; put in public/assets/items/
  },
  {
    id: "panda",
    name: "Giant Panda",
    cost: 400,
    footprintEffect: 0,
    type: "animal",
    endangered: true,
    info: "Pandas live mainly on bamboo and are an iconic endangered species.",
    img: "/assets/items/panda.png"
  },
  {
    id: "saola",
    name: "Saola",
    cost: 900,
    footprintEffect: 0,
    type: "animal",
    endangered: true,
    info: "Saola is a rare bovine from Southeast Asia; extremely endangered.",
    img: "/assets/items/saola.png"
  },
  {
    id: "solar_panel",
    name: "Solar Panel",
    cost: 250,
    footprintEffect: -6,
    type: "infrastructure",
    endangered: false,
    info: "Generates clean electricity and reduces carbon emissions.",
    img: "/assets/items/solar_panel.png"
  },
  {
    id: "flower_patch",
    name: "Flower Patch",
    cost: 80,
    footprintEffect: -1,
    type: "plant",
    endangered: false,
    info: "Flower patches boost pollinators and biodiversity.",
    img: "/assets/items/flower_patch.png"
  }
];

export default cityItems;
