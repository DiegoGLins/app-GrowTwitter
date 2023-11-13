import styled from "styled-components";

export const TogleMenuStyled = styled.section`
background-color: #fff;
max-width: 190px;
max-height: 850px;
gap: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: self-start;
margin: 70px 0px 0px 0px;
position: fixed;
`

export const ButtonTogleMenuStyled = styled.button`
background-color: ${(props) => props.theme.colors.button};
width: 180px;
height: 35px;
color:${(props) => props.theme.colors.textSecondary};
border-radius: 18px;
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
font-size: 16px;
padding: 8px;
border: none;
align-items: center;
margin-top: 10px;
`