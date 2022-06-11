let searchParams = new URLSearchParams(window.location.search)
        let param = searchParams.get('search');
        if (param == '') {
            alert('กรุณากรอกข้อมูลค้นหา!')
        } else {
            searchMovie(param);
            document.getElementById('search').value = param;
        }

        function searchMovie(my_search) {
            getMovie(my_search);
        }

        function getMovie(search_data) {
            var my_card = document.getElementById("movie-list");
            fetch('https://api.jikan.moe/v3/search/anime?q=' + search_data)
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.results.length; i++) {
                        let obj = data.results[i];
                        var html = '<div class="col-md-3">';
                        html += '<div class="card">';
                        html += '<img src="' + obj.image_url + '" alt="Card imge" style="aspect-ratio: 1 / 1;">';
                        html +=
                            '<div class="card-header"><a class="text-movie text-decoration-none" href="home-detail.html?id=' +
                            obj.mal_id + '">' + obj.title + '</a></div>';
                        html += '<div class="card-body">';
                        html += '<p class="card-title text-center"> Type :' + obj.type + '</p>';
                        html += '<p class="card-text text-center"> Score : ' + obj.score + '</p>';
                        html += '<div class="justify-comtent-end d-grid">';
                        html += "<button onDblClick=\"confirm_click('" + obj.mal_id +
                            "');\" class=\btn\">add to <i class=\"fas fa-heart\"></i></button>";
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        my_card.insertAdjacentHTML('beforeend', html);
                    }
                });
        }