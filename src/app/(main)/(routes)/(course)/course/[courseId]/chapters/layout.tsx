const CourseChapterLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="flex h-full flex-col">
            {children}
        </main>
    );
}
 
export default CourseChapterLayout;