window.onload = () => {
    document.querySelector('.st-active .bubble-1').style.animation = 'fadeFirst .3s forwards';
    document.querySelector('.st-active .bubble-2').style.animation = 'fadeSecond .6s forwards';
    document.querySelector('.st-active .bubble-3').style.animation = 'fadeLast .9s forwards';

    document.querySelector('.intro-text-title').style.animation = 'fadeFirst .3s forwards';
    document.querySelector('.intro-text .main-text').style.animation = 'fadeSecond .6s forwards';
    document.querySelector('.intro-text .btn').style.animation = 'fadeLast 1s forwards';
    document.querySelector('.intro-content').style.animation = 'fadeLast 1s forwards';
}

// слайдер

document.querySelector('.st-arrow-next').addEventListener('click', () => {
    var slides = [...document.querySelectorAll('.st-slide')];

    if(slides[slides.length - 1].classList.contains('st-active')) return false;

    document.querySelector('.st-active').style.animation = 'fade .5s forwards';
    document.querySelector('.st-next').style.animation = 'scale .5s forwards';

    document.querySelector('.st-active').nextElementSibling.classList.add('st-active');
    document.querySelector('.st-next').nextElementSibling.classList.add('st-next');
    document.querySelector('.st-active').classList.remove('st-active');
    document.querySelector('.st-next').classList.remove('st-next');

    setTimeout(() => {

        document.querySelector('.st-active .bubble-1').style.animation = 'fadeFirst .3s forwards';
        document.querySelector('.st-active .bubble-2').style.animation = 'fadeSecond .6s forwards';
        document.querySelector('.st-active .bubble-3').style.animation = 'fadeLast .9s forwards';
    }, 500);
});

document.querySelector('.st-arrow-prev').addEventListener('click', () => {
    var slides = [...document.querySelectorAll('.st-slide')];
    var slidesActive = [...document.querySelectorAll('.st-active')];
    var slidesNext = [...document.querySelectorAll('.st-next')];

    if(slides[0].classList.contains('st-active')) return false;

    document.querySelector('.st-active').style.animation = 'scaleOut .5s forwards';
    document.querySelector('.st-active').previousElementSibling.style.animation = 'fadeIn .5s forwards';

    document.querySelector('.st-active').previousElementSibling.classList.add('st-active');
    document.querySelector('.st-next').previousElementSibling.classList.add('st-next');
    slidesActive[slidesActive.length - 1].classList.remove('st-active');
    slidesNext[slidesNext.length - 1].classList.remove('st-next');
});

// скролл-анимация

animScroll = (s) => {
    document.querySelector(`${s} .main-title`).style.animation = 'fadeFirstBlock .3s forwards';
    document.querySelector(`${s} .main-text`).style.animation = 'fadeSecondBlock .6s forwards';    
};

document.addEventListener('scroll', () => {
    if(window.pageYOffset >= document.querySelector('.stages').getBoundingClientRect().top) {
        animScroll('.stages');
        document.querySelector('.stages-slider').style.animation = 'fadeLastBlock 1s forwards';
    } 
    
    if(document.querySelector('.team').getBoundingClientRect().top <= window.innerHeight / 1.3) {
        animScroll('.team');
        document.querySelector('.team-mentors').style.animation = 'fadeLastBlock 1s forwards';
    }

    if(document.querySelector('.create').getBoundingClientRect().top <= window.innerHeight / 1.3) {
        var shadows1 = [...document.querySelectorAll('.tab-shadow-1')];
        var shadows2 = [...document.querySelectorAll('.tab-shadow-2')];
        
        animScroll('.create');
        document.querySelector('.create-block').style.animation = 'fadeLastBlock 1s forwards';

        setTimeout(() => {
            shadows1.forEach((a, n, shadows1) => {
                a.style.animation = 'fadeFirstTab .1s forwards';
            })

            shadows2.forEach((a, n, shadows2) => {
                a.style.animation = 'fadeSecondTab .2s forwards';
            })
        }, 1000);
    }

    if(document.querySelector('.hack').getBoundingClientRect().top <= window.innerHeight / 1.3) {
        animScroll('.hack');
        document.querySelector('.hack-block').style.animation = 'fadeLastBlock 1s forwards';
    }

    if(document.querySelector('.winners').getBoundingClientRect().top <= window.innerHeight / 1.3) {
        animScroll('.winners');
        document.querySelector('.winners-block').style.animation = 'fadeLastBlock 1s forwards';
    }

    if(document.querySelector('.news').getBoundingClientRect().top <= window.innerHeight / 1.3) {
        document.querySelector('.news .main-title').style.animation = 'fadeFirstBlock .3s forwards';
        document.querySelector('.news-list').style.animation = 'fadeLastBlock .6s forwards';
    }

    if(document.querySelector('.westart').getBoundingClientRect().top <= window.innerHeight / 1.3) {
        animScroll('.westart');
        document.querySelector('.westart .btn').style.animation = 'fadeLastBlock 1s forwards';
        document.querySelector('.westart .download').style.animation = 'fadeLastBlock 1s forwards';
    }
});

// видео

document.querySelector('.btn-video').addEventListener('click', () => {
    document.querySelector('.video-controls').style.animation = 'fadeOut .3s forwards';
    document.querySelector('.video').innerHTML = '<iframe width="1024" height="576" src="https://www.youtube.com/embed/iDytJAnsbk0?enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    
    document.querySelector('iframe').addEventListener('load', () => {
        var video = document.getElementsByTagName('iframe')[0].contentWindow;
        video.postMessage('{ "event": "command", "func": "playVideo", "args": "" }', "*");      
    })
})

// моб.меню

document.querySelector('.burger-img').addEventListener('click', () => {
    document.querySelector('.burger-img').style.display = 'none';
    document.querySelector('.cross-img').style.display = 'block';
    document.querySelector('.header-menu--mobile').style.display = 'block';
})

document.querySelector('.cross-img').addEventListener('click', () => {
    document.querySelector('.cross-img').style.display = 'none';
    document.querySelector('.burger-img').style.display = 'block';
    document.querySelector('.header-menu--mobile').style.display = 'none';
})