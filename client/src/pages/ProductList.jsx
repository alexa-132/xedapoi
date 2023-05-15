import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { mobile } from "../responsive"
import {useLocation} from "react-router"
import { useState } from "react"

const Container = styled.div`
    
`;

// const Title = styled.h1`
//     margin: 20px 0px;
//     font-size: 50px;
//     text-align: center;
    
// `;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({width: "0px 20px", display: "flex", flexDirection: "column", margin: "10px 10px"})}
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({marginRight: "0px"})}
`;
 

const Select = styled.select`
    padding: 7px;
    margin-right: 20px;
    ${mobile({margin: "10px 0px"})}
`;


const Option = styled.option`
    
` ;
 const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("Newest");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

   return (
     <Container>
        <Navbar/>
        <Announcement/>
        {/* <Title>C</Title> */}
        <FilterContainer>
            <Filter>
                <FilterText>Filter Product:</FilterText>
                <Select name="size" onChange={handleFilters}>
                    <Option disabled>
                        Size
                    </Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                    <Option>One Size</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Product:</FilterText>
                <Select onChange={(e)=>setSort(e.target.value)}>
                    <Option value="newest">Newest</Option>
                    <Option value="asc"> Price (Min to Max)</Option>
                    <Option value="desc">Price (Max to Min) </Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort}/>
        <Newsletter/>
        <Footer/>
     </Container>
   )
   }
 export default ProductList;