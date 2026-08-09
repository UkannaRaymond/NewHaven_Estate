import { FaBuilding, FaHome, FaWarehouse, FaStore } from "react-icons/fa";

import {
  LuBuilding2,
  LuLandPlot,
  LuHotel,
  LuTrees,
  LuHousePlus,
} from "react-icons/lu";

export const propertyTypes = [
  {
    label: "House",
    icon: FaHome,
    slug: "home",
  },
  {
    label: "Apartment",
    icon: FaBuilding,
    slug: "apartment",
  },
  {
    label: "Villa",
    icon: LuHousePlus,
    slug: "villa",
  },
  {
    label: "Penthouse",
    icon: LuBuilding2,
    slug: "penthouse",
  },
  {
    label: "Townhouse",
    icon: LuTrees,
    slug: "townhouse",
  },
  {
    label: "Commercial",
    icon: FaStore,
    slug: "commercial",
  },
  {
    label: "Office",
    icon: LuBuilding2,
    slug: "office",
  },
  {
    label: "Warehouse",
    icon: FaWarehouse,
    slug: "warehouse",
  },
  {
    label: "Hotel",
    icon: LuHotel,
    slug: "hotel",
  },
  {
    label: "Land",
    icon: LuLandPlot,
    slug: "land",
  },
];
