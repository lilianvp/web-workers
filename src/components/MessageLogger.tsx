import React from "react";

const MessageLogger = () => {
    const [data, setData] = React.useState([{msg:"",error:""}] as any);


    React.useEffect(() => {
        
        const eventSource = new EventSource('https://dev.platform.tymlez.com/api/v1/energy-sse');
        
        eventSource.onmessage= (e)=> {
            console.log(`New message: ${e.data}`)
            updateMessage(e.data)
        };

        const updateMessage = (message: string) => {
            const parsedMsg = message.split(":");
    
            if (parsedMsg.length === 1)
                parsedMsg[1] = parsedMsg[0];
            const source = parsedMsg.shift();
            const msg = (parsedMsg.length>1)? parsedMsg.join(":"): parsedMsg[0];
    
            switch (source?.toLowerCase()){
            case "error":
                setData([data,{'msg':'', 'error':msg}]);
                break;
            default:   
                setData([data,{'msg':msg, 'error':''}]);
                break;
            }
        };

        }, [data]);
    


    

    return <div className="controls">
        <table>
            <tbody>
            <tr key='labels'>
                    <td>Message</td>
                    <td>Error</td>
            </tr>
        {data.map((p: any, index:number) =>
            <tr key={index}>
                    <td>{p.msg}</td>
                    <td>{p.error}</td>
            </tr>
           )}
           </tbody>
        </table>
    </div>
}

export { MessageLogger }