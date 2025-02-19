import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import { useState } from "react";

const SendMessageForm = ({ sendMessage, recipient }) => {
    const [message, setMessage] = useState("");
    //console.log("Recipient in SendMessageForm:", recipient);
    return <Form
        onSubmit={e => {
            e.preventDefault();
            sendMessage(message, recipient);
            setMessage("");
        }}>
        <InputGroup>
            <div className="input-container">
            <div className="input-grp">
                <FormControl placeholder="message..." onChange={e => setMessage(e.target.value)} value={message} />
            </div>
            <div>
                <button className="input-grp-button" type="submit" disabled={!message} />
            </div>
            </div>
        </InputGroup>
    </Form>

}

export default SendMessageForm;
