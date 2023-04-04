import axios from 'axios'
import {useState} from "react"

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post('https://localhost:7168/Auth/login',null, {
                params: {
                        email: email,
                        password: password
                }
            })

            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm
