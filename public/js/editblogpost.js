const submit = document.querySelector('#submit');
const cancel = document.querySelector('#cancel');
const deleteBtn = document.querySelector('#delete');

const updateBlogPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const text = document.querySelector('#text').value.trim();
    const id = document.querySelector('#title').getAttribute('data-post-id');

    if (title && text && id) {
        const response = await fetch(`/api/blogposts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({id, title, text}),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert (response.statusText);
        }
    }
};

const deletePost = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#title').getAttribute('data-post-id');

    const response = await fetch(`/api/blogposts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

const cancelUpdate = async (event) => {
    event.preventDefault();

    document.location.replace('/dashboard');
}

deleteBtn.addEventListener('click', deletePost);
submit.addEventListener('click', updateBlogPost);
cancel.addEventListener('click', cancelUpdate);
