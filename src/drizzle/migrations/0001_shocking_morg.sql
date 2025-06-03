CREATE TYPE "public"."userType" AS ENUM('member', 'admin');--> statement-breakpoint
ALTER TABLE "userTable" ADD COLUMN "userType" "userType" DEFAULT 'member' NOT NULL;