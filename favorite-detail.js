let searchParams = new URLSearchParams(window.location.search)
        let param = searchParams.get('id');
        if (param !== null) {
            searchMovieId(param);
        } 

        function searchMovieId(my_search) {
            getMovieId(my_search);
        }

        function getMovieId(id_data) {
            var my_card = document.getElementById("movie-list");
            fetch('https://se104-project-backend.du.r.appspot.com/movie/601232100/' + id_data)
                .then(response => response.json())
                .then(data => {
                        var html = '<div class="col-md-4">';
                        html += '<div class="card">';
                        html += '<img src="' + data.image_url + '" alt="Card imge" style="aspect-ratio: 3 / 4;">';
                        html += '<div class="card-header text-center">' + data.title + '</div>';
                        html += '<div class="card-body">';
                        html += '<p class="card-title text-center"> Type :' + data.type + '</p>';
                        html += '<p class="card-title text-center"> Episodes :' + data.episodes + '</p>';
                        html += '<p class="card-text text-center"> Score : ' + data.score + '</p>';
                        html += '<p class="card-text text-center"> Rated : ' + data.rated + '</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';

                        html += '<div class="col-md-8">';
                            html += '<div class="card">';
                                html += '<div class="card-body">';
                                    html += '<p class="card-text">' + data.synopsis + '</p>';
                                html += '</div>';
                            html += '</div>';
                        html += '</div>';
                        my_card.insertAdjacentHTML('beforeend', html);
                });
        }