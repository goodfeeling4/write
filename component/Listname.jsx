const getThoughts = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/message", { caches: "no-store", }
        );

        if (!res.ok) {
            throw new Error("failed to fetch thought")

        }
        return res.json();
        console.log(res.json())

    } catch(error) {
        console.log("error loading thoughts:", error);


    }


}

export default async function Listname() {
    let message = [];
    try {
        const data = await getThoughts();
        message = Array.isArray(data?.message) ? data.message : [
            {
            title: "title",
            description: "description"
            }
        ];
    } catch (error) {
        console.log("Error fetching messages:", error);
    }

    return (
        <>
            {message.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">No messages found.</div>
            ) : (
                message.map((m) => (
                    <div key={m._id || m.title} className="flex justify-around border-2 border-black mx-[10vw] bg-gray-200 rounded-md ">
                        <div>
                            <h1>{m.title}</h1>
                            <div>{m.description}</div>
                        </div>
                        <div className="flex gap-8 ">
                            <button>edit</button>
                            <button>delete</button>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}