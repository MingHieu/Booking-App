/*
  Warnings:

  - You are about to drop the `hotelImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "hotelImages" DROP CONSTRAINT "hotelImages_hotelId_fkey";

-- DropTable
DROP TABLE "hotelImages";

-- CreateTable
CREATE TABLE "access_token" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "access_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_images" (
    "id" SERIAL NOT NULL,
    "uri" TEXT NOT NULL,
    "hotelId" INTEGER NOT NULL,

    CONSTRAINT "hotel_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "access_token" ADD CONSTRAINT "access_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_images" ADD CONSTRAINT "hotel_images_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
