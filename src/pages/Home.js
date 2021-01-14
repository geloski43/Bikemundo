import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import {
  AppstoreTwoTone,
  BuildTwoTone
} from '@ant-design/icons';
import FoooterLinks from "../components/nav/FooterLinks";

const Home = () => {
  return (
    <>
      <div style={{ color: "rgba(104, 62, 3, 0.8)" }} className="jumbotron1 display-2  text-center">
        <Jumbotron text={
          [
            "Q O P I U Y T R E W p q",
            "A K L J H G F S D l s a d f",
            "M X Z C V N B z m n ",
            "8 7 6 5 4 3 2 9 1 0 ? @ % . w",
            "e t y i u o h g j k x c r b v",
          ]
        } />
      </div>

      <h4 className="text-center p-0 display-4 jumbotron">
        <AppstoreTwoTone />
        <br />
        Categories
      </h4>
      <CategoryList />

      <h4 className="text-center p-0 display-4 jumbotron">
        <BuildTwoTone />
        <br />
        Sub-Categories
      </h4>
      <SubList />

      <h4 className="text-center p-3 mt-5  display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellers />

      <br />
      <br />
      <FoooterLinks />
    </>
  );
};

export default Home;
