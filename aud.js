// declare global variables
var SPP = cc('_SPP'),
    SPS = cc('_SPS'),
    SRID = cc('srid'),
    e = encodeURIComponent,
    url = window.location.href,
    tld = window.location.origin,
    ref = window.document.referrer,
    sys = window.navigator.platform;

// initalize the functions
function init() {
    if (SPP == "NP") {
        initCookie("_SPP", "SPP", 365);
        send('u');
    } else if (SPS == "NP") {
        initCookie("_SPS", "SPS");
        send('u');
    } else {
        send('v');
    }
}
window.onload = init;

// send request regarding the user type
function send(u) {
    // var s = "http://54.243.149.109:8085/receiver?acc=" + _spp + "&f=" + _f + "&u=" + u + "&SPP=" + cc('_SPP') + "&SPS=" + cc('_SPS') + "&SRID=" + cc('srid') + "&url=" + e(url) + "&ref=" + e(ref) + "&sys=" + e(sys) + "&tld=" + e(tld);
    var s = "http://pix.silverpush.co/receiver?acc=" + _spp + "&f=" + _f+ "&u=" + u + "&SPP=" + cc('_SPP') + "&SPS=" + cc('_SPS') + "&SRID=" + cc('srid') + "&url=" + e(url) + "&ref=" + e(ref) + "&sys=" + e(sys) + "&tld=" + e(tld);
    var xhr = initReq(s);
    if (!xhr) return;
    xhr.onload = function() {
        var text = xhr.responseText
    };
    xhr.onerror = function() {};
    xhr.send()
}

// checks for cookie by the 'name'
function cc(name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(name + "=");
        if (c_start != -1) {
            c_start = c_start + name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end))
        } else {
            return "NP"
        }
    } else {
        return "NP"
    }
}

// initializes a cookie with 'name' and its 'value' and 'days' to expire
function initCookie(name, value, days) {
    var time = new Date;
    if (value) value = value + "." + Math.random() * time;
    if (days) {
        time.setTime(time.getTime() + days * 24 * 60 * 60 * 1E3);
        var expires = "; expires=" + time.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

// initaliezes a CORS request
function initReq(url) {
    var xhr = new XMLHttpRequest;
    if ("withCredentials" in xhr) xhr.open('POST', url, true);
    else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest;
        xhr.open(method, url)
    } else xhr = null;
    return xhr
}

// initializes a freq playback
var _F = [18051, 18151, 18251, 18351, 18451, 18551, 18651, 18751, 18851, 19051, 19151, 19251, 19351, 19451, 19551, 19651, 19751, 19851];
var _f = [19951];

for (i = 1; i <= 2; i++) {
    var f = _F[Math.floor(Math.random() * _F.length)];
    if (_f.indexOf(f) != -1) {
        i--;
    } else {
        _f[i] = f;
    }
}

// console.log(_f);
// globals
var aud, o;

// hello audio world
(function init(g) {
    try {
        aud = new(g.AudioContext || g.webkitAudioContext);
        //  o = aud.createOscillator();
    } catch (e) {
        alert('No web audio support in this browser');
    }
}(window));

/*
// all good except a little tch
function play() {
    console.log(freq)
    o = aud.createOscillator();
    o.frequency.value = freq;
    o.connect(aud.destination);
    o.noteOn(0);
}
*/

function play() {
    // console.log(freq)
    o = aud.createOscillator();
    o.frequency.value = freq;
    o.connect(aud.destination);
    var gainNode = aud.createGain();
    o.connect(gainNode)
    gainNode.connect(aud.destination)
    gainNode.gain.value = 0.0001;
    // gainNode.gain.linearRampToValueAtTime(0.00001, aud.currentTime + 0.000000000011);
    // console.log(aud.currentTime)
    o.noteOn(0);
}

function stop() {
    o.noteOff(0);
    o.stop();
}

var i = 0;

function myLoop() {
    setTimeout(function() {
        kplay();
        k = 0
        i++;
        if (i < 3) {
            myLoop();
        }
    }, 500)
}
var k = 0;

function kplay() {
    setTimeout(function() {
        freq = _f[k];
        play();
        kstop();
        k++;
        if (k < 3) {
            kplay();
        }
    }, 100)
}

var t = 0

function kstop() {
    setTimeout(function() {
        stop();
        t++;
        if (t < 3) {
            kstop();
        }
    }, 100)
}

myLoop();

/*
// play singular freq
function freq() {
    if (t >= 0) {
        var o = aud.createOscillator();
        var g = aud.createGain();


        o.connect(g);
        g.connect(aud.destination);

        g.gain.value = 0;
        o.type = 'sawtooth';
        setInterval(ch, 140);
        var i = 0;

        function ch() {
            o.frequency.value = _f[i];
            i += 1;
        }
        console.log(t)
        t -= 1;
        console.log(t)

        o.frequency.value = _f;
        fade();
        o.start();

        console.log('k')

        function fade() {
            g.gain.linearRampToValueAtTime(0.1, aud.currentTime + 0.01);
        }

    }
}
*/
