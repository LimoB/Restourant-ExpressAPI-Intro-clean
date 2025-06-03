import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  varchar,
  pgEnum
} from "drizzle-orm/pg-core";

// 🔷 ENUM: Define userType enum
export const roleEnum = pgEnum("userType", ['member', 'admin']);

// 🔹 State Table
export const stateTable = pgTable('stateTable', {
  stateId: serial('stateId').primaryKey(),
  stateName: text('stateName'),
  stateCode: text('stateCode'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// 🔹 City Table
export const cityTable = pgTable('cityTable', {
  cityId: serial('cityId').primaryKey(),
  cityName: text('cityName'),
  stateId: integer('stateId').notNull().references(() => stateTable.stateId, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

// 🔹 Restaurant Table
export const restaurantTable = pgTable('restaurantTable', {
  restaurantId: serial('restaurantId').primaryKey(),
  restaurantName: text('restaurantName'),
  streetAddress: text('streetAddress'),
  zipCode: text('zipCode'),
  cityId: integer('cityId').notNull().references(() => cityTable.cityId, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});


// 🔹 User Table (with userType enum)
export const userTable = pgTable("userTable", {
  userId: serial("userId").primaryKey(),

  fullName: varchar("fullName", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),

  userType: roleEnum("userType").default("member").notNull(),

  // ✅ Nullable by omitting .notNull()
  resetToken: varchar("resetToken", { length: 255 }),
  resetTokenExpiry: timestamp("resetTokenExpiry"),

  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});


// 🔹 Restaurant Owner Table
export const restaurantOwnerTable = pgTable('restaurantOwnerTable', {
  restaurantOwnerId: serial('restaurantOwnerId').primaryKey(),
  restaurantId: integer("restaurantId").notNull().references(() => restaurantTable.restaurantId, { onDelete: 'cascade' }),
  ownerId: integer('ownerId').notNull().references(() => userTable.userId, { onDelete: 'cascade' }),
});

// 🔹 Infer Types
export type TUserInsert = typeof userTable.$inferInsert;
export type TUserSelect = typeof userTable.$inferSelect;

export type TStateInsert = typeof stateTable.$inferInsert;
export type TStateSelect = typeof stateTable.$inferSelect;

export type TCityInsert = typeof cityTable.$inferInsert;
export type TCitySelect = typeof cityTable.$inferSelect;

export type TRestaurantInsert = typeof restaurantTable.$inferInsert;
export type TRestaurantSelect = typeof restaurantTable.$inferSelect;

export type TRestaurantOwnerInsert = typeof restaurantOwnerTable.$inferInsert;
export type TRestaurantOwnerSelect = typeof restaurantOwnerTable.$inferSelect;

// 🔹 Relations

// city → state (one to one)
export const cityStateRelation = relations(cityTable, ({ one }) => ({
  state: one(stateTable, {
    fields: [cityTable.stateId],
    references: [stateTable.stateId]
  })
}));

// state → cities (one to many)
export const stateCityRelation = relations(stateTable, ({ many }) => ({
  cities: many(cityTable)
}));

// restaurant → city (one to one)
export const restaurantCityRelation = relations(restaurantTable, ({ one }) => ({
  city: one(cityTable, {
    fields: [restaurantTable.cityId],
    references: [cityTable.cityId]
  })
}));

// city → restaurants (one to many)
export const cityRestaurantRelation = relations(cityTable, ({ many }) => ({
  restaurants: many(restaurantTable)
}));

// restaurantOwner → user (many to one)
export const restaurantOwnerUserRelation = relations(restaurantOwnerTable, ({ one }) => ({
  user: one(userTable, {
    fields: [restaurantOwnerTable.ownerId],
    references: [userTable.userId]
  })
}));

// user → restaurantOwners (one to many)
export const userRestaurantOwnersRelation = relations(userTable, ({ many }) => ({
  ownedRestaurants: many(restaurantOwnerTable)
}));

// restaurantOwner → restaurant (many to one)
export const restaurantOwnerRestaurantRelation = relations(restaurantOwnerTable, ({ one }) => ({
  restaurant: one(restaurantTable, {
    fields: [restaurantOwnerTable.restaurantId],
    references: [restaurantTable.restaurantId]
  })
}));

// restaurant → owners (one to many)
export const restaurantOwnersRelation = relations(restaurantTable, ({ many }) => ({
  owners: many(restaurantOwnerTable)
}));
