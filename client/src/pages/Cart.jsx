import styled from "styled-components"
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";


const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
    
`;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding: "10px"})}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type === "filled" && "none"};
    background-color: ${props=>props.type === "filled" ? "black" : "transparent"};
    color: ${props=>props.type === "filled" && "white"};

    &:hover {
    background-color: teal;
    color: black;
   }
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
`;

const Info = styled.div`
    flex:3;
`;
const Summary = styled.div`
    flex:1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
`;

const ProductDetail = styled.div`
    flex:2;
    display: flex;
`;
const PriceDetail = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Image = styled.img`
    width: 300px;
    ${mobile({width: "230px"})};
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span`

`;

const ProductID = styled.span`
    
`;

const ProductColor = styled.div`
    /* width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color}; */
`;

const ProductSize = styled.span``;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({margin: "5px 15px"})}
`;

const ProductPrice = styled.div`
      font-size: 30px;
      font-weight: 200;
      ${mobile({marginBottom: "15px"})}
`;

const Hr = styled.hr`
    background-color: #eee;
    height: 1px;
    border: none;
`;

const SummaryTitle = styled.h1`
    font-weight: 500;
`;
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "total" && "500"};
    font-size: ${props=>props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
   width: 100%;
   padding: 10px;
   background-color: black;
   color: white;
   font-weight: 600;
   cursor: pointer;
   border-radius: 5px;
   margin-top: 25px;

   &:hover{
    background-color: teal;
    color: black;
   }
`;


const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
  
    const onToken = (token) => {
      setStripeToken(token);
    };
  
    useEffect(() => {
      const makeRequest = async () => {
        try {
          const res = await userRequest.post("/checkout/payment",{
            tokenId: stripeToken.id,
            amount: 500,
          });
          navigate("/success", {
            stripeData: res.data,
            products: cart, });
        } catch {}
    };
    stripeToken && makeRequest();
    }, [stripeToken, cart.total, navigate, cart]);

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Wrapper>
        <Title>GIỎ HÀNG</Title>
        <Top>
            <TopButton>TIẾP TỤC MUA HÀNG</TopButton>
            <TopButton type="filled">DANH SÁCH YÊU THÍCH</TopButton>
        </Top>
        <Bottom>
            <Info>
                {cart.products.map((product)=>(
                <Product>
                    <ProductDetail>
                        <Image src={product.img}/>
                        <Details>
                            <ProductName><b>Product:</b> {product.title}</ProductName>
                            <ProductID><b>ID:</b> {product._id}</ProductID>
                            <ProductColor><b>Color:</b> {product.color}</ProductColor>
                            <ProductSize><b>Size:</b> {product.size}</ProductSize>
                        </Details>
                    </ProductDetail>
                    <PriceDetail>
                        <ProductAmountContainer>
                            <Add/>
                            <ProductAmount>{product.quantity}</ProductAmount>
                            <Remove/>
                        </ProductAmountContainer>
                        <ProductPrice> {product.price*product.quantity} vnd</ProductPrice>
                    </PriceDetail>
                </Product>
                ))}
            <Hr/>
            </Info>
            <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                    <SummaryItemText>Tạm tính</SummaryItemText>
                    <SummaryItemPrice>{cart.total} vnd</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Phí ship</SummaryItemText>
                    <SummaryItemPrice>100.000 vnd</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Giảm giá ship</SummaryItemText>
                    <SummaryItemPrice>- 100.000 vnd</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                    <SummaryItemText>Tổng cộng</SummaryItemText>
                    <SummaryItemPrice>{cart.total} vnd</SummaryItemPrice>
                </SummaryItem>
                <StripeCheckout
                    name="XEDAPOI!"
                    image="https://i.ibb.co/3MQSpGk/logo.jpg"
                    billingAddress
                    shippingAddress
                    description={`Hóa đơn của bạn là ${cart.total} vnd`}
                    amount={cart.total}
                    token={onToken}
                    currency="vnd"
                    stripeKey={KEY}
                >
                <Button>THANH TOÁN</Button>
                </StripeCheckout>
            </Summary>
        </Bottom>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Cart