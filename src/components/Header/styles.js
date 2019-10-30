import styled from 'styled-components';

export const Container = styled.div`
    background: #004870;
    padding: 0 30px;
`;
export const Content = styled.div`
    height: 64px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    nav{
        display: flex;
        align-items: center;
        img{
            margin-right: 20px;
            padding-right: 20px;
            border-right: 1px solid #ed00e1;
            width: 70px;
            height: 50px;
        }
        a{
            font-weight: bold;
            color: #eee;
        }
    }
    aside{
        display: flex;
        align-items: center;
    }
  
`;