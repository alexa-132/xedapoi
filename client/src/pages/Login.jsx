import styled from "styled-components"
import { mobile } from "../responsive";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5), 
        rgba(255,255,255,0.5)
    ), 
    url("https://th.bing.com/th/id/R.d942504e0c8280feafd9d0a177fbf9d9?rik=dbNjBAvHyVg6PQ&pid=ImgRaw&r=0") center;

    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({width: "75%"})}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex:1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    width: 40%;
    padding: 15px 20px;
    background-color: #d2ff02;
    cursor: pointer;
    margin: 5px 0px;
&:disabled{
    color: green;
    cursor: not-allowed;
}

&:hover{
    background-color: #ccc7dc;
}
`;

const Link = styled.a`
    margin: 5px 0px;
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
    
&:hover{
    color: #93b201;
}
`;

const Error = styled.span`
 color: red;;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const user = {username, password};
    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch,user)
    };

  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleClick} disabled={isFetching}>
                    LOGIN
                </Button>
                {error && <Error>Something went wrong...</Error>}
                <Link>FORGET YOUR PASSWORD?</Link>
                <Link>CREATE A NEW ACCOUNT</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login