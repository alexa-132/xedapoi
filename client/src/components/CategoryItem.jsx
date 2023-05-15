import styled from "styled-components";
import { mobile } from "../responsive";
import {Link} from "react-router-dom"

const Container = styled.div`
  flex: 1;
  margin: 20px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
  ${mobile({ height: "20vh" })}
  border: 3px solid #f9e1e5;
  background-color: #f9e1e5;

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
    color:black;
    margin-top: 10px;
    font-weight: 350;
    /* background-color: rgba(186, 186, 186,0.6); */
`;

const Button = styled.button`
    padding: 10px;
    background-color: white;
    color: #2e3034;
    cursor: pointer;
    margin-top: 430px;
    
    &:hover{
      background-color: #6e9573;
      color: white;
    }

`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Link to = {`/products/${item.cat}`}>
        <Button>
          MUA NGAY
        </Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;
