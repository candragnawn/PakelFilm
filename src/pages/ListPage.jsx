import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import List from "../components/List";

const ListPage = () => {
  return (
    <div className="main-layout">
      <NavigationBar />
      <div className="">
        <List />
      </div>
    </div>
  );
};

export default ListPage;
