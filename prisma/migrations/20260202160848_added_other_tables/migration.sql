-- CreateEnum
CREATE TYPE "WatchlistStatus" AS ENUM ('PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED');

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT,
    "releaseYear" INTEGER NOT NULL,
    "genres" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "runtime" INTEGER NOT NULL,
    "posterUrl" TEXT,
    "createdBy" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchlistItem" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "status" "WatchlistStatus" NOT NULL DEFAULT 'PLANNED',
    "rating" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WatchlistItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WatchlistItem" ADD CONSTRAINT "WatchlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchlistItem" ADD CONSTRAINT "WatchlistItem_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
