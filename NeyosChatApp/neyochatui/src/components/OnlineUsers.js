import Chat from "./Chat";
import { Button, Form } from "react-bootstrap"
import { useState } from "react";

const OnlineUsers = ({ onlineUsers}) =>
        <div className="user-list">
            <h4>Online Users</h4>
            {onlineUsers.map((u, index) => <h6 key={index}>{u}</h6>)}
        </div>


// {

//     const [isConnected, setIsConnected] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsConnected(true);
//     };

//     return <div>
//         <div className="user-list">
//             <h4>Online Users</h4>
//             {onlineUsers.map((u, index) => <h6 key={index}>{u}

//                 <Form onSubmit={handleSubmit} >
//                     <Button variant="success" type="submit">chat</Button>
//                 </Form>
//             </h6>)}
//         </div>
//         {
//             isConnected ? <Chat messages={messages} sendMessage={sendMessage} closeConnection={closeConnection} users={users} /> : <br></br>
//         }
//     </div>
// }

export default OnlineUsers;
