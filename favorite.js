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