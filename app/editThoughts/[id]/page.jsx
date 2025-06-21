import Editform from "@/component/editform";

const getThoughtById = async (id) => {
    try {
        // Validate ID format (MongoDB ObjectId is 24 characters)
        if (!id || id.length !== 24) {
            throw new Error("Invalid thought ID");
        }

        const res = await fetch(`${process.env.PORT_WRITE || "http://localhost:3000"}/api/message/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            if (res.status === 404) {
                throw new Error("Thought not found");
            }
            throw new Error("Failed to fetch thought");
        }

        const data = await res.json();
        
        // Check if thought exists
        if (!data || !data._id) {
            throw new Error("Thought not found");
        }

        return data;
    } catch (error) {
        console.error("Error fetching thought:", error);
        return null;
    }
};

export default async function Page({ params }) {
    try {
        const { id } = await params;
        
        // Validate params
        if (!id) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-red-500 text-xl">Invalid thought ID</div>
                </div>
            );
        }

        const thought = await getThoughtById(id);

        if (!thought) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-red-500 text-xl">Thought not found</div>
                </div>
            );
        }
        
        const { title, description } = thought;

        return (
            <div>
                <Editform id={id} oldTitle={title} oldDescription={description} />
            </div>
        );
    } catch (error) {
        console.error("Error in edit page:", error);
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-xl">Something went wrong</div>
            </div>
        );
    }
}