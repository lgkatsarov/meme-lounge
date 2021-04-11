export function notify(msg) {
    const box = document.getElementById('errorBox');
    box.innerHTML = `<span>${msg}</span>`;
    box.style.display = 'block';

    setTimeout(() => {
        box.style.display = 'none';
    }, 3000);
}