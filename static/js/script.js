document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('video');
    var videoList = document.getElementById('videoList');
    var playPauseButton = document.getElementById('playPause');
    var volumeSlider = document.getElementById('volume');
    var fullscreenButton = document.getElementById('fullscreen');
    var exitFullscreenButton = document.getElementById('exitFullscreen');
    var commentInput = document.getElementById('commentInput');
    var sendCommentButton = document.getElementById('sendComment');
    var danmuContainer = document.getElementById('danmuContainer');
    var comments = [];

    fullscreenButton.addEventListener('click', function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    });

    exitFullscreenButton.addEventListener('click', function() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    });

    playPauseButton.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseButton.textContent = '暂停';
        } else {
            video.pause();
            playPauseButton.textContent = '开始';
        }
    });

    volumeSlider.addEventListener('input', function() {
        video.volume = volumeSlider.value;
    });

    videoList.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            video.src = e.target.getAttribute('data-src');
            video.play();
            playPauseButton.textContent = 'Pause';
        }
    });

    sendCommentButton.addEventListener('click', function() {
        var text = commentInput.value;
        var time = video.currentTime;
        sendComment(text, time);
        commentInput.value = '';
    });

    function sendComment(text, time) {
        fetch('/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text, time: time })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                comments.push({ text: text, time: time });
                displayComment(text, time);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function displayComment(text, time) {
        var danmu = document.createElement('div');
        danmu.className = 'danmu';
        danmu.style.top = Math.floor(Math.random() * danmuContainer.clientHeight) + 'px';
        danmu.textContent = text;

        danmuContainer.appendChild(danmu);

        setTimeout(function() {
            danmu.remove();
        }, 10000);
    }
});
