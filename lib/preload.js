export default {
    async Load(options) {
        var defaultOptions = {
            images: [],
            sounds: [],
            onprogress: null,
            oncomplete: null,
            abortOnFail: false,
            onabort: null
        }
        var _options = {};
        Object.assign(_options, defaultOptions, options);
        if (!Array.isArray(_options.images)) {
            throw new TypeError("Parameter images is not an array.");
        }
        if (!Array.isArray(_options.sounds)) {
            throw new TypeError("Parameter sounds is not an array.");
        }
        var index = 0;
        var total = _options.images.length + _options.sounds.length;



        if (_options.images.length > 0) {
            for (let _index in _options.images) {
                try {
                    await _loadImage(_options.images[_index]);
                }
                catch (err) {
                    _onFail(err);
                    if (_options.abortOnFail)
                        return;
                }
            }
        }


        if (_options.sounds.length > 0) {
            for (let _index in _options.sounds) {
                try {
                    await _loadAudio(_options.sounds[_index])
                }
                catch (err) {
                    _onFail(err);
                    if (_options.abortOnFail)
                        return;
                }
            }

        }


        function _loadImage(url) {
            return new Promise((resolve, reject) => {
                let img = new Image();
                img.onload = function () {
                    _reportProgress();
                    resolve();
                }
                img.onerror = function () {
                    if (!_options.abortOnFail)
                        _reportProgress();
                    reject(`加载失败：${url}`);
                }
                img.src = url;
            });
        }

        function _loadAudio(url) {
            return new Promise((resolve, reject) => {
                let audio = new Audio();
                audio.autoplay = false;
                audio.preload = "auto";
                audio.oncanplaythrough = function () {
                    _reportProgress();
                    resolve();
                }
                audio.onerror = function () {
                    if (!_options.abortOnFail)
                        _reportProgress();
                    reject(`加载失败：${url}`);
                }
                audio.src = url;
                audio.load();
            });
        }

        function _reportProgress() {
            index++;
            var progress = (index / total).toFixed(4) * 100;
            if (_options.onprogress)
                _options.onprogress(progress);
            if (progress >= 100 && _options.oncomplete)
                _options.oncomplete();
        }

        function _onFail() {
            if (_options.abortOnFail && _options.onabort) {
                _options.onabort();
            }
        }
    }
}