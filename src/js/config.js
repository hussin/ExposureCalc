var config = {
    colors: {
        bg: 'yellow',
        text: 'black',
        activeBg: 'black',
        activeText: 'yellow'
    },
    fonts: {
        base: 'gothic-14',
        data: 'gothic-18-bold',
        bigData: 'bitham-30-black',
        longBigData: 'gothic-28-bold',
    },
    highShutterSpeeds: [2, 4, 8, 15, 30, 60, 125, 250, 500, 1000, 2000, 4000, 8000],
    apertures: [1.2, 1.4, 1.8, 2.0, 2.8, 3.5, 4, 5.6, 8, 11, 16, 22],
    isos: [25, 50, 100, 200, 400, 800, 1600, 3200, 6400],
    evs: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    evReferences: [
        'Moonlight: Starlight', // -6
        'Moonlight: Quarter', // -5
        'Moonlight: Gibbous', // -4
        'Moonlight: Full', // -3
        'Moonlight: Full, bright', // -2
        'Dim artificial light', // -1
        'Weak artificial light', // 0
        'Lighted skyline', // 1
        'Lightning', // 2
        'Floodlit buildings/ Fireworks', // 3
        'Floodlit bldgs./ Candlelight close ups', // 4
        'Night: vehicle traffic/ Home interior', // 5
        'Home interior', // 6
        'Night street/ Office/ Amusement parks', // 7
        'Bright street/ Office', // 8
        'Night sports/ Neon lights', // 9
        'After sunset/Neon lights', // 10
        'Galleries', // 11
        'Overcast/ shade/ sunset', // 12
        'Cloudy bright/ before sunset', // 13
        'Hazy sunlight', // 14
        'Bright sunlight', // 15
        'Bright sunlight (snow/sand)' // 16
    ],
    statuses: {
        ISO: 0,
        EV: 1,
        APERTURE: 2
    }
};

if (typeof module !== 'undefined') {
  module.exports = config;
}
