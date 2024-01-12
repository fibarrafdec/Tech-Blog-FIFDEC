const addNewBtn = document.querySelector('#addNew');
const addPostArea = document.querySelector('.new-post');
const listPostArea = document.querySelector('.post-list');
const saveBtn = document.querySelector('#submit');

const addNewClick = () => {
    addPostArea.style.display = 'block';
    listPostArea.style.display = 'none';
    addNewBtn.style.display = 'none';
};

const addNewBlog = async () => {
    const title = document.querySelector('#title').value.trim();
    const text = document.querySelector('#text').value.trim();

    if (title && text) {
        const response = await fetch('/api/blogposts', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type':'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

addNewBtn.addEventListener('click', addNewClick);
saveBtn.addEventListener('click', addNewBlog);
