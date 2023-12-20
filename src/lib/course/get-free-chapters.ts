import { Chapter } from "@prisma/client";

export const getFreeChapters = (chapters: Chapter[]): Chapter[] => {
    return chapters.filter((chapter) => chapter.isFree);
};
