-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('FILE', 'FOLDER');

-- CreateEnum
CREATE TYPE "PermissionRole" AS ENUM ('VIEWER', 'COMMENTER', 'EDITOR', 'OWNER');

-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('USER', 'GROUP');

-- CreateEnum
CREATE TYPE "ActivityAction" AS ENUM ('CREATE', 'RENAME', 'MOVE', 'EDIT', 'DETELE', 'RESTORE', 'SHARE', 'UNSHARE', 'DOWNLOAD', 'UPLOAD_VERSION');
