export const store = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    
    setUser(user) {
        this.user = user;
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    },

    isAuthenticated() {
        return !!this.user;
    },

    getRole() {
        return this.user ? this.user.role : null;
    }
};
