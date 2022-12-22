const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'song 1',
            singer: ' Song 1',
            path: './music/song1.mp3',
            image: './image/song1.jpg'
        },
        {
            name: 'song 2',
            singer: ' Song 2',
            path: './music/song2.mp3',
            image: './image/song2.jpg'
        },
        {
            name: 'song 3',
            singer: ' Song 3',
            path: './music/song3.mp3',
            image: './image/song3.jpg'
        },
        {
            name: 'song 4',
            singer: ' Song 4',
            path: './music/song4.mp3',
            image: './image/song4.jpg'
        },
        {
            name: 'song 5',
            singer: ' Song 5',
            path: './music/song5.mp3',
            image: './image/song5.jpg'
        },
        {
            name: 'song 6',
            singer: ' Song 6',
            path: './music/song6.mp3',
            image: './image/song6.jpg'
        },
        {
            name: 'song 7',
            singer: ' Song 7',
            path: './music/song7.mp3',
            image: './image/song7.jpg'
        },
        {
            name: 'song 8',
            singer: ' Song 8',
            path: './music/song8.mp3',
            image: './image/song8.jpg'
        },
        {
            name: 'song 9',
            singer: ' Song 9',
            path: './music/song9.mp3',
            image: './image/song9.jpg'
        },
        {
            name: 'song 10',
            singer: ' Song 10',
            path: './music/song10.mp3',
            image: './image/song10.jpg'
        }
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}">
              <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    hanldeEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth
        // XU ly CD quay / dung 
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 5000,
            // iterations: Infinity
        })
        cdThumbAnimate.pause()
        // Xử lý phóng to thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lý khi click play
        playBtn.onclick = function() {
            
            if (_this.isPlaying) {
                
                audio.pause()
                
            } else {
               
                audio.play()
               
            }
            
            // Khi song duoc play
            audio.onplay = function() {
                _this.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
            // Khi song duoc pause
            audio.onpause = function() {
                _this.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            }
            // Khi tien do bai hat thay doi
            audio.ontimeupdate = function() {
                if(audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime/audio.duration * 100)
                    progress.value = progressPercent
                    
                }
            }
            // Xu ly khi tua song
            
        }
        progress.onchange = function(e) {
            
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
            
        }
        //Khi next song
        nextBtn.onclick = function() {
             if (_this.isRepeat) {
                _this.playRepeatSong()
            } else if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
        }
        // Khi prev song
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                
                _this.prevSong()
            }
            audio.play()
        }
        // Xu ly bat tat random song
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle( 'active', _this.isRandom)
        }
        // Xu ly bat tat repeat song
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        // Xu ly next song khi audio ended    
        audio.onended = function() {
            nextBtn.click()
        }
    },
    loadCurrentSong: function(e) {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    randomSong: function() {

    },
    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRepeatSong: function() {
        // let newIndex
        // do {
        //     newIndex = Math.floor(Math.random() * this.songs.length)
        // } while( newIndex !== this.currentIndex)

        this.currentIndex = this.currentIndex
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while( newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function() {
        //Định nghĩa các thuộc tính cho object
        this.defineProperties()
        
        //Lắng nghe / xử lý các sự kiện
        this.hanldeEvents()

        //Tải thông tin bài hát đầu tiên vào UI khi ứng dụng chạy
        this.loadCurrentSong()

        //Render playlist
        this.render()

        this.playRandomSong()

        
    }

}

app.start()