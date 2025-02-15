const csrftokenRes = await fetch(`/${process.env.REACT_APP_NAME}/get_csrf/`);
const csrftokenJson = await csrftokenRes.json();
const csrftoken = csrftokenJson.token
const postHeader = () => {
    return {
        'Content-Type': 'application/json',
        "X-CSRFToken": csrftoken
    }
}

export default postHeader
