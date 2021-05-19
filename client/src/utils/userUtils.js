const getUser = () => {
    return JSON.parse(localStorage.getItem('profile')).result
}

const getUserId = () => {
    const user = getUser()
    if (!user)
        throw Error('User is not logged in')

    return user._id ? user._id : user.googleId
}

module.exports = {
    getUser,
    getUserId
}