import { addEventOnElems } from "./utils.js";


// Serch field clear
const $searchField = document.querySelector('[data-search-field]')

const $searchClear = document.querySelector('[data-search-clear]')

$searchClear?.addEventListener('click', () => {
    $searchField.value = ''

})

// logo animation
const $logo = document.querySelector('[data-logo]')

if (!sessionStorage.getItem('logoAnimated')) {
    $logo.classList.add('animate')
    sessionStorage.setItem('logoAnimated', true)
}


// Menu activate class
const $menuWrapper = document.querySelector('[data-menu-wrapper]')

const $menuToggler = document.querySelector('[data-menu-toggler]')

$menuToggler?.addEventListener('click', function () {
    $menuWrapper.classList.toggle('active')
})


// Header fixed
const $page = document.querySelector('[data-page]')
console.log($page)

let lastCrollPos = 0

$page?.addEventListener('scroll', function ()  {
    if (lastCrollPos < this.scrollTop) {
        this.classList.add('header-hide')
    } else {
        this.classList.remove('header-hide')
    }
    lastCrollPos = this.scrollTop
})

// pointer animation
const ripple = function($rippleElem)  {
    $rippleElem.addEventListener('pointerdown',function(event)  {
        event.stopImmediatePropagation()
        const $ripple = document.createElement('div')
        $ripple.classList.add('ripple')
        this.appendChild($ripple)
        const removeRipple = () => {
            $ripple.animate({
                opacity: 0
            }, { fill: 'forwards', duration: 200 })

            setTimeout(() => {
                $ripple.remove()
            }, 1000);
        }
        this.addEventListener('pointerup', removeRipple)
        this.addEventListener('pointerleave', removeRipple)

        const rippleSize = Math.max(this.clientWidth,this.clientHeight)
        $ripple.style.top = `${event.layerY}px`
        $ripple.style.left = `${event.layerX}px`
        $ripple.style.width = `${rippleSize}px`
        $ripple.style.height = `${rippleSize}px`

    })
}

const $rippleElems = document.querySelectorAll('[data-ripple]')

$rippleElems?.forEach(item => ripple(item))

//Image Loading animation
window.addEventListener('DOMContentLoaded',function () {
    const $animateImages = document.querySelectorAll('[data-image-load-anim]')

    const addAnimate = function ()  {
        this.animate({
            opacity:1
        },{duration:200,fill:'forwards'})
    }
    $animateImages.forEach($image => {$image.style.opacity = 0
        if ($image.complete) {
            addAnimate.call($image)
        }else {
            $image.addEventListener('load',addAnimate)
        } })

})


// Bottom nav ite active

const $bottomNavItems = document.querySelectorAll('[data-bottom-nav-item]')

const $bottomNavItemActive = document.querySelector('[data-bottom-nav-item].active')

const activeNavItem = function () {
    $bottomNavItemActive?.classList.remove('active')
    this.classList.add('active')
}

$bottomNavItems && addEventOnElems($bottomNavItems,'click',activeNavItem)

// Player modal toogle

const $modalPlayer = document.querySelector('[data-modal-player]')

const $modalPlayerTogglers = document.querySelectorAll('[data-modal-player-toggler]')

const $modalPlayerOverlay = document.querySelector('[data-player-overlay]')


const toggleModalPlayer = function () {
    $modalPlayer.classList.toggle('active')
    $modalPlayerOverlay.classList.toggle('active')
}

$modalPlayerTogglers && addEventOnElems($modalPlayerTogglers,'click',toggleModalPlayer)


// Back and forward functionality

const $backbtn = document.querySelector('[data-back-btn]')

const $forwardBtn = document.querySelector('[data-forward-btn]')

$backbtn?.addEventListener('click',function () {
    window.history.back()
})

$forwardBtn?.addEventListener('click',function (){
    window.history.forward()
})


// add background color in list header when sticky on top

const $listHeader = document.querySelector('[data-list-header]')

$page?.addEventListener('scroll',function (){
    if($listHeader){
        this.classList[$listHeader.offsetTop > 0 ? 'add' : 'remove']('list-header-active')
    }
})

// Search fliter item active 

const $searchFilterItems = document.querySelectorAll('[data-search-filter]')

const activeSearchFilter = function () {
    document.querySelector('[data-search-filter].active')?.classList.remove('active')
    this.classList.add('active')

}

$searchFilterItems && addEventOnElems($searchFilterItems,'click',activeSearchFilter)