import React from 'react'
const logoImagePath = '../images/kirjaLogo.jpg';

const Logo = () => {
    return (
        <div>
            <img src={'http://localhost:8000/' + logoImagePath} width="50" alt="moi" />
        </div>
    )
}

export default Logo