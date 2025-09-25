-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Progresso" (
    "id" SERIAL NOT NULL,
    "modulo" TEXT NOT NULL,
    "aulas" INTEGER NOT NULL,
    "quiz" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Progresso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Progresso" ADD CONSTRAINT "Progresso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
