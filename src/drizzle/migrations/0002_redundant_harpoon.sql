ALTER TABLE "userTable" ALTER COLUMN "fullName" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "userTable" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "userTable" ALTER COLUMN "password" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "userTable" ADD COLUMN "resetToken" varchar(255);--> statement-breakpoint
ALTER TABLE "userTable" ADD COLUMN "resetTokenExpiry" timestamp;