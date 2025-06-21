"use client"

export default function Deletebtn({id}){
    const remove = async() => {
        const confirmed = confirm("are you sure");
        if(confirmed){

           const res = await fetch(`${process.env.PORT_WRITE || ""}/api/message?id=${id} `, {
                method : "DELETE"
            })
            if(res.ok){
                window.location.reload();
            
            }
        }
    }
    
    return (
        <div onClick={ remove}>
        <img className=" sm:min-w-10 sm:min-h-10 sm:max-w-10 sm:max-h-10 min-w-8 min-h-8 max-w-8 max-h-8" src="https://img.icons8.com/neon/96/delete.png" alt="delete"/>
        </div>
    );
}