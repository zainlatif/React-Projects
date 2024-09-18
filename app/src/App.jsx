import { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

const BASE_URL = "http://localhost:9000"; // URL for fetching data

// Global styles for the app
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #333333;
    color: white;
    scroll-behavior: smooth;
  }
`;

// Main App Component
const App = () => {
  const [data, setData] = useState([]); // State for storing fetched data

  // Fetch food data from the server
  const fetchFoodData = async () => {
    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
      console.log(json); // Log fetched data
      setData(json); // Set fetched data to state
    } catch (error) {
      console.error("Error fetching data:", error); // Handle fetch error
    }
  };

  useEffect(() => {
    fetchFoodData(); // Fetch data when the component mounts
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <TopContainer>
          <div className="logo-container">
            <img src="/images/Foody Zone.svg" alt="logo" />
          </div>
          <div className="search">
            <input type="text" placeholder="Search Food..." />
          </div>
        </TopContainer>
        <LowerContainer>
          <Button>All</Button>
          <Button>Breakfast</Button>
          <Button>Lunch</Button>
          <Button>Dinner</Button>
        </LowerContainer>
      </Container>
      <FoodCardContainer>
        {/* Dynamically render food cards based on fetched data */}
        {data.map((item, index) => (
          <FoodCard key={index} item={item} />
        ))}
      </FoodCardContainer>
    </>
  );
};

export default App;

// FoodCard Component to display individual food items
const FoodCard = ({ item }) => {
  return (
    <Card>
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.text}</p>
      <p>Price: ${item.price}</p>
      <Button>{item.type}</Button>
    </Card>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 140px;
  .search {
    input {
      outline: none;
      height: 40px;
      padding: 0 10px;
      border: 3px solid red;
      border-radius: 5px;
      background-color: transparent;
      font-size: 16px;
      color: white; /* Ensures the typed text is white */

      &::placeholder {
        color: white;
      }
    }
  }
`;

const LowerContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 30px;
`;

const Button = styled.button`
  background-color: red;
  padding: 6px 12px;
  color: white;
  border-radius: 5px;
`;

const FoodCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
  background-image: url(/images/bg-fruit.jpg);
  background-size: cover;
  height: 100vh;
  padding: 20px;
  overflow-y: auto;
`;

// Styling for each individual FoodCard
const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  h3 {
    margin: 10px 0;
  }

  p {
    margin: 5px 0;
  }

  &:hover {
    transform: scale(1.05);
  }
`;
