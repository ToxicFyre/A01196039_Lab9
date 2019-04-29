/* jshint esversion: 6 */

/*globals $:false */

function displaySportList(data) {

    $('.post-list').html("");

    console.log(data);
    for (let i = 0; i < data.posts.length; i++) {
        $('.post-list').append(
            `<li>
                <div>uid : ${data.posts[i].uid}</div>
                <div>title : ${data.posts[i].title}</div>
                <div>content : ${data.posts[i].content}</div>
                <div>author : ${data.posts[i].author}</div>
                <div>publish date : ${data.posts[i].publishDate}</div>
            </li>`);
    }
}

$('.getAllButton').on("click", function() {
    event.preventDefault();

    let url = "./blog-posts";
    let settings = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            displaySportList(responseJSON);
        })
        .catch(err => {
            console.log(err);
        });
});

$('.searchByAuthor-postForm').on("submit", function () {
    event.preventDefault();

    let author = $(".searchByAuthor-postForm.authorIn").val();

    let url = `./blog-posts/${author}`;
    let settings = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            displaySportList(responseJSON);
        })
        .catch(err => {
            console.log(err);
        });
});

$('.new-postForm').on("submit", function () {
    event.preventDefault();

    let title = $(".new-postForm.titleIn").val();
    let content = $(".new-postForm.contentInBox").val();
    let author = $(".new-postForm.authorIn").val();

    let url = "./blog-posts";
    let settings = {
        method: "POST",
        body: JSON.stringify({
            title: title,
            content: content,
            author: author,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    $('.post-list').html("");

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            console.log(responseJSON);
        })
        .catch(err => {
            console.log(err);
        });
});

$('.update-postForm').on("submit", function () {
    event.preventDefault();

    let uid = $(".update-postForm.uidIn").val();
    let title = $(".update-postForm.titleIn").val();
    let content = $(".update-postForm.contentInBox").val();
    let author = $(".update-postForm.authorIn").val();

    let url = `./blog-posts/${uid}`;

    let body = {
        title: title,
        content: content,
        author: author,
    };

    let settings = {
        method: "PUT",
        body: JSON.stringify(body, function(key, value) { return value === "" ? undefined : value }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    $('.post-list').html("");

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            console.log(responseJSON);
        })
        .catch(err => {
            console.log(err);
        });
});

$('.delete-postForm').on("submit", function () {
    event.preventDefault();

    let uid = $(".delete-postForm.uidIn").val();

    let url = `./blog-posts/${uid}`;

    let body = {
        uid: uid,
    };

    let settings = {
        method: "DELETE",
        body: JSON.stringify(body, function(key, value) { return value === "" ? undefined : value }),
        headers: {
            'Content-Type': 'application/json'
        }
    };


    $('.post-list').html("");

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            console.log(responseJSON);
        })
        .catch(err => {
            console.log(err);
        });
});