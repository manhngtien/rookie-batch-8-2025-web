import type { Asset } from "../types/Asset";

export const assets: Asset[] = [
  {
    assetCode: "AST001",
    assetName: "Laptop",
    specification: "Core i5, 8GB RAM, 256GB SSD",
    type: 1,
    location: 1,
    installedDate: new Date("2020-04-10"),
    category: { id: 1, prefix: "LAP", categoryName: "Electronics", total: 10 },
    state: "Available",
    assignments: [],
  },
  {
    assetCode: "AST002",
    assetName: "Projector",
    specification: "1080p, 3000 lumens",
    type: 2,
    location: 2,
    installedDate: new Date("2019-06-15"),
    category: { id: 2, prefix: "PROJ", categoryName: "Equipment", total: 5 },
    state: "Assigned",
    assignments: [
      {
        id: 1,
        stateDate: new Date("2019-10-12"),
        note: "Assigned for meeting room",
        assetCode: "AST002",
        assignedBy: "binhhv",
        assignedTo: "hungtv1",
        returnDate: new Date("2019-03-07"),
      },
    ],
  },
  {
    assetCode: "AST003",
    assetName: "Desk",
    specification: "Wooden, 120x60cm",
    type: 3,
    location: 3,
    installedDate: new Date("2021-01-20"),
    category: { id: 3, prefix: "DESK", categoryName: "Furniture", total: 15 },
    state: "Available",
    assignments: [],
  },
];
