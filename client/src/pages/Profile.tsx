import { useState } from "react";
import { User } from "../../../types/src";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}