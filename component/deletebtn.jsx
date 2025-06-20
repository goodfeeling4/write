"use client"

export default function Deletebtn({id}){
    const remove = async() => {
        const confirmed = confirm("are you sure");
        if(confirmed){

           const res = await fetch(`${process.env.PORT_WRITE || ""}/api/message?id=${id} `, {
                method : "DELETE"
            })
            if(res.ok){
                // router.reload();
                window.location.reload();
            
            }
        }
    }
    
    return (
        <div onClick={ remove}>
        <img width="50" height="50" src="https://img.icons8.com/neon/96/delete.png" alt="delete"/>
        </div>
    );
}