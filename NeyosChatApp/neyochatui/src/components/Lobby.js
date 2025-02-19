import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const Lobby = () => {

    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    const [connection, setConnection] = useState();
    const [onlineUsers, setOnlineUsers] = useState([]);

    const joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7085/chat", {
                    withCredentials: true,
                })
                .configureLogging(LogLevel.Information)
                .build();

            connection.onclose(e => {
                setConnection();
                setOnlineUsers([]);
            })

            await connection.start();
            await connection.invoke("JoinRoom", {user, room});
            setConnection(connection);
        }
        catch (e) {
            console.log(e);
        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }

    return <div>
        <Form className="lobby"
            onSubmit={e => {
                e.preventDefault();
                joinRoom(user, room);
            }} >
            <Form.Group>
                <Form.Control placeholder="Name" onChange={e => setUser(e.target.value)} />
                <Form.Control placeholder="Room" onChange={e => setRoom(e.target.value)} />
            </Form.Group>
            <Button variant="success" type="submit" disabled={!user || !room}>Join</Button>
        </Form>
    </div>
}

export default Lobby;