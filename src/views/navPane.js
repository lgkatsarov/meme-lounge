import { html, render } from '../../node_modules/lit-html/lit-html.js';

const navBar = document.querySelector('nav');

const navTemplate = (isRegistered, email) => html`
    <!-- Logged users -->
    ${isRegistered ? html`<div class="user">
        <a href="/all-memes">All Memes</a>
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${email}</span>
            <a href="/profile">My Profile</a>
            <a href="javascript:void(0)">Logout</a>
        </div>
    </div>` :
    html`
    <!-- Guest users -->
    <div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
        <a href="/all-memes">All Memes</a>
    </div>`}`;

export function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email');
    render(navTemplate(userId != null, email), navBar);
}

// export function setUserNav() {
//     const userId = sessionStorage.getItem('userId');
//     const email = sessionStorage.getItem('email');

//     const user = navBar.querySelector('.user');
//     const guest = navBar.querySelector('.guest');

//     if (userId != null){
//         user.style.display = 'block';
//         user.querySelector('span').innerText = `Welcome, ${email}`;
//         guest.style.display = 'none';
//     } else {
//         user.style.display = 'none';
//         guest.style.display = 'block';
//     }
// }