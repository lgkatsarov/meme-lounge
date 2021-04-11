import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { setUserNav } from './views/navPane.js'
import { homePage } from './views/home.js';
import { allMemesPage } from './views/allMemes.js';
import { loginPage } from './views/login.js';
import { logout } from './api/data.js'
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';

const main = document.querySelector('main');

document.querySelector('nav').addEventListener('click', async (ev) => {
    if (ev.target.innerText == 'Logout') {
        await logout();
        page.redirect('/');
    }
});

page('/', decorateContext, homePage);
page('/all-memes', decorateContext, allMemesPage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage)
page('/details/:id', decorateContext, detailsPage);
page('/profile', decorateContext, profilePage);

setUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}