let searchParams = new URLSearchParams(window.location.search)
        let param = searchParams.get('id');
        if (param !== null) {
            searchMovieId(param);
        } else {
            getListFavorite();
        }

        function searchMovieId(my_search) {
            getMovieId(my_search);
        }

        function getMovieId(id_data) {
            var my_card = document.getElementById("movie-list");
            fetch('https://api.jikan.moe/v4/anime/' + id_data)
                .then(response => response.json())
                .then(data => {
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "id": "601232100",
                        "movie": {
                            "url": data.data.url,
                            "image_url": data.data.images.jpg.image_url,
                            "title": data.data.title,
                            "synopsis": data.data.synopsis,
                            "type": data.data.type,
                            "episodes": Number(data.data.episodes),
                            "score": parseFloat(data.data.score),
                            "rated": data.data.rating
                        }
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch("https://se104-project-backend.du.r.appspot.com/movies", requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .then(alert('Add Favorite Success'))
                        .then(window.location.href = 'favorite.html')
                        .catch(error => console.log('error', error));
                });
        }
        function getListFavorite() {
            var my_card = document.getElementById("movie-favorite");
            fetch('https://se104-project-backend.du.r.appspot.com/movies/601232100')
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        let obj = data[i];
                        var html = '<div class="col-md-3">';
                        html += '<div class="card">';
                        html += '<img src="' + obj.image_url + '" alt="Card imge" style="aspect-ratio: 1 / 1;">';
                        html += '<div class="card-header"><a class="text-movie text-decoration-none" href="favorite-detail.html?id='+obj.id+'">' + obj.title + '</a></div>';
                        html += '<div class="card-body">';
                        html += '<p class="card-title text-center"> Type :' + obj.type + '</p>';
                        html += '<p class="card-text text-center"> Score : ' + obj.score + '</p>';
                        html += '<div class="justify-comtent-end d-grid">';
                        html += "<button type=\"button\" onclick=\"return confirmDelete('" + obj.id +
                            "')\" class=\"btn btn-danger\">Delete <i class=\"fas fa-trash\"></i></button>";
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        my_card.insertAdjacentHTML('beforeend', html);
                    }
                });
        }

        function confirmDelete(movie_id) {
            var r = confirm("OK to delete?");
            if (r == false) {
                return false;
            } else {
                var requestOptions = {
                    method: 'DELETE',
                    redirect: 'follow'
                };

                fetch("https://se104-project-backend.du.r.appspot.com/movie?id=601232100&&movieId=" + movie_id,
                        requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .then(alert('Delete Success'))
                    .then(window.location.href = 'favorite.html')
                    .catch(error => console.log('error', error));
            }
        }