-- CreateEnum
CREATE TYPE "Stream" AS ENUM ('RO', 'RU');

-- AlterTable: StaticPage — drop old unique on slug, add stream, add composite unique
ALTER TABLE "StaticPage" ADD COLUMN "stream" "Stream" NOT NULL DEFAULT 'RU';
DROP INDEX IF EXISTS "StaticPage_slug_key";
CREATE UNIQUE INDEX "StaticPage_slug_stream_key" ON "StaticPage"("slug", "stream");

-- AlterTable: Sermon
ALTER TABLE "Sermon" ADD COLUMN "stream" "Stream" NOT NULL DEFAULT 'RU';

-- AlterTable: Event — drop old unique on slug, add stream, add composite unique
ALTER TABLE "Event" ADD COLUMN "stream" "Stream" NOT NULL DEFAULT 'RU';
DROP INDEX IF EXISTS "Event_slug_key";
CREATE UNIQUE INDEX "Event_slug_stream_key" ON "Event"("slug", "stream");

-- AlterTable: ScheduleItem
ALTER TABLE "ScheduleItem" ADD COLUMN "stream" "Stream" NOT NULL DEFAULT 'RU';

-- AlterTable: NewsPost — drop old unique on slug, add stream, add composite unique
ALTER TABLE "NewsPost" ADD COLUMN "stream" "Stream" NOT NULL DEFAULT 'RU';
DROP INDEX IF EXISTS "NewsPost_slug_key";
CREATE UNIQUE INDEX "NewsPost_slug_stream_key" ON "NewsPost"("slug", "stream");

-- AlterTable: GalleryAlbum — drop old unique on slug, add stream, add composite unique
ALTER TABLE "GalleryAlbum" ADD COLUMN "stream" "Stream" NOT NULL DEFAULT 'RU';
DROP INDEX IF EXISTS "GalleryAlbum_slug_key";
CREATE UNIQUE INDEX "GalleryAlbum_slug_stream_key" ON "GalleryAlbum"("slug", "stream");

-- AlterTable: ContactSubmission
ALTER TABLE "ContactSubmission" ADD COLUMN "stream" "Stream" NOT NULL DEFAULT 'RU';

-- AlterTable: PrayerRequest
ALTER TABLE "PrayerRequest" ADD COLUMN "stream" "Stream" NOT NULL DEFAULT 'RU';
