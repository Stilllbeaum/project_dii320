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
            fetch('https://api.jikan.moe/v4/anime/' + id_data)
                .then(response => response.json())
                .then(data => {
                        var html = '<div class="col-md-4">';
                        html += '<div class="card">';
                        html += '<img src="' + data.data.images.jpg.image_url + '" alt="Card imge" style="aspect-ratio: 3 / 4;">';
                        html += '<div class="card-header text-center">' + data.data.title + '</div>';
                        html += '<div class="card-body">';
                        html += '<p class="card-title text-center"> Type :' + data.data.type + '</p>';
                        html += '<p class="card-title text-center"> Episodes :' + data.data.episodes + '</p>';
                        html += '<p class="card-text text-center"> Score : ' + data.data.score + '</p>';
                        html += '<p class="card-text text-center"> Rated : ' + data.data.rating + '</p>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';

                        html += '<div class="col-md-8">';
                            html += '<div class="card">';
                                html += '<div class="card-body">';
                                    if(data.data.trailer.embed_url !== null){
                                    html += '<iframe width="100%" height="640" src="' + data.data.trailer.embed_url + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                                    }
                                    html += '<p class="card-text">' + data.data.synopsis + '</p>';
                                html += '</div>';
                            html += '</div>';
                        html += '</div>';
                        my_card.insertAdjacentHTML('beforeend', html);
                });
        }