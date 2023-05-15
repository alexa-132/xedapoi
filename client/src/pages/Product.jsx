import styled from "styled-components"
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";


const Container = styled.div`

`;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({padding: "10px", flexDirection: "column"})}
`;
const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({height: "40vh"})}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({padding: "10px"})}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 250;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({width: "100%"})}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-left: ${(props) => props.type === "size" && "10px"};
`;

const FilterColorOption = styled.option`
  /* border: 1px solid gray;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props=>props.color};
  margin: 0px 8px;
  cursor: pointer; */
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  border-radius: 3px;
`;

const FilterColor = styled.select`
  margin-left: 10px;
  padding: 5px;
  border-radius: 3px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({width: "100%"})}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size:20px;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 7px;
  font-weight: 400;
`;
const Button = styled.button`
  border-radius: 5px;
  padding: 13px;
  border: 3px solid #008080;
  background-color: white;
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;

  &:hover{
    background-color: #fcf5f5;
  }
`;


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  };

  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
          <ImgContainer>
          <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>{product.price} VND</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                <FilterColor onClick={(e) => setColor(e.target.value)}>
                {product.color?.map((c) => (
                  <FilterColorOption key={c}>{c}</FilterColorOption>
                ))}
                </FilterColor>
              </Filter>
              <Filter>
                <FilterTitle type="size">Size</FilterTitle>
                <FilterSize onClick={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
                </FilterSize>
              </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => handleQuantity("dec")}/>
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => handleQuantity("inc")} />
                </AmountContainer>
                <Button onClick={handleClick}>Thêm vào giỏ hàng</Button>
              </AddContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  );
};

export default Product;