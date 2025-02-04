import styled from "styled-components";

const HeaderContainer = styled.header`
    box-sizing: border-box;
    min-width: 30rem;
    height: auto;
    width: 100vw;
    position: sticky;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background-color: white;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);

    a {
      margin: 0 2rem;
    }

    h1 {
      font-size: 2.5em;
      margin: 0.5em 0;
      font-style: italic;
      color: lightslategray;
    }

    img {
      cursor: pointer;
      width: 15vh;
      height: 15vh;
    }
`;

export default HeaderContainer;