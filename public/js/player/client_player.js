import { cookies, transferPlayback, play } from "./client_player.api.js";
import { addEventOnElems, msTimeCode } from "../utils.js"

const $players = document.querySelectorAll('[data-player]')
const $playerNextBtn = document.querySelector('[data-player-next-btn]')
const $playerPrevBtn = document.querySelector('[data-player-prev-btn]')

const updatePlayerInfo = (playerState, $player) => {
    const $trackBanner = $player.querySelector('[data-track-banner]')
    const $trackName = $player.querySelector('[data-track-name]')
    const $trackArtist = $player.querySelector('[data-track-artist]')

    const {
        track_window: {
            current_track: {
                album: { images: trackImages },
                artists: trackArtists,
                name: trackName
            }
        }
    } = playerState

    const { url = '/images/track-banner.png', width, height } = trackImages.find(item => item.width > 200 && item.width < 400)

    const artistNames = trackArtists.map(({ name }) => name).join(', ')

    $trackBanner.src = url
    $trackBanner.width = width
    $trackBanner.height = height

    $trackBanner.alt = trackName
    $trackName.textContent = trackName
    $trackArtist.textContent = artistNames
    $player.classList.remove('hide')
    $player.classList.remove('disabled')
    console.log($trackName)
}

let $lastActiveBtns = []

const updateCardPlayBtnState = (playerState) => {
    const { paused, context: { uri }, track_window: {
        current_track: { uri: trackUri }
    } } = playerState

    const $cardPlayBtns = document.querySelectorAll(`[data-uri="${uri}"]`)

    const $trackPlayBtns = document.querySelectorAll(`[data-track-uri="${trackUri}"]`)

    const $currentActivePlay = [...$cardPlayBtns, ...$trackPlayBtns]

    $lastActiveBtns.forEach($playBtn => {
        $playBtn.classList.remove('active')
        $playBtn.dataset.playBtn = 'play'
    })

    $currentActivePlay.forEach($playBtn => {
        $playBtn.classList[paused ? 'remove' : 'add']('active')
        $playBtn.dataset.playBtn = paused ? 'play' : 'pause'
    })

    $lastActiveBtns = $currentActivePlay
}

const updateCardPlayerState = (playerState, $player) => {
    const $playerControlPlay = $player.querySelector('[data-player-control-play]')
    const { paused } = playerState

    $playerControlPlay.classList[paused ? 'remove' : 'add']('active')
    $playerControlPlay.dataset.playBtn = paused ? 'play' : 'pause'
}

const documentTitle = document.title

const updateDocumentTitle = (playerState) => {
    const { paused, track_window: {
        current_track: {
            artists: trackArtists,
            name: trackName
        }
    }

    } = playerState

    const  artistNameStr = trackArtists.map(({name}) => name).join(', ')

    document.title = paused ? documentTitle : `${trackName} • ${artistNameStr} | Musify`
}

const $playerLgProgress = document.querySelector('[data-player-progress-lg]')
const $playerSmProgress =  document.querySelector('[data-player-progress-sm]')
const $playerProgressPos = document.querySelector('[data-progress-pos]')
const $playerProgressDuration = document.querySelector('[data-progress-duration]')

let lastProgressInterval ;
const updatePlayerProgress = (playerState) => {
    const {
        position,
        duration,
        paused
    } = playerState

    let currentPosition  = position
    $playerLgProgress.max = duration
    $playerSmProgress.max = duration
    $playerLgProgress.value = currentPosition
    $playerSmProgress.value = currentPosition
    $playerProgressDuration.textContent = msTimeCode(duration)
    $playerProgressPos.textContent =  msTimeCode(currentPosition)

    lastProgressInterval && clearInterval(lastProgressInterval)

    if (!paused) {
        const  currentProgressInterval = setInterval(() => {
            currentPosition += 1000
            $playerLgProgress.value = currentPosition
            $playerSmProgress.value = currentPosition
            $playerProgressPos.textContent =msTimeCode(currentPosition)

            
        },1000)

        lastProgressInterval = currentProgressInterval
    } 
}

const playerStateChange = (playerState) => {
    const { track_window } = playerState
    //update player uri
    $players.forEach(player => updatePlayerInfo(playerState, player))
    
    // update card play ui stae e.g play, pause
    updateCardPlayBtnState(playerState)
    
    // update player control play btn ui  state after state change
    $players.forEach(player => updateCardPlayerState(playerState, player))

    // update document  title when playing track
    updateDocumentTitle(playerState)

    // update player progress
    updatePlayerProgress(playerState)

    // disable next and prev button if there is no track available
    $playerNextBtn.disabled = !track_window.next_tracks.length
    $playerPrevBtn.disabled = !track_window.previous_tracks.length
}

const togglePlay = async function (player) {
    const deviceId = localStorage.getItem('device_id')

    const {
        context: { uri: currentUri },
        track_window: {
            current_track: { uri: currentTrackUri }
        }
    } = await player.getCurrentState()

  

    const {
        uri: btnUri,
        trackUri: btnTrackUri,
        playBtn
    } = this.dataset

    if (playBtn === 'play') {
        const lastPlayed = currentUri === btnUri || currentTrackUri === btnTrackUri

        if ((!btnUri && !btnTrackUri) || lastPlayed) {
            return await player.resume()
        }

        const reqBody = {}

        btnUri ? reqBody.context_uri = btnUri : null
        btnTrackUri ? reqBody.uris = [btnTrackUri] : null

        await play(deviceId, reqBody)
    } else {
        await player.pause()
    }
}

const $volumeProgress = document.querySelector('[data-volume-progress]')

const $volumeBtnIcon = document.querySelector('[data-volume-btn] .icon')

const setVolumeIcon = function (volume) {
    const volumeIcon = 
        volume > 66 ? 'volume_up' :
        volume > 33 ? 'volume_down' :
        volume > 0 ? 'volume_mute' : 'volume_off'
    
        $volumeBtnIcon.textContent = volumeIcon
}

const updatePlayerVolume = async function (player) {
    const volumePercent = this.value
    setVolumeIcon(volumePercent)

    await player.setVolume(volumePercent / 100)

    localStorage.setItem('volume',volumePercent)
}

window.onSpotifyWebPlaybackSDKReady = () => {

    const volume = localStorage.getItem('volume') ?? 100

    const player = new Spotify.Player({
        name: 'Musify Web  Player',
        getOAuthToken: (callback) => { callback(cookies.get('access_token')); },
        volume: volume / 100
    });

    player.addListener('ready', async ({ device_id }) => {
        localStorage.setItem('device_id', device_id)

        await transferPlayback(device_id)

        const playBtns = document.querySelectorAll('[data-play-btn]')
        addEventOnElems(playBtns, 'click', function () {
            togglePlay.call(this, player)
        })

        $playerNextBtn.addEventListener('click', async() => {
            await player.nextTrack()
        })

            $playerPrevBtn.addEventListener('click', async() => {
            await player.previousTrack()
        })

        $playerLgProgress.addEventListener('input',async function()  {
            await player.seek(this.value)
        })

        $volumeProgress.addEventListener('input',updatePlayerVolume.bind($volumeProgress,player))
    })

    player.addListener('player_state_changed', playerStateChange)

    player.getVolume().then(volume => {
        const volumePercent = volume * 100;

        $volumeProgress.value = volumePercent

        setVolumeIcon(volumePercent)
    })


    player.connect()
}