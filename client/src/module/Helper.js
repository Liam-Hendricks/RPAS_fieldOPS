import cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
// Set in cookie
const setCookie = (key,value) => {
    if (window !== "undefined") {
        cookies.set(key, value, {
            expires: 1
        })
        cookies.set()
        document.cookie="samesite:Secure"
    }
}

// Remove from cookie - signout
const removeCookie = (token) => {
    if (window !== "undefined") {
        cookies.remove(token, {
            expires: 1
        })
    }
}

// get from cookie such as stored token - will be usefull when we need to make request to server with token
const getCookie = (key) => {
    if (window !== "undefined") {
        return cookies.get(key);
    }
}

// set in localstorage
const setLocalStorage = (key,value) => {
    if (window !== "undefined") {
        localStorage.setItem(key, value)
    }
}
const getLocalStorage = (key) => {
    if (window !== "undefined") {
        return localStorage.getItem(key)
    }
}



// remove from localstorage
const removeLocalStorage = (token) => {
    if (window !== "undefined") {
        localStorage.removeItem (token)
    }
}

// authenticate user by passing data to cookie and localstorage during signin
const authenticate = (response, next) => {
    // // console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response)
    //console.log(response);
    const decoded = jwt_decode(response);
    setCookie('token', response);
    setLocalStorage('user', decoded.id);
    next();
}
const isLogin =()=>{
    if(localStorage.getItem('user')){
        return true;
    }
    return false;
}
// accesss user information from localstorage
const isAuth = () => {
    if (window !== "undefined") {
        
        // Make sure we can grab the cookie
        const cookieChecked = getCookie('token');
        
        if (cookieChecked) {
            if(localStorage.getItem('user')) {
                const token = jwt_decode(getCookie("token"));
                return token
                
                //return JSON.parse(localStorage.getItem('user'))
                //return true;
            } else {
                return false;
            }
        }
    }
}
//signout method
const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    removeLocalStorage('profile');
    next();
}

export{
    setCookie,
    removeCookie,
    getCookie,
    setLocalStorage,
    removeLocalStorage,
    authenticate,
    isAuth,
    signout,
    isLogin,
    getLocalStorage
}