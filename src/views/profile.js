import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUsersMemes } from '../api/data.js';

const profileTemplate = (username, email, isMale, userMemes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src=${isMale ? '/images/male.png' : '/images/female.png' }>
        <div class="user-content">
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>My memes count: ${userMemes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        <!-- Display : All created memes by this user (If any) -->
        ${userMemes.length > 0 ? userMemes.map(singleMemeTemplate) : html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;

const singleMemeTemplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href=${`/details/${meme._id}`}>Details </a> </div>`;

export async function profilePage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');
    const gender = sessionStorage.getItem('gender');

    const userMemes = await getUsersMemes(userId);

    ctx.render(profileTemplate(username, email, gender == 'male', userMemes));

}