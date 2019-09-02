module.exports = (on, config) => {
    // create new config settings
    const configOverride = {};
    if (config.env.userAgent === 'mobile') {
        configOverride.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1';
        configOverride.testFiles = './../integration/*.mobile-func-spec.js';
    } else if (config.env.userAgent === 'desktop') {
        configOverride.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9';
        configOverride.testFiles = './../integration/*.func-spec.js';
    }

    return Object.assign({}, config, configOverride);
};