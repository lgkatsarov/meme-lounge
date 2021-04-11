import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteMeme, getMemeById } from '../api/data.js';

const detailsTemplate = (meme, isOwner, onClick) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onClick} class="button danger">Delete</button>` : ''}

        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const userId = sessionStorage.getItem('userId');
    const meme = await getMemeById(id);
    const ownerId = meme._ownerId;
    ctx.render(detailsTemplate(meme, userId === ownerId, onClick));

    async function onClick() {
        console.log(await deleteMeme(id));
        ctx.page.redirect('/all-memes');
    }
}