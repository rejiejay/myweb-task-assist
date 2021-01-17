const isMobile = () => {
    const ua = window.navigator.userAgent
    const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']

    return agents.find(agent => 0 < ua.indexOf(agent));
}

const deviceHandle = {
    isMobile
}

export default deviceHandle