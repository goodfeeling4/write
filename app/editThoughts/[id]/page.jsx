import Editform from "@/component/editform";

const getThoughtById = async (id) => {
    try {
        const res = await fetch(`${process.env.PORT_WRITE || ""}/api/message/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch thought");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export default async function Page({ params }) {
    const { id } = params;
    const thought = await getThoughtById(id);

    if (!thought) {
        return <div>Thought not found.</div>;
    }
    
    const { title, description } = thought;

    return (
        <div>
            <Editform id={id} oldTitle={title} oldDescription={description} />
        </div>
    )
}